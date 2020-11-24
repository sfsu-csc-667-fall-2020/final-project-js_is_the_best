import React from 'react'
import './ChatBox.css'

const ChatBox = () =>{
    const chatMessages ={

    }
    const handleSubmit=()=>{
        console.log("Hello")
    }
    return(
        <>
        <div className="chat-container">
            <div className="chat-header">Youzer Naim</div>
            <form className="chat-form">
                <input className="input" type="text" placeholder="Send a message..."/>
                <button className="sendMessageButton" onSubmit={()=>handleSubmit}>Send</button>
            </form>
        </div>
        
        <div className='chat-footer-grid'>
            <div className='chat-username'>your_username123</div>
            <div  className='chat-utilities'>
            </div>
        </div>
    </>

    )
}

export default ChatBox;