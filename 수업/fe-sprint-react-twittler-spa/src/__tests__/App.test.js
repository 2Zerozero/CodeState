import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";
import { access } from "fs/promises";
import { join } from "path";

import App from "../App";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import Tweets from "../Pages/Tweets";
import MyPage from "../Pages/MyPage";
import About from "../Pages/About";
import { dummyTweets } from "../static/dummyData";

let ReactRouterDom;

describe("App.js React Router 설치", () => {
  test("react-router-dom 를 npm 으로 설치해야 합니다. (react-router-dom)", async () => {
    let isReactRouterDomInstalled = false;
    const defaultPath = join(process.cwd(), "node_modules", "react-router-dom");

    try {
      ReactRouterDom = await import("react-router-dom");
      await access(join(defaultPath));
      isReactRouterDomInstalled = true;
    } catch (e) {
      console.log("react-router-dom is not installed");
    }

    expect(isReactRouterDomInstalled).toBe(true);
  });
});

describe("App.js React Router 컴포넌트 적용", () => {
  test("React Router 컴포넌트로 Routes와 Route 컴포넌트가 있어야 합니다.", () => {
    const { Routes, Route } = ReactRouterDom;

    const appInstance = TestRenderer.create(<App />).root;
    const routesInstance = appInstance.findByType(Routes);
    /*
    react-router-dom v6에서는 Route를 findByType으로 탐색할 수가 없음
    routesInstance.props.children로 접근.
    */

    expect(appInstance.findByType(Routes).type).toBe(Routes);

    const routesChildren = routesInstance.props.children;
    expect(routesChildren.find(route => route.type === Route)).toBeTruthy();
    expect(routesChildren.filter(route => route.type === Route)).toHaveLength(3);
  });

  test("App 컴포넌트의 후손 컴포넌트로 Sidebar 컴포넌트가 있어야 합니다.", () => {
    const appInstance = TestRenderer.create(<App />).root;
    expect(appInstance.findByType(Sidebar).type).toBe(Sidebar);
  });

  describe("주소에 따른 페이지 뷰 구현을 위해", () => {
    test('Route path가 "/" 인 Tweets 컴포넌트가 있어야 합니다.', () => {
      const { Routes } = ReactRouterDom;
      const rootPath = "/";
      const appInstance = TestRenderer.create(<App />).root;

      const RoutesInstance = appInstance.findByType(Routes);
      const tweetsInstance = RoutesInstance.props.children.find(
        (instance) => instance.props.path && instance.props.path === rootPath
      );

      expect(tweetsInstance).toBeTruthy();
      expect(tweetsInstance.props.path).toBe(rootPath);
    });

    test('Route path가 "/about" 인 About 컴포넌트가 있어야 합니다.', () => {
      const { Routes } = ReactRouterDom;
      const aboutPath = "/about";
      const appInstance = TestRenderer.create(<App />).root;
      const RoutesInstance = appInstance.findByType(Routes);
      const aboutInstance = RoutesInstance.props.children.find(
        (instance) => instance.props.path && instance.props.path === aboutPath
      );

      expect(aboutInstance).toBeTruthy();
      expect(aboutInstance.props.path).toBe(aboutPath);
    });

    test('Route path가 "/mypage" 인 MyPage 컴포넌트가 있어야 합니다.', () => {
      const { Routes } = ReactRouterDom;
      const myPagePath = "/mypage";
      const appInstance = TestRenderer.create(<App />).root;

      const RoutesInstance = appInstance.findByType(Routes);
      const myPageInstance = RoutesInstance.props.children.find(
        (instance) => instance.props.path && instance.props.path === myPagePath
      );

      expect(myPageInstance).toBeTruthy();
      expect(myPageInstance.props.path).toBe(myPagePath);
    });
  });
});

