import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';


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
      <Paper elevation={3}>
        {/* name */}
        <div></div>
        {/* chat  */}
        <Paper></Paper>
        {/* typing */}
        <TextField id="standard-basic" label="Standard" variant="standard" />
        
      </Paper>
    {
        userCode && 
        <div>{userCode}</div>
    }
    </div>
  );
}

export default App;
