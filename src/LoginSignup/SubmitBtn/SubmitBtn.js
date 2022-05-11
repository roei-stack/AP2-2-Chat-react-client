import './SubmitBtn.css'

function SubmitBtn( {text} ) {
    return (
    <div
        className="col-12 d-flex justify-content-center">
        <button
            className="submitBtn btn btn-success"
            type="submit">
            {text}
        </button>
    </div>
    );
}

export default SubmitBtn;