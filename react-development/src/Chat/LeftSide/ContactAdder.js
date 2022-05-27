import { useState, useRef } from 'react'
import { searchUser, addContact, searchContact } from '../../data/data';
function ContactAdder({ user, reload}) {
    const [error, setError] = useState("the username is used to identify your contact");
    const input = useRef("");

    const textChanged = function () {
        // validate the input
        // 1. username must exist in user_list
        // 2. username is not an active contact
        let btn = document.getElementById('add-contact-btn');
        btn.disabled = true;
        let index = searchContact(user, input.current.value);
        if (user.username === input.current.value) {
            setError("This is you");
        } else if (!searchUser(input.current.value)) {
            setError("Username not found");
        } else if (index !== null) {
            setError("This contact is already registered");
        } else {
            setError("Looks good");
            btn.disabled = false;
        }
    }

    const addNewContact = function () {
        addContact(user, input.current.value);
        reload();
    }
    return (
        <div>
            <button id="new-contact" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                <i className="bi bi-person-plus"></i>
            </button>
            <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add a new contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label className="form-label">Contact's username</label>
                                    <input ref={input} onChange={textChanged} type="text" className="form-control"></input>
                                    {error}
                                </div>
                                <button onClick={addNewContact} id="add-contact-btn" className="btn btn-primary" data-bs-dismiss="modal">
                                    <i className="bi bi-person-plus"></i> Add contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactAdder;