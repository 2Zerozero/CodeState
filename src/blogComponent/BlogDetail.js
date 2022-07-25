import { useState } from "react";
import{ useNavigate, useParams } from "react-router-dom";
import useFetch from "../util/useFetch";
import useScrollTop from "../util/useScrollTop";

const BlogDetails = ({blogs}) => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:3001/blogs/' + id);
  const [isLike, setIsLike] = useState(true);
  const navigate = useNavigate();

  useScrollTop();

  const handleClick = () => {
    fetch('http://localhost:3001/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/');
    })
  }

  const handleLikeClick = () => {
    setIsLike(!isLike);
    let result = blog.likes;
    if(isLike === false) {
      if(blog.likes > 0) {
        result = blog.likes - 1;
      }
      result = blog.likes;
    } else {
      result = blog.likes + 1;
    }

    let putData = {
      "id": blog.id,
      "title": blog.title,
      "body": blog.body,
      "author": blog.author,
      "likes" : result 
    };

    fetch('http://localhost:3001/blogs/' + blog.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putData)
    }).then(() => {
        navigate(`/blogs/${blog.id}`);
    })
  }

  return (
    <div className="blog-details">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { blog && (
            <article>
                <h2>{ blog.title }</h2>
                <p>Written by { blog.author }</p>
                <div>{ blog.body }</div>
                <button onClick={handleLikeClick}>
                  {isLike === false ? '❤️' : '🤍'}
                  </button>
                <button onClick={handleClick}>delete</button>
            </article>
        )}
    </div>
  );
}

export default BlogDetails; 