import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/chatroom.css"

const socket = io('http://localhost:3001')

function App() {

    const [userCode, setUserCode] = useState(null);

        socket.on("connect", ()=>{
            console.log("hey")
            setUserCode(socket.id)
        })


    
    function render (){
    }

  return (
    <div className='backdrop'>
      <Paper elevation={3} sx={{minHeight: 1000, minWidth:800, display:'flex', justifyContent:"center", alignItems:'center', flexDirection:"column"}}>
        {/* name */}
        <div>
        {
        userCode && 
        <div>{userCode}</div>
        }
        </div>
        {/* chat  */}
        <div className='chatarea'>chat</div>
        {/* typing */}
        <div>
        <TextField
                  id="standard-basic"
                  label="message..."
                  variant="standard"
                  sx={{minWidth:500}}
        />
              <Button variant="text">Send</Button>
        </div>

        
      </Paper>

    </div>
  );
}

export default App;
