import { useSockets } from '../context/socket.context';
import { useRef } from 'react'
import EVENTS from '../config/events';

function MessagesContaier(){

    const {socket, messages, roomId, username, setMessages} = useSockets();
    const newMessageRef = useRef(null);

    const handleSendMessage = () => {
        const message = newMessageRef.current.value;

        if(!String(message).trim()){
            return;
        }

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, messages, username});

        const date = new Date()

        setMessages([
            ...messages,{
                username: 'You',
                messages,
                time: `${date.getHours()}:${date.getMinutes()}`,
            }
        ])
    }

    if(!roomId){
        return <div />
    }

    return(
    <div>
        {messages.map(({message}, index) => {
            return <p key={index}>{message}</p>
        })}

        <div>
            <textarea 
            rows={1}
            placeholder="Tell us what's on your mind"
            ref={newMessageRef}
            />
        </div>
    </div>)
};

export default MessagesContaier;