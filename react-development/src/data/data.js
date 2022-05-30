// It holds all the users, basically the dynamic database
import bob from './media/bob.jpg'
import kobi from './media/kobi.jpg'
import robi from './media/robi.jpg'
import shimi from './media/shimi.jpg'
import shmulic from './media/shmulic.jpg'
import boris from './media/boris.jpg';
import UserDefault from './media/user_default.jpg'

var users;

export class Time {
    /**
     * @param {Date} date  *
    */
    constructor(date = new Date()) {
        this.date = date;
    }

    /**
     * @returns true if the time is today, false other wise
     */
    isToday() {
        const today = new Date()
        return this.date.getDate() === today.getDate() &&
        this.date.getMonth() === today.getMonth() &&
        this.date.getFullYear() === today.getFullYear()
    }

    toString() {
        var date = this.date.getDate().toString().padStart(2, '0') + '/'
                + (this.date.getMonth() + 1).toString().padStart(2, '0') + '/'
                + this.date.getFullYear().toString().padStart(2, '0');
                    
        if (this.isToday()) {
            date += ' ' + this.date.getHours().toString().padStart(2, '0') + ':'
                        + this.date.getMinutes().toString().padStart(2, '0');
        }
        return date;
    }
}

function addUser(username, password, nickname, image) {
    users.push({
        username: username,
        password: password,
        nickname: nickname,
        image: image,
        contacts: []
    })
}

// check if user exists
export function searchUser(username) {
    for (const user of users) {
        if (user.username === username) {
            return user;
        }
    }
    return null;
}

// authenticate connection with user and password
export function auth(username, password) {
    for (const user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

// return true if sign up secceed, otherwise false
export function attemptSignUp(username, password, nickname = username, image) {
    if (searchUser(users, username) !== null) {
        return false;
    }
    // if not image is given, make one
    if (!image) {
        image = UserDefault;
    }
    // default nickname
    if (!nickname) {
        nickname = username;
    }

    addUser(username, password, nickname, image);
    // indicate success to caller
    return true;
}

export function getLastMessage(user, contactUserame) {
    let contactIndex = searchContact(user, contactUserame);
    if (contactIndex == null) {
        throw new Error('no contact found');
    }
    const contact = user.contacts[contactIndex];
    if (contact.messages.length === 0) {
        return null;
    }
    return contact.messages[contact.messages.length - 1];
}

/**
 * make a message struct given the data
 * @param {"text" | "image" | "voice recording" | "video"} type 
 * @param {string} data
 * @param {time} Date 
 */
function createMessage(type, data, time = new Date()) {
    return {
        time: new Time(time),
        type: type,
        data: data
    };
}

export function searchContact(user, contactUserame) {
    for (let i = 0; i < user.contacts.length; i++) {
        if (user.contacts[i].user.username === contactUserame) {
            return i;
        }
    }
    return null;
}

export function addContact(user, contactUsername) {
    // check if the contact exists
    const contact = searchUser(contactUsername);
    if (contact == null) {
        throw new Error('the username ' + contactUsername + ' does not exist');
    }
   
    if (searchContact(user, contactUsername) || searchContact(contact, user.username)) {
        throw new Error('this contact is already registered');
    }
    // add for user
    user.contacts.push({ user: contact, messages: [] });
    // add for contact
    contact.contacts.push({ user: user, messages: [] });
}

// sender and receiver must be registered users, and contacts of each other
export function sendMessage(sender, receiverUsername, messagetype, messageData, date = new Date()) {
    let index = searchContact(sender, receiverUsername);
    const reciever = searchUser(receiverUsername);
    if (index == null || reciever == null) {
        throw new Error('no receiver found');
    }
    let index2 = searchContact(reciever, sender.username);
    if (index2 == null) {
        throw new Error('sending error');
    }
    const message = createMessage(messagetype, messageData, date);
    sender.contacts[index].messages.push({ self: true, data: message });
    reciever.contacts[index2].messages.push({ self: false, data: message });
}

export function initialize() {
    const userbob = {
        username: 'bob',
        password: 'a1',
        nickname: 'bob',
        image: bob,
        //contacts: [ {user: userOther, messages: [{self:true, data:message},... ]} ,... ]
        contacts: []
    };

    const userrobi = {
        username: 'robi',
        password: 'a1',
        nickname: 'robi',
        image: robi,
        contacts: []
    };

    const userkobi = {
        username: 'kobi',
        password: 'a1',
        nickname: 'kobi',
        image: kobi,
        contacts: []
    };

    const usershmulic = {
        username: 'shmulic',
        password: 'a1',
        nickname: 'tzvika',
        image: shmulic,
        contacts: []
    };

    const usershimi = {
        username: 'shimi',
        password: 'a1',
        nickname: 'shimi',
        image: shimi,
        contacts: []
    };

    const usereli = {
        username: 'אלימלך',
        password: 'a1',
        nickname: 'אלימלך',
        image: shimi,
        contacts: []
    };

    const userboris = {
        username: 'boris',
        password: 'a1',
        nickname: 'boris the one and only',
        image: boris,
        contacts: []
    };
    users = [userbob, userrobi, userkobi, usershmulic, usershimi, usereli, userboris]; 
    let d = new Date('December 17, 1995 03:24:00');
    addContact(userbob, 'robi');
    sendMessage(userbob, 'robi', 'text', 'Hello robi!', d);
    sendMessage(userrobi, 'bob', 'text', 'hello to you too!');
    sendMessage(userrobi, 'bob', 'image', shmulic);
}
