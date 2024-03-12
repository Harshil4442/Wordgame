import React, { useState } from 'react';
import { IconButton, Modal, Backdrop, Fade, Typography, Paper } from '@mui/material';
import { useHiddenContext } from './hiddencontext';

const Standings = ({ sockett }) => {
  const { usernamepoints } = useHiddenContext();
  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  


  const handleOpen = () => {
    setOpen(true);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100); // Adjust the duration to match the transition duration
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='h-full w-full'>
      <IconButton
        onClick={handleOpen}
        style={{
            height: '100%',
            width: '100%',
            background: 'linear-gradient(45deg, #2176F3, #21ABF3)',
            backgroundSize: 'cover',
            borderRadius: '0px',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 255, 0.8)',
            transition: 'background 0.3s, transform 0.3s',
            transform: isClicked ? 'scale(0.8)' : 'scale(1)',
        }}
        >
  <Typography fontSize={{ sm: '0.5rem', md: '1rem', lg: '1.5rem' }} style={{ marginLeft: '5px', color: 'white' }}>
    Standings
  </Typography>
</IconButton>


      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Paper style={{ borderRadius:'5px',maxWidth: 300,width:'100%',height:'80%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='flex flex-col align-items-center justify-content-center h-1/6 w-full' style={{borderRadius:'5px',backgroundColor:'black',color:'white'}}>
              <b style={{fontSize:'2rem'}}>Players</b>
            </div>
            {/* <hr></hr> */} 
            <div className='flex flex-col w-full h-4/5 overflow-x-hidden'>
              {usernamepoints.map(({ value, username }, index) => (
                value>0?
                <div key={index} style={{marginTop:'0.125rem',marginBottom:'0.125',fontFamily: 'Single Day'}}>
                  <div key={index} className='flex flex-col align-items-center justify-content-center' >
                    <b style={{fontSize:'20px'}}>{username}</b>
                    <i style={{fontSize:'13px'}}>{value} points</i>
                  </div>
                  <hr></hr>
                </div>
                :
                <div key={index} style={{marginTop:'0.125rem',marginBottom:'0.125',fontFamily: 'Single Day'}}>
                  <div key={index} className='flex flex-col align-items-center justify-content-center' >
                    <b style={{fontSize:'20px'}}>{username}</b>
                    <i style={{color:'red', fontSize:'13px'}}>{value} points</i>
                  </div>
                  <hr style={{color:'black'}}></hr>
                </div>
              ))}
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Standings;
