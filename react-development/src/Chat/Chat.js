import './Chat.css'
import React, { useState } from 'react'
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

    const [activeContact, setActiveContact] = useState(null);
    const [reload, setReload] = useState(false);
    const reloadPage = () => setReload(!reload);
    
    let contactNickname = "Select a chat or add a new contact";
    let contactUsername = "";
    let contactImage = imageDefault;
    if (activeContact) {
        contactNickname = activeContact.user.nickname;
        contactUsername = activeContact.user.username;
        contactImage = activeContact.user.image;
    }

    /*
        TODO:
        - fix audio css
        - add logout button
        - same messages array for both users
    */
    return (
        <section id="chat" className="container-fluid">
            <div id="chat-page" className="row g-2">
                <LeftSide user={user} contacts={user.contacts} reload={reloadPage} setActiveContact={setActiveContact} />
                <div id="right-side" className="col-8 vh-100">
                    <ChatHeader otherUsername={contactUsername} otherNickname={contactNickname} otherImage={contactImage} />
                    <MessageList contact={activeContact} />
                    <Inputs user={user} contact={activeContact} reload={reloadPage} />
                </div>
            </div>
        </section>
    );
}

export default Chat;

