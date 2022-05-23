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
    const [sentMessages, setSentMessages] = useState([]);
    const handleMessage = (event) => {
      setMessage(event.target.value);
    };

        socket.on("connect", ()=>{
            console.log("hey")
            setUserCode(socket.id)
        })

    const submit = () => {
      // store the message and change the state of the chat box to add it
      // they are stored in a variable because putting state into state has a delay of one
      let time = getTime()
      let currentMsg = getMessage();
      setSentMessages(()=>[...sentMessages, {user:userCode,message:currentMsg,time}])
      setMessage('')

      console.log(sentMessages)

      // testing
      // let currentMsgArray = getSentMessages();
      // console.log(currentMsgArray)
    }

    const getTime = ()=>{
      let date = new Date()
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    const getMessage = ()=>{
      return message
    }

    // const getSentMessages = ()=>{
    //   return sentMessages
    // }

    const renderMsgs = (msg) => {
      // map out sentMessages
      // if the messages match the persons usercode have the message display right, if not display left
      
      if(msg == userCode){
        return (
        <Paper></Paper>
        )

      }
      else{

      }

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
