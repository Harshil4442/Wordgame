import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Dash.css";
import Draw from './draw.jsx';
import Word from './word.jsx';
import Chat from './chat.jsx';
import Standings from './standings.jsx';
import io from 'socket.io-client';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Users from './users.jsx';
import LogoutIcon from '@mui/icons-material/Logout';

import { HiddenProvider } from './hiddencontext.jsx';
import canvaas from './canvas.jpeg'
import Avatar from './avatar.jsx';
import useravatar from "./useravatar.gif"



function Dash() {
    const navigate = useNavigate();
    var socket;

    const [providesockett, setSocketSetter] = useState(undefined);
    const [usernames, setUsernames] = useState(undefined);
    const [check, setCheck] = useState(false);

    const username = localStorage.getItem('name');
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    // const handleLanguageChange = (event) => {
    //     setSelectedLanguage(event.target.value);
    // };
    // const handleCodeChange = (newCode) => {
    //     setCode(newCode);
    // };

    useEffect(() => {

        if (id && username && !check) {
            socket = io('http://localhost:3000/');
            socket.emit('Update_users', { id, username });
            setSocketSetter(socket);
            setCheck(true);
        }

    }, []);

    useEffect(() => {

        socket?.on('User list for frontend', (usernames) => {
            setUsernames(usernames);
        });

    }, [socket]);

    useEffect(() => {

        socket?.on('New user joined', (username) => {
            toast(`${username} joined the room`);
        });
        socket?.on('User left the room', (username) => {
            toast(`${username} left the room`);
        });

    }, [socket]);

    const logoutt = () => {
        console.log('1');
        navigate('/');
        window.location.reload();
    }

    const gradientColor = `linear-gradient(135deg, #001F3F, #001F7F)`;

    return (
        <HiddenProvider>
            <div className='flex h-screen'>
                <section className='w-1/4'>
                <div className='flex flex-col h-full w-full ' style={{background:gradientColor}}>
                        <div className='flex align-items-center justify-content-center' style={{position:'relative',height:'10%'}}>
                            <img src={useravatar} style={{ height: '100%', width: '20%' }} alt="Texture Background" />
                            <h3 style={{color:'white'}}>Players</h3>    
                        </div>
                        <div className='flex flex-col overflow-x-hidden'>
                        {usernames?.map((name, key) => (
                            <div key={key} className='flex w-full px-20' style={{margin:'0.5rem'}}>
                                <div style={{width:'20%'}}>
                                    <Avatar email={name} size={40}/>
                                </div>
                                <div style={{width:'70%'}}>
                                    <Users initials={`${name}`} key={key} total={usernames.length}/>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>
                <section className='w-2/4'>
                    <div className='h-full' style={{position:'relative'}}>
                    {/* <Draw sockett={providesockett} /> */}
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 ,height:'100%',width:'100%'}}>
                            <img src={canvaas} style={{ height: '100%', width: '100%',opacity:0.1 }} alt="Texture Background" />
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 ,height:'100%',width:'100%',justifyContent:'center'}}>
                            <Draw sockett={providesockett} />   
                        </div>
                    </div>
                    
                    
                </section>
                <section className='w-1/4 '>
                    <div className='h-full flex flex-column'>
                        <div className='flex align-items-center justify-content-center bg-blue-500 h-1/6' style={{ position: 'relative'}}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 ,height:'100%',width:'100%',justifyContent:'center'}}>
                                <Word sockett={providesockett} />
                            </div>
                        </div>
    
                        <div className='flex align-items-center justify-content-center bg-gray-600 h-2/3' style={{ position: 'relative'}}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 ,height:'100%',width:'100%',justifyContent:'center'}}>
                                <Chat sockett={providesockett} />   
                            </div>
                        </div>
                        <div className='h-1/6'>
    
                            <div className='flex align-items-center justify-content-center bg-navy h-2/3'>
                                <Standings sockett={providesockett} />
                            </div>

                            <div className='flex align-items-center justify-content-center bg-white h-1/3'>
                                <LogoutIcon className='logoutIcon' onClick={logoutt} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </HiddenProvider>
    );
    
}

export default Dash;
