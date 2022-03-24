import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { onValue } from 'firebase/database'
import { auth, chatRoomRef } from '../config/firebase/firebase'
import { ChatRoom } from '../ts/interfaces/db.interfaces'

// layouts
import DefaultLayout from '../layouts/DefaultLayout'

// components
import ChatList from '../components/ChatList/ChatList'

export interface CustomChatRoom extends ChatRoom {
  active: boolean
}

const ChatListPage = () => {
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState<string>('')
  const [placeholder] = useState<string>('')
  const [info, setInfo] = useState<string | null>(
    '방향키를 통해 채팅방을 선택할 수 있습니다.'
  )
  const [error, setError] = useState<string | null>(null)

  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [chatRoomList, setChatRoomList] = useState<CustomChatRoom[]>([])
  const [signOutLoading, setSignOutLoading] = useState<boolean>(false)

  /**
   * 로그 아웃
   */
  const handleSignOut = () => {
    setSignOutLoading(true)
    signOut(auth).catch(() => {
      setError('로그 아웃에 실패했습니다.')
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInfo('')
    setError('')

    if (userInput === 'C') {
      navigate('/form')
    }
    // 채팅 접속
    if (userInput === 'E') {
      const selectedChatRoom = chatRoomList[activeIdx]
      if (!selectedChatRoom) {
        setError('채팅방이 선택되지 않았습니다.')
        setUserInput('')
        return
      }

      if (selectedChatRoom.users && selectedChatRoom.users.length >= 5) {
        setInfo('해당 채팅방은 인원이 최대입니다.')
        setUserInput('')
        return
      }

      navigate(`/chat/${selectedChatRoom.uid}`)
    }
    // 프로필 수정
    if (userInput === 'P') {
      navigate('/profile')
    }
    // 로그 아웃
    if (userInput === 'L') {
      setUserInput('')
      handleSignOut()
      return
    }
  }

  useEffect(() => {
    const unsubscribe = onValue(chatRoomRef, (snapshot) => {
      if (snapshot.exists()) {
        const _chatRoomList: CustomChatRoom[] = []
        snapshot.forEach((childSnapshot) => {
          const _chatRoom = childSnapshot.val() as CustomChatRoom
          _chatRoom.active = false
          _chatRoomList.push(_chatRoom)
        })
        setChatRoomList(_chatRoomList)
      } else {
        setChatRoomList([])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    // 채팅방 목록 선택 핸들러
    const keydownHandler = (e: KeyboardEvent) => {
      let curIdx = activeIdx

      if (e.key === 'ArrowUp') {
        curIdx--
        if (curIdx < 0) curIdx = 0
        setActiveIdx(curIdx)
      } else if (e.key === 'ArrowDown') {
        curIdx++
        if (curIdx > chatRoomList.length - 1) curIdx = chatRoomList.length - 1
        setActiveIdx(curIdx)
      }
    }
    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [activeIdx, chatRoomList])

  return (
    <DefaultLayout
      userInput={userInput}
      setUserInput={setUserInput}
      placeholder={placeholder}
      handleSubmit={handleSubmit}
      info={info}
      error={error}
    >
      <ChatList
        activeIdx={activeIdx}
        chatRoomList={chatRoomList}
        signOutLoading={signOutLoading}
      />
    </DefaultLayout>
  )
}

export default ChatListPage
