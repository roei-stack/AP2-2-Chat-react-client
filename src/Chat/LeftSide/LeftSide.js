import UserHeader from "./UserHeader";

function LeftSide({user, contactBlockList, reload, reloadVal}) {
    return (
        <div id="left-side" className="col-4 vh-100">
            <UserHeader user={user} reload={reload} reloadVal={reloadVal} />
            <div className="chat-list list-group vh-100">{contactBlockList}</div>
        </div>
    );
}

export default LeftSide;
