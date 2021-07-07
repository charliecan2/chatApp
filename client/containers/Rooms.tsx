import { useRef } from 'react';
import { useSockets } from "../context/socket.context";
import EVENTS from '../config/events';

function RoomsContainer(){
    const { socket, roomId, rooms } = useSockets()
    const newRoomRef = useRef(null);

    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || '';

        if(!String(roomName.trim())) return;

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});

        newRoomRef.current.value = '';
    }

    const handleJoinRoom = (key) => {
        if (key === roomId){
            return;
        }
        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
    }

    return (
        <nav>
            <div>
                <input placeholder="Room name" ref={newRoomRef} />
                <button onClick={handleCreateRoom}>CREATE ROOM</button>
            </div>

            {Object.keys(rooms).map((key) => {
                return (
                <div key={key}>
                    <button disabled={key === roomId}
                    title={`Join ${rooms[key].name}`}
                    onClick={() => handleJoinRoom(key)}
                    >
                        {rooms[key].name}
                    </button>
                </div>
                );
            })}
        </nav>
    )
};

export default RoomsContainer;