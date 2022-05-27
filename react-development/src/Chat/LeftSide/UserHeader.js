import ContactAdder from "./ContactAdder";

function UserHeader({user, reload}) {
    return (
        <div className="header">
            <div className="user-image-header">
                <img src={user.image} className="img-fluid"></img>
            </div>
            <div className="user-logged">
                <h4>{user.username}</h4>
            </div>
            <ContactAdder user={user} reload={reload}/>
        </div>
    );
}

export default UserHeader;
