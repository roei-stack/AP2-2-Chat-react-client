import {getLastMessage} from '../../data/data_base_for_noobs'

function ContactBlock({ user, contact, setActiveContact }) {
    // add user i to active contacts blocks
    let data = "";
    let time = "";
    let lastMessage = getLastMessage(user, contact.user.username);
    if (lastMessage) {
        switch (lastMessage.data.type) {
            case "text": {
                data = lastMessage.data.data;
                if (data.length > 30) {
                    data = data.substring(0, 27) + "...";
                } break;
            } case "image": {
                data = "📷Image"; break;
            } case "voice recording": {
                data = "🎤Recording"; break;
            } case "video": {
                data = "🎥Video"; break;
            } default: {
                data = "❓Error❓";
            }
        }
        time = lastMessage.data.time;
    }
    const contactClicked = function () {
        // set active contact
        setActiveContact(contact);
    }
    return (
        <a
            onClick={contactClicked}
            className="contact-block list-group-item list-group-item-action"
            data-bs-toggle="list">
            <div><img src={contact.user.image} className="img-fluid contact-photo"></img></div>
            <div className="contact-box-details">
                <h6>{contact.user.nickname}</h6>
                <div
                    className="last-msg-details">
                    <div id="lastText">
                        {data}
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
            </div>
        </a>
    );
}

export default ContactBlock;