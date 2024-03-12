import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
// import './index.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>,
);


/* 

(1) Main compos: 
-Dash
-Draw
-Word
-Chat
-Standings
-Users

(2) Extra compos:
-hiddencontext  =>used to pass words from Word compo to Chat compo
-hiddencontext1  =>used to pass usernm from Word compo to Draw compo

*/