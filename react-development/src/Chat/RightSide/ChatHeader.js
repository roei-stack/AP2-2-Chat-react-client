function ChatHeader({ otherImage, otherUsername, otherNickname }) {
    return (
        <div className="header">
            <div className="img-with-text">
                <div className="user-image-header">
                    <img src={otherImage} className="img-fluid"></img>
                </div>
                <h6 className="other-user">
                    {otherNickname}
                    <br></br>
                    <div className="status">{otherUsername}</div>
                </h6>
            </div>
        </div>
    );
}

export default ChatHeader;