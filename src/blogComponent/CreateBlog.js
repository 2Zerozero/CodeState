import useInput from "../util/useInput";
import Input from "../component/Input";
import Select from "../component/Select";
import Loading from "../component/Loading";
import { fetchCreate } from "../util/api";

const CreateBlog = ({blogs}) => {
    const [title, titleBind] = useInput('');
    const [body, bodyBind] = useInput('');
    const [author, authorBind] = useInput('김코딩');

    const authrUnique = blogs && (blogs.filter((character, idx, arr) => {
      return arr.findIndex(item => item.author === character.author) === idx
    }));


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {title, body, author, likes: 0}
        fetchCreate("http://localhost:3001/blogs/", data)
    }

    return (
      <div className="create">
        {
          blogs ? 
          <>
              <h2>Add a New Blog</h2>
              <form onSubmit={handleSubmit}>
                  <Input label={"제목"} value={titleBind} />
                  <Input label={"내용"} value={bodyBind} />
                  <Select label={"작성자"} value={authorBind} uniqueArr={authrUnique}/>
                  <button>등록</button>
              </form>
          </> :
          <Loading />
        }
      </div>
    );
  }
  
  export default CreateBlog; 