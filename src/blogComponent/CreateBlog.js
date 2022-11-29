import useInput from "../util/useInput";
import Input from "../component/Input";
import Select from "../component/Select";
import Loading from "../component/Loading";
import { fetchCreate } from "../util/api";

const CreateBlog = ({blogs}) => {
    const [title, titleBind] = useInput('');
    const [body, bodyBind] = useInput('');
    const [author, authorBind] = useInput('김코딩');

    // select 컴포넌트에 들어가는 uniqueArr 속성에 blogs라고 보내보세요.
    // 작성자 부분에 중복되는 이름이 보이는 것을 확인할 수 있을 것입니다.
    // 중복되는 작성자의 이름을 어떻게 걸러내고 작성자 이름 하나만 남길 수 있는지 밑의 로직을 분석합니다.
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
    )
  }
  
  export default CreateBlog; 