import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './config/firebase/firebase'

// pages
import LoginPage from './pages/LoginPage'
import ChatListPage from './pages/ChatListPage'
import ChatFormPage from './pages/ChatFormPage'
import ChatPage from "./pages/ChatPage";

const App = () => {
  const [init, setInit] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setInit(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setInit(false)
    })
  }, [])

  if (init) {
    return (
      <div className={'w-screen h-screen flex justify-center items-center'}>
        <h4 className={'text-2xl font-bold'}>애플리케이션을 구성하는 중...</h4>
      </div>
    )
  }

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path={'/'} element={<ChatListPage />} />
          <Route path={'/chat/:uid'} element={<ChatPage user={user} />} />
          <Route path={'/form'} element={<ChatFormPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={'/'} element={<LoginPage />} />
        </Routes>
      )}
    </Router>
  )
}

export default App
