import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useHiddenContext } from './hiddencontext';
import "./Word.css"
import Avatar from './avatar';
import clock from "./clock.gif";

const Word = ({ sockett }) => {

    const { setHiddenWordValue,setusrr } = useHiddenContext();

    const [isButtonVisible, setButtonVisibility] = useState(true);
    const [words, setwords] = useState(null);
    const [usernm,setuser]= useState(null);
    const [timer,settimer]= useState(-1);
    const [restartEmitted, setRestartEmitted] = useState(false);
    const [wordButtonDisabled, setWordButtonDisabled] = useState(false);
    const [selectedbutton,setselectedbutton]=useState(null);


    useEffect(() => {
        sockett?.on('Inivisible Button', (space) => {
            setButtonVisibility(false);
        });
        sockett?.on('Inivisible Button for new user', () => {
            setButtonVisibility(false);
        });

        sockett?.on('Who is drawing',(usernm)=>{
            setuser(usernm);
            settimer(30);
            setRestartEmitted(false);
            setusrr(usernm);
        });
        sockett?.on('Generated words for user frontend', (generatedwords) => {
            setwords(generatedwords);
        });
        sockett?.on('Hidden word for frontend', (word) => {
            setHiddenWordValue(word);
        });
        sockett?.on('Updated timer for frontend',(timerr)=>{
            settimer(timerr);
        });
        sockett?.on('Clear frontend for word component', (space) => {
            setButtonVisibility(true);
            setwords(null);
            setuser(null);
            settimer(-1);
            setWordButtonDisabled(false);
            setHiddenWordValue(null);
        });
    }, [sockett]);


    const handleGenerateWords = () => {
        var space = "";
        sockett?.emit('Generate words for a random user', space);
        const button = document.getElementById('generateWordsButton');
        button.classList.add('animate-pulse'); // Add the 'animate-pulse' class for the pulse animation
      
    };
    const handleSelectedWord = (word,number) => {
        if (!wordButtonDisabled) {
            sockett?.emit('Selected word', word);
            setWordButtonDisabled(true); // Disable the button after it's pressed
            setselectedbutton(number);
        }
    };

    useEffect(() => {
        let interval;
        console.log(timer);
        if (timer > 0) {
          // Start the timer
          interval = setInterval(() => {
            settimer((prevTimer) => prevTimer - 1);
            sockett?.emit('Update timer',timer-1);
          }, 1000);
        }
        else if (timer <= 0 && !restartEmitted) {
            clearInterval(interval);
            var space = "";
            sockett?.emit('Restart all', space);
            setRestartEmitted(true);
            setselectedbutton(null);
        }

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
      }, [timer,sockett,restartEmitted]);


    return (
        <div className='h-full w-full flex flex-col justify-content-center align-items-center' style={{
            background: 'linear-gradient(45deg, #2176F3, #21ABF3)',
            backgroundSize: 'cover',
            borderRadius: '5px',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 255, 0.6)',
            transition: 'background 0.3s, transform 0.3s',
        }}>
            {/* <div> */}
                {usernm &&
                (
                    <div className='h-1/2 flex justify-content-center'>
                        <div className='flex justify-content-center align-items-center' style={{width:'20%',marginRight:'0.5rem'}}>
                            <Avatar email={usernm} size={40}/>
                        </div>
                        <div className='flex flex-col justify-content-center align-items-center' style={{fontSize:'90%'}}>
                            <i className='h-1/2' style={{fontSize:'90%'}}><b style={{fontSize:'90%'}}>{usernm}</b> is drawing...</i>
                            <div className='h-1/2' style={{fontSize:'90%', color:'#a71313'}}><b>Time remaining : {timer}</b></div>
                        </div>
                        <div className='flex justify-content-center align-items-center' style={{width:'20%',marginLeft:'0.5rem'}}>
                            <img src={clock} style={{ height: '100%', width: '100%',marginLeft:'0.5rem' }} alt="clock" />
                        </div>
                    </div>
                )
                }
            {/* </div> */}
            {isButtonVisible ? (
                <Button id="generateWordsButton" 
                        variant="contained" 
                        onClick={handleGenerateWords} 
                        className='gradient-button'
                        style={{
                            height: '40%',
                            width: '60%',
                            background: 'linear-gradient(45deg, #ffffff, #fffffh)',
                            backgroundSize: 'cover',
                            borderRadius: '5px',
                            boxShadow: 'inset 0 0 20px rgba(0, 0, 255, 0.7)',
                            transition: 'background 0.3s, transform 0.3s',
                            fontSize:' 0.875rem',
                            lineHeight: '1.25rem',
                        }}>
                    Generate Words
                </Button>
            ) : (
                words && (
                    <div className='flex-1 align-items-center h-1/2 w-full overflow-x-hidden'>
                        {words.map((word, index) => (
                            <Button id="generateWordsButton2" 
                                    key={index} 
                                    variant="contained" 
                                    onClick={() => handleSelectedWord(word,index)} 
                                    disabled={selectedbutton===index?false:wordButtonDisabled} 
                                    className='word-button'
                                    style={{
                                        height: '80%',
                                        width: '30%',
                                        margin:'1.5%',
                                        backgroundSize: 'cover',
                                        borderRadius: '5px',
                                        boxShadow: 'inset 0 0 20px rgba(0, 0, 255, 0.6)',
                                        transition: 'background 0.3s, transform 0.3s',
                                        transform: selectedbutton===index ? 'scale(1)' : 'scale(0.8)',
                                        fontSize:' 0.75rem',
                                        lineHeight: '1rem',
                                    }}
                                    >
                                {word}
                            </Button>
                        ))}
                    </div>
                )
            )}
            
        </div>
    );

};

export default Word;
