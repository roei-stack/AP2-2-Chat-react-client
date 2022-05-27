import {useEffect} from 'react'
import MessageBox from './MessageBox';

function MessageList({contact}) {

    // scroll down
    useEffect(() => {
        let chat = document.getElementById("chat-box");
        chat.scrollTop = chat.scrollHeight;
    });

    // render messages
    let initState = [];
    if (contact) {
        initState = contact.messages;
    }
    const messageList = initState.map((msg, key) => {
        let sentBy = "";
        if (msg.self) {
            sentBy = "self";
        } else {
            sentBy = "other";
        }
        let datatype = msg.data.type;
        let data = msg.data.data;
        let time = msg.data.time.toString();
        return <MessageBox sentBy={sentBy} datatype={datatype} data={data} timeSent={time} key={key} />
    });

    return (
        <div id="chat-box" className="chat-box">
            {messageList}
        </div>
    );
}

export default MessageList;