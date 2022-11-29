import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useFetch from './util/useFetch';
import useScrollTop from './util/useScrollTop';

/* react.lazy()와 suspense를 사용해 보세요. */
const Home = React.lazy(() => import("./Home"));
const Navbar = React.lazy(() => import('./component/Navbar'));
const CreateBlog = React.lazy(() => import('./blogComponent/CreateBlog'));
const BlogDetails = React.lazy(() => import('./blogComponent/BlogDetail'));
const NotFound = React.lazy(() => import('./component/NotFound'));
const Footer = React.lazy(() => import('./component/Footer'));
const Loading = React.lazy(() => import('./component/Loading'));


function App() {
  
    const [blogs, isPending, error] = useFetch("http://localhost:3001/blogs/");

    //advanced
    useScrollTop();

    return (
        <BrowserRouter>
            { error && <div>{ error }</div> }
            <Suspense fallback={<Loading/>}>
                <div className="app">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route exact path="/" element={<Home blogs={blogs} isPending={isPending} />} />
                            <Route path="/create" element={<CreateBlog blogs={blogs} />} />
                            <Route path="/blogs/:id" element={<BlogDetails />} />
                            <Route path="/blogs/:id" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;
