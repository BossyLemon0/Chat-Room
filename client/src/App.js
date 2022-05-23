import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/chatroom.css"

const socket = io('http://localhost:3001')

function App() {

    useEffect(()=>{
      // get messsages
    },[])

    const [userCode, setUserCode] = useState(null);
    const [message, setMessage] = useState('');
    const [sentMessages, setSentMessages] = useState([{}]);
    const handleMessage = (event) => {
      setMessage(event.target.value);
    };

        socket.on("connect", ()=>{
            console.log("hey")
            setUserCode(socket.id)
        })

    const submit = () => {
      // store the message and change the state of the chat box to add it
      let date = new Date()
      let time = date.getTime();
      setSentMessages(()=>[...sentMessages, {user:userCode,message:message,time:time}])
      setMessage('')
      console.log(message)
      console.log(sentMessages)
    }


    
    function render (){
    }

  return (
    <div className='backdrop'>
      <Paper elevation={3} sx={{minHeight: 1000, minWidth:800, display:'flex', justifyContent:"center", alignItems:'center', flexDirection:"column"}}>
        {/* name */}
        <div className='header-name'>
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
                  value={message}
                  onChange={handleMessage}
        />
              <Button variant="text" onClick={submit}>Send</Button>
        </div>

        
      </Paper>

    </div>
  );
}

export default App;
