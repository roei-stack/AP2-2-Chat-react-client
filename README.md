# Advanced Programming 2 - ex1
### Authors:

**Roei Cohen, Eithan Rospsha**

### Usage:

have node.js. downloaded<br>
run `npm install` then `npm start` at the project's directory

#### How is works:

In our project we used `javascript`, `Bootstrap` and `React`. <br>
The packages that we used are: `react`, `react-don` and `react-router-dom`.<br>
The database:<br>
`users` - an array that holds the users (i know right?)<br>
Each user has this structure:<br>
`user : {username:string, password:string, nickname:string, image:string, contacts:Contact[]}`<br>

The `contacts` datatype:<br>
`contact = {user: User, messages: Message[] }`<br>

The `message` datatype:<br>
`message = {self: bool, time: string, datatype: "text" | "video" | "image" | "audio", data: string}`<br>

And that's all, now you are more knowledgeable about how our project works :)
