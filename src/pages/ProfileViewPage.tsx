import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'firebase/auth'
import { set, child, get } from 'firebase/database'
import { profileRef } from '../config/firebase/firebase'
import { UserInfo } from '../ts/interfaces/db.interfaces'

// layouts
import DefaultLayout from '../layouts/DefaultLayout'

// components
import ProfileView from '../components/ProfileView/ProfileView'

interface Props {
  user: User
}

const ProfileViewPage = ({ user }: Props) => {
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<string>('닉네임을 입력')
  const [info, setInfo] = useState<string | null>('닉네임을 입력')
  const [error, setError] = useState<string | null>(null)

  const [prevNickname, setPrevNickname] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)

  const reset = () => {
    setNickname('')
    setInfo('닉네임을 입력')
    setPlaceholder('닉네임을 입력')
    setUserInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 목록
    if (userInput === 'B') {
      navigate('../')
      return
    }

    // 닉네임 입력
    if (!nickname) {
      setNickname(userInput)
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

    // 프로필 수정 시도
    if (userInput === 'Y') {
      setUpdateLoading(true)
      if (user.email) {
        const userInfo: UserInfo = { nickname }
        set(child(profileRef, user.uid), userInfo)
          .then(() => {
            navigate('../')
          })
          .catch(() => {
            setError('프로필 수정에 실패했습니다.')
            reset()
            setUpdateLoading(false)
          })
      }
    }
  }

  useEffect(() => {
    // 닉네임 정보 설정
    get(child(profileRef, user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const _prevNickname = snapshot.val() as UserInfo
        setPrevNickname(_prevNickname.nickname)
      } else {
        user.email && setPrevNickname(user.email)
      }
    })
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
      <ProfileView
        prevNickname={prevNickname}
        nickname={nickname}
        loading={updateLoading}
      />
    </DefaultLayout>
  )
}

export default ProfileViewPage
