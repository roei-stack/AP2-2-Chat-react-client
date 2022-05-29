import {useEffect} from 'react'
import MessageBox from './MessageBox';

function MessageList({messages}) {

    // scroll down
    useEffect(() => {
        let chat = document.getElementById("chat-box");
        chat.scrollTop = chat.scrollHeight;
    });

    // render messages
    /*const messageList = messages.map((msg, key) => {
    });*/

    return (
        <div id="chat-box" className="chat-box">
            {messageList}
        </div>
    );
}

export default MessageList;