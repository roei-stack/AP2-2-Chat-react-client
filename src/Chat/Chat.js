import './Chat.css'
import React, { useState } from 'react'
import imageDefault from './images/boris.jpg'
import ContactBlock from './LeftSide/ContactBlock';
import LeftSide from './LeftSide/LeftSide';
import ChatHeader from './RightSide/ChatHeader';
import MessageBox from './RightSide/MessageBox'
import Inputs from './RightSide/Inputs';
import MessageList from './RightSide/MessageList';
import { useLocation } from 'react-router-dom';
import { searchUser } from '../data/data_base_for_noobs';

function Chat() {
    const { state } = useLocation();
    var user = searchUser(state.username);
    const [activeContact, setActiveContact] = useState(null);
    const [reload, setReload] = useState(0);


    // look for users with active chat with current user
    const contactBlocks = [];
    for (let i = 0; i < user.contacts.length; i++) {
        contactBlocks.push({ contact: user.contacts[i] });
    }

    // create a list of "chat block" components
    const contactBlockList = contactBlocks.map((cb, key) => {
        return <ContactBlock user={user} contact={cb.contact} setActiveContact={setActiveContact} key={key} />
    });


    // create a list of messages according to activeContact
    let initState = [];
    if (activeContact) {
        initState = activeContact.messages;
    }
    const messages = initState;
    const messageList = messages.map((msg, key) => {
        let sentBy = "";
        if (msg.self) {
            sentBy = "self";
        } else {
            sentBy = "other";
        }
        let datatype = msg.data.type;
        let data = msg.data.data;
        let time = msg.data.time;
        return <MessageBox sentBy={sentBy} datatype={datatype} data={data} timeSent={time} key={key} />
    });

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
        - line break on long words
        - fix warnings
        - fix audio css
        - add logout button
        - same messages array for both users
        - update reload mechanism
        - fix time.get_str() function
    ***    - set a maximum size for images and video messages
        - push latest messages up
    ***    - fix contact chat header
        - change 'voice recording' to 'audio'
    */
    return (
        <section id="chat" className="container-fluid">
            <div id="chat-page" className="row g-2">
                <LeftSide user={user} contactBlockList={contactBlockList} reload={setReload} reloadVal={reload} />
                <div id="right-side" className="col-8 vh-100">
                    <ChatHeader otherUsername={contactUsername} otherNickname={contactNickname} otherImage={contactImage} />
                    <MessageList messageList={messageList} />
                    <Inputs user={user} contact={activeContact} reload={setReload} reloadVal={reload} />
                </div>
            </div>
        </section>
    );
}

export default Chat;

