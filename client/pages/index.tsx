import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSockets } from '../context/socket.context'

import RoomsContainer from '../containers/Rooms'
import MessagesContaier from '../containers/Messages'

export default function Home() {
  const {socket, username, setUsername} = useSockets();

  const usernameRef = useRef(null)

  const handleSetUsername = () => {
    const value = usernameRef.current.value
    if(!value){
      return
    }
    setUsername(value);

    localStorage.setItem("username", value)
  }

  return (
    <div>

      {!username && 
        <div>
          <input placeholder="Username" ref={usernameRef} />
          <button onClick={handleSetUsername}>START</button>
        </div>}

      <RoomsContainer />
      <MessagesContaier />
    </div>
  )
}
