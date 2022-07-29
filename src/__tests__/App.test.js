import React from 'react';
import { cleanup, prettyDOM, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';

import { App, Sidebar, Counter, Tweets, Features, Footer } from '../App';
import { dummyNotice, dummyTweets } from '../static/dummyData';

describe('Bare minimum requirement', () => {
  describe('App.js Sidebar 컴포넌트', () => {
    test('App 컴포넌트의 후손 컴포넌트로 Sidebar 컴포넌트가 있어야 합니다.', () => {
      const appInstance = TestRenderer.create(
        <App dummyTweets={[]} dummyNotice={[]} />
      ).root;
      expect(appInstance.findByType(Sidebar).type).toBe(Sidebar);
    });

    test('Font Awesome을 활용한 트윗 메세지 아이콘이 있어야 합니다. (className : ".far .fa-comment-dots")', () => {
      const { container } = render(<Sidebar />);
      const tweetIcon = container.querySelector('.far.fa-comment-dots');

      expect(tweetIcon).toBeInTheDocument();
      expect(tweetIcon).toBeInstanceOf(HTMLElement);
      expect(tweetIcon.tagName).toBe('I');
    });
  });

  describe('App.js Counter 컴포넌트', () => {
    test('Feature 컴포넌트의 후손 컴포넌트로 Counter 컴포넌트가 있어야 합니다.', () => {
      const appInstance = TestRenderer.create(
        <Features tweets={[]} currentPage={'tweets'} />
      ).root;
      expect(appInstance.findByType(Counter).type).toBe(Counter);
    });

    test('`dummyTweet`로 전달되는 트윗 갯수와 카운트가 일치해야 합니다.', () => {
      const { container } = render(<Counter total={5} />);
      const count = container.querySelector('.tweetForm__count');
      expect(count).toHaveTextContent(/^(?=.*\btotal\b)(?=.*\b5\b).*$/im);
    });
  });

  describe('App.js Footer 컴포넌트', () => {
    test('Features 컴포넌트의 후손 컴포넌트로 Footer 컴포넌트가 있어야 합니다.', () => {
      const appInstance = TestRenderer.create(
        <Features tweets={[]} currentPage={'tweets'} />
      ).root;
      expect(appInstance.findByType(Footer).type).toBe(Footer);
    });

    test('Footer 컴포넌트의 후손 엘리먼트로 시멘틱 엘리먼트 footer가 있어야 합니다.', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');

      expect(footer).toBeInTheDocument();
      expect(footer).toBeInstanceOf(HTMLElement);
      expect(footer.tagName).toBe('FOOTER');
    });
  });

  describe('App.js Tweets 컴포넌트', () => {
    describe('각 트윗은', () => {
      test('트윗 저자의 프로필 사진이 있어야 합니다.', () => {
        const { container } = render(<Tweets tweets={dummyTweets.slice(0, 1)} />);
        const tweet = container.querySelector('.tweet');
        const imgs = container.querySelectorAll('img');
        const profileImg = Array.from(imgs).find((img) =>
          img.src.includes('https://randomuser.me/api/portraits')
        );

        expect(tweet).toContainElement(profileImg);
        expect(profileImg).toBeInTheDocument();
      });

      test('유져 이름이 있어야 합니다.', () => {
        const { container, queryByText } = render(
          <Tweets tweets={dummyTweets.slice(0, 1)} />
        );
        const tweet = container.querySelector('.tweet');
        const username = queryByText('kimcoding');

        expect(tweet).toContainElement(username);
        expect(username).toHaveClass('tweet__username');
      });

      test('트윗 생성 일자(yyyy. m. d.) 가 있어야 합니다.', () => {
        const { container, queryByText } = render(
          <Tweets tweets={dummyTweets.slice(0, 1)} />
        );
        const tweet = container.querySelector('.tweet');
        const createdAt = queryByText('2022. 2. 25.');

        expect(tweet).toContainElement(createdAt);
        expect(createdAt).toHaveClass('tweet__createdAt');
      });

      test('트윗 메세지가 있어야 합니다.', () => {
        const { container, queryByText } = render(
          <Tweets tweets={dummyTweets.slice(0, 1)} />
        );
        const tweet = container.querySelector('.tweet');
        const tweetMessage = queryByText(
          /^모든 국민은 인간으로서의 존엄과 가치를 가지며,/g
        );

        expect(tweet).toContainElement(tweetMessage);
        expect(tweetMessage).toHaveClass('tweet__message');
      });

      test('dummyTweets의 길이 만큼 트윗이 보여야 합니다.', () => {
        const { queryByText } = render(<App dummyTweets={dummyTweets} />);

        expect(queryByText('kimcoding')).toHaveTextContent(
          dummyTweets[0].username
        );
        expect(queryByText('parkhacker')).toHaveTextContent(
          dummyTweets[1].username
        );
        expect(queryByText('leedesign')).toHaveTextContent(
          dummyTweets[2].username
        );
        expect(queryByText('songfront')).toHaveTextContent(
          dummyTweets[3].username
        );
        expect(queryByText('choiback')).toHaveTextContent(
          dummyTweets[4].username
        );
      });
    });
  });

  describe('App.js Feautres 컴포넌트', () => {
    test('App 컴포넌트의 후손 컴포넌트로 Features 컴포넌트가 있어야 합니다.', () => {
      const appInstance = TestRenderer.create(<App dummyTweets={[]} />).root;
      expect(appInstance.findByType(Features).type).toBe(Features);
    });
  });

  describe('App.js 조건부 렌더링 테스트', () => {
    describe('parkhacker가 작성한 트윗의 경우', () => {
      test('username 배경색이 var(--point-color-tint-2)가 되도록 클래스(.tweet__username--purple)를 지정해야 합니다.', () => {
        const { queryByText } = render(<App dummyTweets={dummyTweets} />);
        const packhacker = queryByText('parkhacker');

        expect(queryByText('kimcoding')).toHaveTextContent(
          dummyTweets[0].username
        );
        expect(packhacker).toHaveTextContent(dummyTweets[1].username);
        expect(packhacker).toHaveClass('tweet__username--purple');
      });
    });
  });
});
