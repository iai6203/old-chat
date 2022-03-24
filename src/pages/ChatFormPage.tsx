import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { set, child } from 'firebase/database'
import { chatRoomRef } from '../config/firebase/firebase'
import {v4 as uuid} from 'uuid'

// layouts
import DefaultLayout from '../layouts/DefaultLayout'

// components
import ChatForm from '../components/ChatForm/ChatForm'
import {ChatRoom} from "../ts/interfaces/db.interfaces";

const ChatFormPage = () => {
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<string>('채팅방 제목을 입력')
  const [info, setInfo] = useState<string | null>('채팅방 제목을 입력해주세요.')
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState<string>('')
  const [createLoading, setCreateLoading] = useState<boolean>(false)

  const reset = () => {
    setTitle('')
    setPlaceholder('채팅방 제목을 입력')
    setInfo('채팅방 제목을 입력해주세요.')
    setUserInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (userInput === 'B') {
      navigate('../')
    }

    // 채팅방 제목 입력
    if (!title) {
      setTitle(userInput)
      setPlaceholder('Y. 생성 / N. 재입력')
      setInfo('Y. 생성 / N. 재입력')
      setUserInput('')
      return
    }

    // 재입력
    if (userInput === 'N') {
      reset()
      return
    }

    // 채팅방 생성 시도
    if (userInput === 'Y') {
      setCreateLoading(true)
      setError(null)
      const uid = uuid()
      const chatRoom: ChatRoom = {
        uid,
        title
      }
      set(child(chatRoomRef, uid), chatRoom)
        .then(() => {
          navigate('../')
        })
        .catch(() => {
          setError('채팅방 생성에 실패했습니다.')
          reset()
          setCreateLoading(false)
        })
    }
  }

  return (
    <DefaultLayout
      userInput={userInput}
      setUserInput={setUserInput}
      placeholder={placeholder}
      handleSubmit={handleSubmit}
      info={info}
      error={error}
    >
      <ChatForm title={title} loading={createLoading} />
    </DefaultLayout>
  )
}

export default ChatFormPage
