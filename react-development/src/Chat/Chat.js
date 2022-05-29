import './Chat.css'
import React, { useState, useEffect } from 'react'
import imageDefault from './images/boris.jpg'
import LeftSide from './LeftSide/LeftSide';
import ChatHeader from './RightSide/ChatHeader';
import Inputs from './RightSide/Inputs';
import MessageList from './RightSide/MessageList';
import { useLocation } from 'react-router-dom';
import { searchUser } from '../data/data';

function Chat() {
    const { state } = useLocation();
    var user = searchUser(state.username);

    let username = state.username;
    let password = state.password;

    const [listContacts, setListContacts] = useState([]);
    const [activeContact, setActiveContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reload, setReload] = useState(false);
    const reloadPage = () => setReload(!reload);


    let contactNickname = "Select a chat or add a new contact";
    let contactUsername = "";
    let contactImage = imageDefault;
    
    if (activeContact) {
        contactNickname = activeContact;
        contactUsername = activeContact;
    }
    useEffect(() => {
        // update contacts list
        const fetchMessages = async () => {
            const response = await fetch('https://localhost:7007/api/contacts/' + username + '/' + activeContact + '/messages');
            const data = await response.json();
            console.log(data);
            setMessages(data);
        }
        if (activeContact) {
            fetchMessages();
        }
    }, [activeContact])

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('https://localhost:7007/api/contacts/' + username);
            const data = await response.json();
            setListContacts(data);
        }
        // update contacts list
        fetchContacts();
        console.log(listContacts);
    }, [reload])



    // get contacts from remote

    /*
        TODO:
        - fix audio css
        - add logout button
        - same messages array for both users
    */
    return (
        <section id="chat" className="container-fluid">
            <div id="chat-page" className="row g-2">

                <LeftSide username={username} contacts={listContacts} reload={reloadPage} setActiveContact={setActiveContact} />

                <div id="right-side" className="col-8 vh-100">
                    <ChatHeader otherUsername={activeContact} otherNickname={contactNickname} otherImage={imageDefault} />
                    <MessageList messages={messages} />
                </div>
            </div>
        </section>
    );
}

export default Chat;

/*
                    <MessageList contact={activeContact} />
                    <Inputs user={user} contact={activeContact} reload={reloadPage} />
*/

// <LeftSide user={user} cl={listContacts} contacts={user.contacts} reload={reloadPage} setActiveContact={setActiveContact} />

