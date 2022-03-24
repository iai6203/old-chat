import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'
import { get, push, child, onValue, onChildAdded, set } from 'firebase/database'
import { chatRoomRef } from '../config/firebase/firebase'
import { useParams } from 'react-router-dom'

// layouts
import DefaultLayout from '../layouts/DefaultLayout'

// components
import Chat from '../components/Chat/Chat'
import { ChatRoom, Message } from '../ts/interfaces/db.interfaces'

interface Props {
  user: User
}

const ChatPage = ({ user }: Props) => {
  const navigate = useNavigate()
  const { uid } = useParams()

  const [userInput, setUserInput] = useState<string>('')
  const [placeholder] = useState<string>('')
  const [info] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [enterChatLoading, setEnterChatLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [users, setUsers] = useState<string[]>([])
  const [messages, setMessages] = useState<Set<Message>>(new Set())

  const enterChat = () => {
    setEnterChatLoading(true)
    get(child(chatRoomRef, `${uid}/users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const _users = snapshot.val() as string[]
          if (user.email && !_users.includes(user.email)) {
            set(
              child(chatRoomRef, `${uid}/users`),
              [..._users].concat(user.email)
            )
            postSystemMessage(`${user.email}님이 입장하셨습니다.`)
          }
        } else {
          set(child(chatRoomRef, `${uid}/users`), [user.email])
        }
      })
      .finally(() => {
        setEnterChatLoading(false)
      })
  }

  const postMessage = (msg: string) => {
    console.log('postMessage')
    if (user.email) {
      const message: Message = {
        email: user.email,
        text: msg,
      }

      push(child(chatRoomRef, `${uid}/messages`), message)
    }
  }

  const postSystemMessage = (msg: string) => {
    console.log('postMessage')
    if (user.email) {
      const message: Message = {
        email: 'SYSTEM',
        text: msg,
      }

      push(child(chatRoomRef, `${uid}/messages`), message)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 채팅 종료
    if (userInput === 'C') {
      // 채팅방 나가기
      set(
        child(chatRoomRef, `${uid}/users`),
        [...users].filter((_email) => _email !== user.email)
      )
        .then(() => {
          postSystemMessage(`${user.email}님이 퇴장하셨습니다.`)
          navigate('../')
        })
        .catch(() => {
          setError('채팅방을 나가는 데 실패했습니다.')
        })
      return
    }

    // 채팅 전송
    if (userInput) {
      postMessage(userInput)
      setUserInput('')
    }
  }

  useEffect(() => {
    if (!uid) {
      setError('채팅 정보를 불러오는 데 실패했습니다.')
      return
    }

    // 채팅 접속
    enterChat()

    const unsubscribe = onValue(child(chatRoomRef, uid), (snapshot) => {
      if (snapshot.exists()) {
        const chatRoom = snapshot.val() as ChatRoom

        setTitle(chatRoom.title)
        setUsers(chatRoom.users ? chatRoom.users : [])
      } else {
        setError('채팅방 정보를 불러올 수 없습니다.')
      }
    })
    const messagesUnsubscribe = onChildAdded(
      child(chatRoomRef, `${uid}/messages`),
      (snapshot) => {
        if (snapshot.exists()) {
          console.log('message added!')
          const _message = snapshot.val() as Message
          setMessages((prev) => prev.add(_message))
        }
      }
    )

    return () => {
      unsubscribe()
      messagesUnsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DefaultLayout
      userInput={userInput}
      setUserInput={setUserInput}
      placeholder={placeholder}
      handleSubmit={handleSubmit}
      info={info}
      error={error}
    >
      {enterChatLoading ? (
        <div className={'w-full h-full flex justify-center items-center'}>
          <span className={'text-lg font-bold text-white'}>
            채팅방에 입장하는 중...
          </span>
        </div>
      ) : (
        <Chat
          chatRoomTitle={title}
          users={users}
          messages={Array.from(messages)}
        />
      )}
    </DefaultLayout>
  )
}

export default ChatPage
