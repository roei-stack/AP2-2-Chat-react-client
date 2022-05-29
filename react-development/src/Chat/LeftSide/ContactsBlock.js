
function ContactsBlock({ img, id, last, lastdate, name, setActive }) {


    const contactClicked = () => {
        setActive(id);
    }

    return (
        <div
            onClick={contactClicked}
            className="contact-block list-group-item list-group-item-action"
            data-bs-toggle="list">
            <div><img src={img} className="img-fluid contact-photo" alt="❓ERROR❓"></img></div>
            <div className="contact-box-details">
                <h6>{name}</h6>
                <div
                    className="last-msg-details">
                    <div id="lastText">
                        {last}
                    </div>
                    <div>
                        {lastdate}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsBlock;
