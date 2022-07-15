import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFetch from "./util/useFetch";

const Home = React.lazy(() => import('./Home'));
const Navbar = React.lazy(() => import('./component/Navbar'));
const CreateBlog = React.lazy(() => import('./blogComponent/CreateBlog'));
const BlogDetails = React.lazy(() => import('./blogComponent/BlogDetail'));
const NotFound = React.lazy(() => import('./component/NotFound'));
const Loading = React.lazy(() => import('./component/Loading'));
const Footer = React.lazy(() => import('./component/Footer'));

function App() {  
  const { error, isPending, data: blogs } = useFetch('http://localhost:3000/blogs')

  return (
    <BrowserRouter>
      { error && <div>{ error }</div> }
      <Suspense fallback={<Loading />}>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home blogs={blogs} isPending={isPending} />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
              <Route path="/blogs/:id" element={<NotFound />} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
