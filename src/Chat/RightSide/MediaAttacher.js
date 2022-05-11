import UploadModal from "./UploadModal";

function MediaAttacher({ user, contact, reload, reloadVal }) {
    return (
        <div className="attach">
            <div style={{ minHeight: '63px' }}>
                <div className="collapse collapse-horizontal" id="collapseWidthExample">
                    <div className="btn-group-vertical me-2" role="group" aria-label="First group">
                        <UploadModal logoClass="bi bi-camera-reels-fill" idcode="2" type="video" headerText="Upload a video" acceptedFileType="video/*" user={user} contactUsername={contact.user.username} reload={reload} reloadVal={reloadVal} />
                        <UploadModal logoClass="bi bi-camera-fill" idcode="1" type="image" headerText="Upload an image" acceptedFileType="image/*" user={user} contactUsername={contact.user.username} reload={reload} reloadVal={reloadVal} />
                    </div>
                </div>
            </div>
            <p>
                <button id="attach3" className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                    <i className="bi bi-paperclip"></i>
                </button>
            </p>
        </div>
    );
}

export default MediaAttacher;
