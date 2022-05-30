function MessageBox({ content, created, sent, id, datatype }) {
    // sentBy   : self | other
    // datatype : text | image | voice recording | video

    let sentBy = 'self';
    if (!sent) {
        sentBy = 'other';
    }
    const cName = "msg " + sentBy + "-msg";
    return (
        <div className={cName}>
            <p>
                {content}
                <br></br>
                <span
                    className="time-sent">
                    {created}
                </span>
            </p>
        </div>
    );
}


export default MessageBox;
