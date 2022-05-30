import React, { useEffect, useState } from 'react'
import Entry from './LoginSignup/Entry.js';
import Chat from './Chat/Chat.js';
import { Route, Routes } from 'react-router-dom';

function App() {
  // setup paths for entry and chat pages
  return (
    <div>
      <Routes>
        <Route path="*" element={<Entry />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