describe("Sidebar.js 사이드바 구현", () => {
  test('Font Awesome을 이용한 Tweets 메뉴 아이콘이 있어야 합니다.(className : ".far .fa-comment-dots")', () => {
    const { container } = render(<App />);
    const commentIcon = container.querySelector(".far.fa-comment-dots");

    expect(commentIcon).not.toBeNull();
    expect(commentIcon).toBeInstanceOf(HTMLElement);
    expect(commentIcon.tagName).toBe("I");
  });

  test('Font Awesome을 이용한 About 메뉴 아이콘이 있어야 합니다.(className : ".far .fa-question-circle")', () => {
    const { container } = render(<App />);
    const aboutIcon = container.querySelector(".far.fa-question-circle");

    expect(aboutIcon).not.toBeNull();
    expect(aboutIcon).toBeInstanceOf(HTMLElement);
    expect(aboutIcon.tagName).toBe("I");
  });

  test('Font Awesome을 이용한 MyPage 메뉴 아이콘이 있어야 합니다.(className : ".far .fa-user")', () => {
    const { container } = render(<App />);
    const mypageIcon = container.querySelector(".far.fa-user");

    expect(mypageIcon).not.toBeNull();
    expect(mypageIcon).toBeInstanceOf(HTMLElement);
    expect(mypageIcon.tagName).toBe("I");
  });

  describe("Sidebar 컴포넌트에는", () => {
    test("React Router의 Link 컴포넌트가 3개 있어야 합니다.", () => {
      const { BrowserRouter, Link } = ReactRouterDom;

      const sidebarInstance = TestRenderer.create(
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      ).root;

      expect(sidebarInstance.findAllByType(Link)).toHaveLength(3);
    });

    test('Tweets 아이콘의 Link 컴포넌트는 "/" 로 연결되야 합니다.', () => {
      const { container } = render(<App />);
      const linkToAttr = container.querySelectorAll("a");

      expect(linkToAttr[0]).toHaveAttribute("href", "/");
    });

    test('About 아이콘의 Link 컴포넌트는 "/about" 로 연결되야 합니다.', () => {
      const { container } = render(<App />);
      const linkToAttr = container.querySelectorAll("a");

      expect(linkToAttr[1]).toHaveAttribute("href", "/about");
    });

    test('MyPage 아이콘의 Link 컴포넌트는 "/mypage" 로 연결되야 합니다.', () => {
      const { container } = render(<App />);
      const linkToAttr = container.querySelectorAll("a");

      expect(linkToAttr[2]).toHaveAttribute("href", "/mypage");
    });
  });
});

describe("MyPage.js Components", () => {
  test("MyPage 컴포넌트의 자식 컴포넌트로 Footer 컴포넌트가 있어야 합니다.", () => {
    const mypageInstance = TestRenderer.create(
      <MyPage dummyTweets={[]} />
    ).root;
    expect(mypageInstance.findByType(Footer).type).toBe(Footer);
  });

  describe("MyPage 데이터 렌더링 테스트", () => {
    test("kimcoding이 작성한 트윗만 보여야 합니다.", () => {
      const { queryByText } = render(<MyPage dummyTweets={[]} />);
      expect(queryByText("kimcoding")).toHaveTextContent(
        dummyTweets[0].username
      );
    });
  });
});

describe("Tweets.js Components", () => {
  test("Tweets 컴포넌트의 후손 컴포넌트로 Footer 컴포넌트가 있어야 합니다.", () => {
    const tweetsInstance = TestRenderer.create(
      <Tweets dummyTweets={[]} />
    ).root;

    expect(tweetsInstance.findByType(Footer).type).toBe(Footer);
  });

  describe("Tweets 데이터 렌더링 테스트", () => {
    test("dummyTweets의 길이 만큼 트윗이 보여야 합니다.", () => {
      const { queryByText } = render(<Tweets dummyTweets={[]} />);

      expect(queryByText("kimcoding")).toHaveTextContent(
        dummyTweets[0].username
      );
      expect(queryByText("parkhacker")).toHaveTextContent(
        dummyTweets[1].username
      );
      expect(queryByText("leedesign")).toHaveTextContent(
        dummyTweets[2].username
      );
      expect(queryByText("songfront")).toHaveTextContent(
        dummyTweets[3].username
      );
      expect(queryByText("choiback")).toHaveTextContent(
        dummyTweets[4].username
      );
    });
  });
});

describe("React Router로 SPA 구현하기", () => {
  test('처음 접속 시, URL path가 "/" 이여야 합니다.', async () => {
    const { Routes } = ReactRouterDom;

    const rootPath = "/";
    const appInstance = TestRenderer.create(<App />).root;
    const routesInstance = appInstance.findByType(Routes);

    const hasHomePath = routesInstance.props.children.some(
      (prop) => prop.props.path === "/"
    );

    expect(hasHomePath).toBe(true);
    expect(location.pathname).toBe(rootPath);
  });

  test("About 메뉴를 누르면 URL path가 /about으로 라우트 되어야 합니다.", async () => {
    const { Routes } = ReactRouterDom;

    const aboutPath = "/about";
    const { container } = render(<App />);

    const aboutIcon = container.querySelector(".far.fa-question-circle");
    userEvent.click(aboutIcon);

    const appInstance = TestRenderer.create(<App />).root;
    const routesInstance = appInstance.findByType(Routes);

    const aboutElement = routesInstance.props.children.find(
      (prop) => prop.props.element.type === About
    );

    expect(location.pathname).toBe(aboutPath);
    expect(aboutElement.props.path).toBe(aboutPath);
  });

  test("MyPage 메뉴를 누르면 URL path가 /mypage로 라우트 되어야 합니다.", async () => {
    const { Routes } = ReactRouterDom;

    const myPagePath = "/mypage";
    const { container } = render(<App />);

    const mypageIcon = container.querySelector(".far.fa-user");
    userEvent.click(mypageIcon);

    const appInstance = TestRenderer.create(<App />).root;
    const routesInstance = appInstance.findByType(Routes);

    const myPageElement = routesInstance.props.children.find(
      (prop) => prop.props.element.type === MyPage
    );

    expect(location.pathname).toBe(myPagePath);
    expect(myPageElement.props.path).toBe(myPagePath);
  });
});
