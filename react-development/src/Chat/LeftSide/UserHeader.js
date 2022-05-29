import ContactAdder from "./ContactAdder";
import imageDefault from '../images/boris.jpg'

function UserHeader({username, reload}) {
    return (
        <div className="header">
            <div className="user-image-header">
                <img src={imageDefault} className="img-fluid"></img>
            </div>
            <div className="user-logged">
                <h4>{username}</h4>
            </div>
            <ContactAdder username={username} reload={reload}/>
        </div>
    );
}

export default UserHeader;
