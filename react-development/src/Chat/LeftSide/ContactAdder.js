import { useState, useEffect, useRef } from 'react'

function ContactAdder({ username, reload }) {

    const id = useRef("");
    const server = useRef("");

    const [err, setErr] = useState("Add a contact");
    const [isRequest, setIsRequest] = useState(false);
    const [response, setResponse] = useState(0);

    const addNewContact = () => {
        setIsRequest(true);
    }

    useEffect(() => {
        const postContact = async () => {
            const response = await fetch('https://localhost:7007/api/contacts/' + username, {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name: id,
                    server: server
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (isRequest == true) {
                setResponse(response.status);
            }

        }
        postContact();
    }, [isRequest]);


    useEffect(() => {
        if (response === 201) {
            reload();
        } else {
            setIsRequest(false);
            setErr("Bad request, " + response);
        }
    }, [response]);

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
                                    <input ref={id} type="text" className="form-control"></input>
                                    <label className="form-label">Contact's server</label>
                                    <input ref={server} type="text" className="form-control"></input>
                                    {err}
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