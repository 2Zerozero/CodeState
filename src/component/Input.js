

const Input = ({label, value}) => {

    return (
        <>
            <label>{label}</label>
            <input 
            type="text" 
            required 
            {...value}
            placeholder={`${label}을 입력해주세요.`}
            />
        </>
    )
}

export default Input;