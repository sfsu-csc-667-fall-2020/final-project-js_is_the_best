import React from 'react'
import ChatBox from '../components/ChatBox/ChatBox'
import Navigationbar from '../components/Navbar/Navigationbar'

const webSocket = new WebSocket('ws://localhost:5000')
const MessageCenter = ()=>{
    const [message, setMessage] = React.useState('');
    const [chatMessages, setChatMessages] = React.useState([]);
    
    const handleSubmit = () =>{
        console.log(message);
        const data = {
            message
        };
        webSocket.send(JSON.stringify(data));
        setMessage('');
    };
    const handleWebSocketMessage = (rawData) =>{
        console.log(rawData.data);
        const data = JSON.parse(rawData.data);
        console.log(data);
        switch(data.actionType){
          case 'updateChatMessages':
            //store chat messages
             setChatMessages(data.chatMessages);
             break;
          default:
        }
      };
      React.useEffect(()=>{
        webSocket.addEventListener('message', handleWebSocketMessage);
      },[]);
    
      console.log(chatMessages);
    return(
        <div>
            <Navigationbar></Navigationbar>
            <div>
            <div>
          <h2>Welcome</h2>
          <textarea value={message} onChange={e=>setMessage(e.target.value)}/>
          <button onClick = {handleSubmit}>Submit</button>
        </div>
            <div>
                <table>
                <tbody>
                {chatMessages.map((chatMessage, i) => (      
                <tr key={i}>
                <td>
                    {chatMessage.userName}
                </td>
                <td>
                    {chatMessage.message}
                </td>
                </tr>
                ))}
                </tbody>
              </table>
             </div>
            </div>
        </div>
    )
}

export default MessageCenter;