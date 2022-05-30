function MessageBox({ content, created, sent, id, datatype }) {
    // sentBy   : self | other
    // datatype : text | image | voice recording | video

    let sentBy = 'self';
    if (!sent) {
        sentBy = 'other';
    }
    const cName = "msg " + sentBy + "-msg";


    let date = created.substr(0, 10);
    let time = created.substr(11, 5);
    return (
        <div className={cName}>
            <p>
                {content}
                <br></br>
                <span
                    className="time-sent">
                    {date} {time}
                </span>
            </p>
        </div>
    );
}


export default MessageBox;
