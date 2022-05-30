import { useRef } from 'react'

function InputTextBox({ type, id, placeholder, setValue, possibleError }) {

    const inputBox = useRef(null)

    const ValueChanged = function() {
        setValue(inputBox.current.value);
    }

    return (
        <div
            className="form-outline mb-4">
            <input
                type={type}
                id={id}
                ref={inputBox}
                onChange={ValueChanged}
                className="form-control"
                placeholder={placeholder}
            />
            <p
                className="err text-center text-danger form-text">
                {possibleError}
            </p>
        </div>
    );
}
export default InputTextBox;