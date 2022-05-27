import { useState } from 'react'
import {sendMessage} from '../../data/data'

function UploadModal({ idcode, logoClass, type, headerText, acceptedFileType, user, contactUsername, reload }) {

    const [media, setMedia] = useState("");
    const [error, setError] = useState("");

    const valueChanged = function (e) {
        let sendBtn =  document.getElementById("send-btn" + idcode);
        if (e.target.files[0]['type'].split('/')[0] !== type) {
            sendBtn.disabled = true;
            // if file is not an image, disable send and set an error
            setError("Invalid file type!");
            setMedia("");
        } else {
            sendBtn.disabled = false;
            setError("");
            // otherwise, display the image, save it, and turn off the error and enable the send button
            setMedia(URL.createObjectURL(e.target.files[0]));        // set image
        }
    }

    const sendMedia = function (e) {
        // let input.value = image
        if (!media) {
            return;
        }
        // sending message
        sendMessage(user, contactUsername, type, media);
        // if we send a video, pause preview
        if (type === 'video') {
            document.getElementById("video-preview").pause();
        }
        reload();
    }

    const renderMediaPreview = function () {
        if (!media) {
            return (
                <div></div>
            );
        } else if (type === 'image') {
            return (
                <img
                    id={"display" + idcode}
                    className="img-fluid"
                    src={media}>
                </img>
            );
        } else if (type === 'video') {
            return (
                <video
                    id="video-preview"
                    className="video"
                    controls
                    width="400px"
                    height="300px"
                    src={media}>
                </video>
            );
        } else {
            return (
                <div>Unknown</div>
            );
        }
    }

    return (
        <div>
            <button id={"attach" + idcode} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#staticBackdrop" + idcode} >
                <i className={logoClass}></i>
            </button>
            <div className="modal fade" id={"staticBackdrop" + idcode} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={"staticBackdropLabel" + idcode}>{headerText}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input onChange={valueChanged} className="form-control" type="file" accept={acceptedFileType} id="formFile"></input>
                            </div>
                            {error}
                            {renderMediaPreview()}
                        </div>
                        <button
                            onClick={sendMedia}
                            id={"send-btn" + idcode}
                            className="btn btn-primary"
                            type="button"
                            data-bs-dismiss="modal">
                            <i className="bi bi-send"> Send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadModal;
