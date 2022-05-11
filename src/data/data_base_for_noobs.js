// It holds all the users, basically the dynamic database
import bob from './bob.jpg'
import kobi from './kobi.jpg'
import robi from './robi.jpg'
import shimi from './shimi.jpg'
import shmulic from './shmulic.jpg'
import polka_cat from './polka_cat.mpeg'
import marvel_op from './marvel_op.mp4'
import the_knowledge_of_hightech from './the_knowledge_of_hightech.jpg';
import boris from './boris.jpg';
import UserDefault from './user_default.jpg'

var users;

class Time_In_Day {
    /**
     * @param {int} hour
     * @param {int} minute 
     * @param {int} second 
     */
    constructor(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    /**
     * @returns the time in the day in format hour:minute
     */
    get_str() {
        if (this.minute < 10) {
            return this.hour + ":0" + this.minute;
        }
        return this.hour + ":" + this.minute;
    }

    /**
     * @param {Time_In_Day} other_time_in_day 
     * @returns return 1 if this date > other date, 0 if equal
     * and -1 if other date > this date
     */
    is_bigger_than_other(other_time_in_day) {
        if (this.hour > other_time_in_day.hour) {
            return 1;
        } else if (this.hour < other_time_in_day.hour) {
            return -1;
        } else if (this.minute > other_time_in_day.minute) {
            return 1;
        } else if (this.minute < other_time_in_day.minute) {
            return -1;
        } else if (this.second > other_time_in_day.second) {
            return 1;
        } else if (this.second < other_time_in_day.second) {
            return -1;
        } else {
            return 0;
        }
    }
}

class Date_Real {
    /**
     * @param {int} day 
     * @param {int} month 
     * @param {int} year 
     */
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    /**
     * @returns the date in format day.month.year
     */
    get_str() {
        if (this.month < 10) {
            return this.day + ".0" + this.month + "." + this.year;
        }
        return this.day + "." + this.month + "." + this.year;
    }

    /**
     * @param {Date_Real} other_date 
     * @returns return 1 if this date > other date, 0 if equal and -1
     * if other date > this date
     */
    is_bigger_than_other(other_date) {
        if (this.year > other_date.year) {
            return 1;
        } else if (this.year < other_date.year) {
            return -1;
        } else if (this.month > other_date.month) {
            return 1;
        } else if (this.month < other_date.month) {
            return -1;
        } else if (this.day > other_date.day) {
            return 1;
        } else if (this.day < other_date.day) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * @param {Date_Real} other_date 
     * @returns true if the dates are equal, false otherwise
     */
    is_equal(other_date) {
        return (this.day === other_date.day &&
            this.month === other_date.month && this.year === other_date.year);
    }
}

export class Time {
    /**
     * @param {Date_Real} date 
     * @param {Time_In_Day} time_in_day 
     */
    constructor(date, time_in_day) {
        this.date = date;
        this.time_in_day = time_in_day;
    }

    /**
     * @param {Time} other_time 
     * @returns return 1 if this date > other date, 0 if equal and -1
     * if other date > this date
     */
    is_bigger_than_other(other_time) {
        if (this.date.is_bigger_than_other(other_time.date) === 1) {
            return 1;
        } else if (this.date.is_bigger_than_other(other_time.date) === -1) {
            return -1;
        } else if (this.time_in_day.is_bigger_than_other(other_time.time_in_day) === 1) {
            return 1;
        } else if (this.time_in_day.is_bigger_than_other(other_time.time_in_day) === -1) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * @returns {Time} the current time in the database Time type
     */
    static get_current_time() {
        var now = new Date();
        return new Time(
            new Date_Real(now.getDate(), now.getMonth(), now.getFullYear()),
            new Time_In_Day(now.getHours(), now.getMinutes(), now.getSeconds())
        );
    }

    /**
     * @returns true if the time is today, false other wise
     */
    is_today() {
        let now = Time.get_current_time();
        return this.date.is_equal(now.date);
    }

    get_str() {
        let time = this.date.get_str();
        if (!this.is_today()) {
            time += " " + this.time_in_day.get_str();
        }
        return time;
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

export function searchContact(user, contactUserame) {
    for (let i = 0; i < user.contacts.length; i++) {
        if (user.contacts[i].user.username === contactUserame) {
            return i;
        }
    }
    return null;
}

// authenticate connection with user and password
export function auth(username, password) {
    for (const user of users) {
        if (user.username === username && user.password == password) {
            return true;
        }
    }
    return false;
}

// return true if sign up secceed, otherwise false
export function attemptSignUp(username, password, nickname, image) {
    if (searchUser(users, username) !== null) {
        return false;
    }
    // if not image is given, make one
    if (!image) {
        image = UserDefault;
    }
    addUser(username, password, nickname, image);
    // indicate success to caller
    return true;
}

export function getLastMessage(user, contactUserame) {  
    let contactIndex = searchContact(user, contactUserame);
    if (contactIndex == null) {
        throw 'no contact found';
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
 */
 function createMessage(type, data) {
    return {
        time: Time.get_current_time().get_str(),
        type: type,
        data: data
    };
}

export function addContact(user, contactUsername) {
    // check if the contact exists
    const contact = searchUser(contactUsername);
    if (contact == null) {
        throw 'the username ' + contactUsername + ' does not exist';
    }
    if (searchContact(user, contactUsername) || searchContact(contact, user.username)) {
        throw 'this contact is already registered'
    }
    // add for user
    user.contacts.push({user: contact, messages: []});
    // add for contact
    contact.contacts.push({user: user, messages: []});
}

// sender and receiver must be registered users, and contacts of each other
export function sendMessage(sender, receiverUsername, messagetype, messageData) {
    let index = searchContact(sender, receiverUsername);
    const reciever = searchUser(receiverUsername);
    if (index == null || reciever == null) {
        throw 'no receiver found';
    }
    let index2 = searchContact(reciever, sender.username);
    if (index2 == null) {
        throw 'sending error';
    }
    const message = createMessage(messagetype, messageData);
    sender.contacts[index].messages.push({self:true, data: message});
    reciever.contacts[index2].messages.push({self:false, data: message});
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

    var date1 = new Date_Real(15, 12, 2004);
    var date2 = new Date_Real(19, 4, 2015);
    var date3 = new Date_Real(30, 4, 2022);

    var time_in_day1 = new Time_In_Day(12, 31, 54);
    var time_in_day2 = new Time_In_Day(12, 50, 54);

    var time1 = new Time(date1, time_in_day1);
    var time2 = new Time(date2, time_in_day1);
    var time3 = new Time(date3, time_in_day1);
    var time4 = new Time(date3, time_in_day2);

    addContact(userbob, 'robi');
    sendMessage(userbob, 'robi', 'text', "Hello robi!");
    
}
