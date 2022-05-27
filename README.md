# Advanced Programming 2 - ex1
### Authors:

**Roei Cohen, Eithan Rospsha**

### Usage:

Make sure you have download node.js.<br>
Create a new react app using `npx create-react-app app-name`.<br>
Delete the contents of the `src` folder.<br>
Create your react router by entering the `app-name` folder that you created using `cd .\app-name\` and then install your router using `npm install react-router-dom`.<br>
now you can clone the project from the git to your folder and run the project using `npm start`.

#### How is works:

In our project we used `javascript`, `Bootstrap` and `React`. <br>
the packages that we used are: `react`, `react-don` and `react-router-dom`.<br>
the database is working with the following structure:<br>
the `user_list` is an array that holds the users.<br>
every user has the following structure:<br>
`user : {username, password, nickname, image, chat_list}`<br>
while username, password and nickname are normal strings, image is the path to the image.<br>
`chat_list` is a list of chats, every chat has the following structure:<br>
`chat = {username_other, nickname_other, image_other, to_display, message_list}`<br>
username_other, nickname_other and image_other are the parameters of the other user - the contact from the point of view of the user that hold the chat_list.<br>
`to_display` is boolean that determine if we see the chat or not.<br>
`message_list` is list of the messeges that the users sent.<br>
the sructure of messege is as following:<br>
`message = {sender, time, type, data}`<br>
- `sender` is the user who send the message
- `time` is when the message sent
- `type` is the data type of the message (text, image, video, voice recording)
- `data` is the actual data of the message <br><br>
and that's all, now you are more knowledgeable about how our project works :)
