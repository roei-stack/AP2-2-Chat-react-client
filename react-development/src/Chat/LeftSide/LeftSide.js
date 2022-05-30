import UserHeader from "./UserHeader";
import ContactsBlock from "./ContactsBlock";
import { useEffect, useState } from 'react';
import imageDefault from '../images/boris.jpg'
function LeftSide({ username, contacts, reload, setActiveContact }) {


    // generate components from list of contacts

    const components = contacts.map((item, key) => {
        return <ContactsBlock img={imageDefault} id={item.id} name={item.name} last={item.last} lastdate={item.lastdate} setActive={setActiveContact} key={key} />
    });



    // contactBlocks :: GET api/contacts
    return (
        <div id="left-side" className="col-4 vh-100">
            <UserHeader username={username} reload={reload} />
            <div className="chat-list list-group vh-100">
                {components}
            </div>
        </div>
    );
}

export default LeftSide;

