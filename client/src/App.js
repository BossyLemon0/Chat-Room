import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./styles/chatroom.css"

const socket = io('http://localhost:3001')

function App() {

  const [userCode, setUserCode] = useState(null);
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [msgsRendered, setMsgsRendered] = useState(<div></div>)
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


// TESTING

// 1
    // const getSentMessages = ()=>{
    //   return sentMessages
    // }

// 2
    // var renderMsgs = () => {
    //   // map out sentMessages
    //   // if the messages match the persons usercode have the message display right, if not display left
    //   console.log("working?")
    //   sentMessages.map((msgObj)=>{
    //     if(msgObj.user == userCode){
    //       return (
    //       <div className='messageObj'>
    //         <Paper className='right'>{msgObj.message}</Paper>
    //         <div className='time'>{msgObj.time}</div>
    //       </div>
    //       )
  
    //     }
    //     else{
    //       return (
    //         <div className='messageObj'>
    //           <Paper className='left'>{msgObj.message}</Paper>
    //           <div className='time'>{msgObj.time}</div>
    //         </div>
    //         )
    //     }
    //   })
    // }
    
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
        <div className='chatarea'>
          <Paper className='left' sx={{ marginBottom:2}}>chat</Paper>
          {sentMessages.map((msgObj, idx)=>{
            return msgObj.user == userCode ? 
            <div key={idx} className='messageObjS'>
              <Paper className='right' sx={{minWidth:200}}>{msgObj.message}</Paper>
              <div className='time'>{msgObj.time}</div>
            </div>
            :
            <div key={idx} className='messageObjR'>
              <Paper className='left'>{msgObj.message}</Paper>
              <div className='time'>{msgObj.time}</div>
            </div>
          })}
        </div>
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
