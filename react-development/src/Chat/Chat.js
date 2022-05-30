import './Chat.css'
import React, { useState, useEffect } from 'react'
import imageDefault from './images/boris.jpg'
import LeftSide from './LeftSide/LeftSide';
import ChatHeader from './RightSide/ChatHeader';
import Inputs from './RightSide/Inputs';
import MessageList from './RightSide/MessageList';
import { useLocation } from 'react-router-dom';

function Chat() {
    const { state } = useLocation();
    let username = state.username;
    let password = state.password;

    const [listContacts, setListContacts] = useState([]);
    const [activeContact, setActiveContact] = useState(null);
    const [messages, setMessages] = useState([]);

    const [reload, setReload] = useState(false);
    const refresh = () => setReload(!reload);

    let contactNickname = "Select a chat or add a new contact";
    let contactUsername = "";
    
    if (activeContact) {
        contactNickname = activeContact;
        contactUsername = activeContact;
    }
    useEffect(() => {
        // update contacts list
        const fetchMessages = async () => {
            const response = await fetch('https://localhost:7007/api/contacts/' + username + '/' + activeContact + '/messages');
            const data = await response.json();
            setMessages(data);
        }
        if (activeContact) {
            fetchMessages();
        }
    }, [activeContact, reload])

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('https://localhost:7007/api/contacts/' + username);
            const data = await response.json();
            setListContacts(data);
        }
        // update contacts list
        fetchContacts();
    }, [reload])

    return (
        <section id="chat" className="container-fluid">
            <div id="chat-page" className="row g-2">
                <LeftSide username={username} contacts={listContacts} reload={refresh} setActiveContact={setActiveContact} />
                <div id="right-side" className="col-8 vh-100">
                    <ChatHeader otherUsername={activeContact} otherNickname={contactNickname} otherImage={imageDefault} />
                    <MessageList messages={messages} />
                    <Inputs username={username} contactId={activeContact} reload={refresh}/>
                </div>
            </div>
        </section>
    );
}

export default Chat;

/*
                    <Inputs user={user} contact={activeContact} reload={reloadPage} />
*/

// <LeftSide user={user} cl={listContacts} contacts={user.contacts} reload={reloadPage} setActiveContact={setActiveContact} />

