import UserHeader from "./UserHeader";
import ContactBlock from "./ContactBlock";

function LeftSide({user, contacts, reload, setActiveContact}) {

    // look for users with active chat with current user
    const contactBlocks = [];
    for (let i = 0; i < contacts.length; i++) {
        contactBlocks.push({ contact: contacts[i] });
    }

    // create a list of "chat block" components
    const contactBlockList = contactBlocks.map((cb, key) => {
        return <ContactBlock user={user} contact={cb.contact} setActiveContact={setActiveContact} key={key} />
    });

    return (
        <div id="left-side" className="col-4 vh-100">
            <UserHeader user={user} reload={reload}/>
            <div className="chat-list list-group vh-100">{contactBlockList}</div>
        </div>
    );
}

export default LeftSide;
