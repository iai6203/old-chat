import React from 'react'

// components
import Button from '../Button/Button'
import { CustomChatRoom } from '../../pages/ChatListPage'

interface Props {
  activeIdx: number
  chatRoomList: CustomChatRoom[]
  signOutLoading: boolean
}

const ChatList = ({ activeIdx, chatRoomList, signOutLoading }: Props) => {
  return (
    <div className={'pt-4 px-6'}>
      <table className={'w-full'}>
        <thead className={'border-b-2 border-white'}>
          <tr className={'text-white'}>
            <th className={'py-2 w-[80%]'}>제목</th>
            <th className={'w-[20%]'}>참여 인원</th>
          </tr>
        </thead>
        <tbody className={'text-white'}>
          {chatRoomList &&
            chatRoomList.map((chatRoom, idx) => (
              <tr key={chatRoom.uid} className={`${idx === activeIdx && 'bg-white text-black'}`}>
                <td className={'py-2'}>{chatRoom.title}</td>
                <td className={'text-center'}>
                  {chatRoom.users ? chatRoom.users.length : 0}/5
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={'flex gap-2 justify-end'}>
        <Button>채팅 생성(C)</Button>
        <Button>채팅 접속(E)</Button>
        <Button>프로필 수정(P)</Button>
        <Button>{signOutLoading ? '요청 중...' : '로그 아웃(L)'}</Button>
      </div>
    </div>
  )
}

export default ChatList
