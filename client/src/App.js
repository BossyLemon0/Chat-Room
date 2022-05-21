import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'

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
    <>
    {
        userCode && 
        <div>{userCode}</div>
    }
    </>
  );
}

export default App;
