
function ContactsBlock({ img, id, last, lastdate, name, setActive }) {


    const contactClicked = () => {
        setActive(id);
    }

    let date = lastdate.substr(0, 10);
    let time = lastdate.substr(11, 5);
    let dateAndTime = date + ' ' + time;
    if (time === '00:00') {
        dateAndTime = ''
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
                        {dateAndTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactsBlock;
