import {useEffect} from 'react'

function MessageList({messageList}) {

    useEffect(() => {
        // code to run after render goes here
        let chat = document.getElementById("chat-box");
        chat.scrollTop = chat.scrollHeight;
    });

    return (
        <div id="chat-box" className="chat-box">
            {messageList}
        </div>
    );
}

export default MessageList;