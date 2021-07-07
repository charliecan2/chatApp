import { useSockets } from '../context/socket.context';
import { useRef, useEffect } from 'react'
import EVENTS from '../config/events';
import styles from '../styles/Messages.module.css';

function MessagesContaier(){

    const {socket, messages, roomId, username, setMessages} = useSockets();
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);

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
                message,
                time: `${date.getHours()}:${date.getMinutes()}`,
            }
        ]);

        newMessageRef.current.value = '';
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    if(!roomId){
        return <div />
    }

    return(
    <div className={styles.wrapper}>
        <div className={styles.messageList}>
            {messages.map(({message, username, time}, index) => {
                return (
                <div className={styles.message}>
                    <div className={styles.messageInner}>
                        <span className={styles.messageSender}>{username} - {time}</span>
                        <span className={styles.messageBody} key={index}>{message}</span>
                    </div>
                </div>
                )
            })}
            <div ref={messageEndRef} />
        </div>
    <div className={styles.messageBox}>
        <textarea 
        rows={1}
        placeholder="Tell us what's on your mind"
        ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
        </div>
    </div>)
};

export default MessagesContaier;