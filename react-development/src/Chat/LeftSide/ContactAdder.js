import { useState, useEffect, useRef } from 'react'

function ContactAdder({ username, reload }) {

    
    const idRef = useRef("");
    const serverRef = useRef("");

    const [err, setErr] = useState("Add a contact");
    const [response, setResponse] = useState(0);

    const addNewContact = async (e) => {
        e.preventDefault();
        let contactId = idRef.current.value;
        let contactServer = serverRef.current.value;
        if (!contactId || !contactServer) {
            setErr("just dont");
            return;
        }
        // send request to server
        const response = await fetch('https://localhost:7007/api/contacts/' + username, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: contactId,
                name: contactId,
                server: contactServer
            })
        });
        setResponse(response.status);
        reload();
    }

    useEffect(() => {
        if (response === 0) {
            return;
        }
        console.log('here')
        console.log(response);
        if (response !== 201) {
            setErr("An error occured");
            return;
        }
        reload();
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
                                    <input ref={idRef} type="text" className="form-control"></input>
                                    <label className="form-label">Contact's server</label>
                                    <input ref={serverRef} type="text" className="form-control"></input>
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