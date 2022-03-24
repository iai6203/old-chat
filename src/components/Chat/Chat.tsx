import React from 'react'
import { Message } from '../../ts/interfaces/db.interfaces'

// components
import Button from '../Button/Button'

interface Props {
  chatRoomTitle: string
  users: string[]
  messages: Message[]
}

const Chat = ({ chatRoomTitle, users, messages }: Props) => {
  return (
    <div className={'px-6 py-4 h-full flex flex-col'}>
      <h6 className={'text-2xl text-white font-bold'}>
        채팅방 제목 : {chatRoomTitle}
      </h6>

      {/* 접속 유저 */}
      <div className={'mt-4 p-2 border-2 border-white'}>
        <h6 className={'text-white'}>[ 현재 접속 유저 ]</h6>
        <ul>
          {users.map((user) => (
            <li key={user} className={'text-white'}>
              - {user}
            </li>
          ))}
        </ul>
      </div>

      {/* 대화 */}
      <ul className={'mt-4 p-2 flex-1 border-2 border-white flex-1 overflow-y-auto'}>
        {messages.map((message, idx) => (
          <li key={idx} className={'text-white leading-10'}>
            {message.email} : {message.text}
          </li>
        ))}
      </ul>

      {/* 유틸 */}
      <div className={'flex justify-end'}>
        <Button>채팅 종료(C)</Button>
      </div>
    </div>
  )
}

export default Chat
