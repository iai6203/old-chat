import React, {useEffect, useState} from 'react'
import { GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import {auth, githubProvider, googleProvider} from '../config/firebase/firebase'
import DefaultLayout from '../layouts/DefaultLayout'
import Login from '../components/Login/Login'

const regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

const LoginPage = () => {
  const [userInput, setUserInput] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<string>('이메일을 입력')
  const [info, setInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [loginLoading, setLoginLoading] = useState<boolean>(false)

  /**
   * 로그인 과정 초기화
   */
  const reset = () => {
    setEmail('')
    setPassword('')
    setPlaceholder('이메일을 입력')
    setUserInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInfo('')
    setPlaceholder('')
    setError(null)

    // 구글 로그인
    if (userInput === 'G') {
      signInWithPopup(auth, googleProvider)
        .catch(error => {
          setError('Google 로그인에 실패했습니다.')
          setUserInput('')
        })
      return
    }

    // 깃허브 로그인
    if (userInput === 'GH') {
      signInWithPopup(auth, githubProvider)
        .then(result => {

        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message

          const email = error.email
          const credential = GithubAuthProvider.credentialFromError(error)

          console.log('errorCode : ', errorCode)
          console.log('errorMessage : ', errorMessage)
          console.log('email : ', email)
          console.log('credential : ', credential)

          if (errorCode === 'auth/account-exists-with-different-credential') {
            setError('해당 이메일은 이미 인증된 계정이 존재합니다.\n다른 로그인 방법을 시도해보세요.')
          } else {
            setError('GitHub 로그인에 실패했습니다.')
          }
          setUserInput('')
        })
      return
    }

    // 이메일 입력
    if (!email) {
      // 유효성 검사
      if (!regEmail.test(userInput)) {
        setPlaceholder('이메일을 입력')
        setError('이메일 형식이 올바르지 않습니다.')
        setUserInput('')
        return
      }

      setEmail(userInput)
      setPlaceholder('비밀번호를 입력')
      setUserInput('')
      return
    }

    // 비밀번호 입력
    if (!password) {
      setPassword(userInput)
      setInfo('Y. 로그인 / N. 재입력')
      setPlaceholder('Y. 로그인 / N. 재입력')
      setUserInput('')
      return
    }

    // 재입력
    if (userInput === 'N') {
      reset()
      return
    }

    // 로그인 시도
    if (userInput === 'Y') {
      setLoginLoading(true)
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          // 로그인 실패
          setError('이메일 또는 비밀번호가 일치하지 않습니다.')
          reset()
        })
        .finally(() => {
          setLoginLoading(false)
        })
    }
  }

  useEffect(() => {
    return () => {}
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
      <Login email={email} password={password} loading={loginLoading} />
    </DefaultLayout>
  )
}

export default LoginPage
