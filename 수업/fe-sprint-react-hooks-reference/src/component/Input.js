
//textarea도 multi-line input이므로 input 이름으로 범용성을 주는 게 좋습니다.
//혹시 헷갈릴 수 있다면 그냥 따로 component를 이 안에 만들어줘도 무방합니다.
const Input = ({label, value}) => {

    //따로 컴포넌트를 만드는 경우
    const inputComponent = <>
        <input 
        type="text" 
        required 
        {...value}
        placeholder={`${label}을 입력해주세요.`}
        />
    </>

    const textAreaComponent = <>
        <textarea
        type="text" 
        required 
        {...value}
        placeholder={`${label}을 입력해주세요.`}
        />
    </>

    return (
        <>
            <label>{label}</label>
            {label === "제목" ?
                <input 
                    type="text" 
                    required 
                    {...value}
                    placeholder={`${label}을 입력해주세요.`}
                /> : 
                <textarea
                    type="text" 
                    required 
                    {...value}
                    placeholder={`${label}을 입력해주세요.`}
                />
            }

            {/* 따로 만드는 경우 */}
            {/* <label>{label}</label>
            { label === "제목" ? inputComponent : textAreaComponent } */}
        </>
    )
}

export default Input;