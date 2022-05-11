import React from 'react'
import Entry from './LoginSignup/Entry.js';
import Chat from './Chat/Chat.js';
import { Route, Routes } from 'react-router-dom';
import Init from './Init.js';

function App() {
  // setup paths for entry and chat pages
  return (
    <div>
      <Init />
      <Routes>
        <Route path="*" element={<Entry />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
