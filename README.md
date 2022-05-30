# Advanced Programming 2 - ex2
### Authors:

**Roei Cohen, Eithan Rospsha**

### Usage:

0. Make sure you have download the following: `asp.net6` `node.js`<br>
1. clone the repository, (choose option `open with visual studio`)<br>
2. start `BorisKnowsAllApi` and `BorisWeb` with vs or `dotnet`
3. go to `react-development/src/data/data.js` and make sure `API_URL` is `BorisKnowsAllApi` base address<br>
4. navigate to `react-development`<br>
5. open the terminal, and type `npm install` then `npm-start`<br>

#### How is works:

We used `javascript`, `Bootstrap`, `React`, `asp.net` <br>
Used packetges: `react`, `react-don` `react-router-dom` `signalR`.<br>
database structure:<br>
Class `User: username, password, nickname, contacts[]`<br>
Class `Contact: id, name, messages[]`<br>
Class `Message: id, content, sent, created`<br>
Class `Rate: rating, feedback, name`<br>
