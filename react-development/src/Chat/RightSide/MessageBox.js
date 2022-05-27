function MessageBox({ sentBy, datatype, data, timeSent }) {
    // sentBy   : self | other
    // datatype : text | image | voice recording | video
    const cName = "msg " + sentBy + "-msg";

    switch (datatype) {
        case "text": {
            return (
                <div className={cName}>
                    <p>
                        {data}
                        <br></br>
                        <span
                            className="time-sent">
                            {timeSent}
                        </span>
                    </p>
                </div>
            );
        } case "image": {
            return (
                <div className={cName}>
                    <p><img className="img-fluid" src={data} alt="❓ERROR❓"></img><br></br><span className="time-sent">{timeSent}</span></p>
                </div>
            );
        } case "video": {
            return (
                <div className={cName}>
                    <p>
                        <video
                            controls
                            className="video"
                            src={data}>
                        </video>
                        <br></br>
                        <span
                            className="time-sent">
                            {timeSent}
                        </span>
                    </p>
                </div>
            );
        } case "voice recording": {
            return (
                <div className={cName}>
                    <p>
                        <audio
                            className="audio-preview"
                            src={data}
                            controls>
                        </audio>
                        <br></br>
                        <span
                            className="time-sent">
                            {timeSent}
                        </span>
                    </p>
                </div>
            );
        } default: {
            alert("unknown data type: " + datatype);
            return (<></>);
        }
    }
}

export default MessageBox;
