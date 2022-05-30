import {useEffect} from 'react'
import MessageBox from './MessageBox';
import { HubConnectionBuilder } from '@microsoft/signalr'

function MessageList({messages}) {

    var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub").build();

    // scroll down
    useEffect(() => {
        let chat = document.getElementById("chat-box");
        chat.scrollTop = chat.scrollHeight;
    });

    // render messages
    const messageList = messages.map((msg, key) => {
        return <MessageBox content={msg.content} created={msg.created} sent={msg.sent} id={msg.id} datatype='text' key={key}/>
    });

    return (
        <div id="chat-box" className="chat-box">
            {messageList}
        </div>
    );
}

export default MessageList;