import './index.css'


function ImageUpload({setValue, setUrl, possibleError}) {

    const imgChange = function(e) {
        setValue(e.target.files[0]);
        setUrl(URL.createObjectURL(e.target.files[0]));
    }
    return (
    <div>
        <div className="input-group form-outline mb-3">
            <input
                id="inputImage"
                onChange={imgChange}
                type="file"
                className="form-control"
                accept="image/*">
            </input>
        </div>
        <p
            className="err text-center form-text">
            {possibleError}
        </p>
    </div>
    );
}
export default ImageUpload;