import { sendMessage } from "../../data/data";
import MediaAttacher from "./MediaAttacher";
import Recorder from "./Recorder";

function Inputs({ user, contact, reload }) {
    const sendText = function () {
        // get the text to send
        let input = document.getElementById("text-input");
        if (!input.value) {
            return;
        }
        // sending message
        sendMessage(user, contact.user.username, 'text', input.value);
        // clear input box
        input.value = "";
        reload();
    }

    if (contact) {
        return (
            <div className="input-msg-chat">
                <MediaAttacher user={user} contact={contact} reload={reload}/>
                <Recorder user={user} contactUsername={contact.user.username} reload={reload}/>
                <div className="text-input input-group mb-3">
                    <button onClick={sendText} className="btn btn-outline-secondary" type="button" id="button-addon2">
                        <i className="bi bi-send"></i>
                    </button>
                    <input id="text-input" className="form-control" type="text" placeholder="Write a message..." aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}


export default Inputs;