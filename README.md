# Advanced Programming 2 - ex2
### Authors:

**Roei Cohen, Eithan Rospsha**

### Usage:
-1. Please make sure you have cloned the main branch and no any other branch.<br>
0. Make sure you have download the following: `asp.net6` `node.js`<br>
1. clone the repository, (choose option `open with visual studio`)<br>
2. start `BorisKnowsAllApi` and `BorisWeb` with VS or `dotnet`
3. Go to `react-development/src/data/data.js` and make sure `API_URL` IS EQUAL TO `BorisKnowsAllApi` base address<br>
4. navigate to `react-development`<br>
5. open the terminal, and type `npm install` then `npm start`<br>
### PLEASE NOTE:
client-server communication may be blocked due to network settings, to prevent these errors navigate to the project's folder and execute 
`dotnet dev-certs https --clean` and `dotnet dev-certs https --trust`

#### How is works:

We used `javascript`, `Bootstrap`, `React`, `asp.net` <br>
Used packetges: `react`, `react-don` `react-router-dom` `@microsoft/signalR`.<br>
database structure:<br>
Class `User: username, password, nickname, contacts[]`<br>
Class `Contact: id, name, messages[]`<br>
Class `Message: id, content, sent, created`<br>
Class `Rate: rating, feedback, name`<br>
