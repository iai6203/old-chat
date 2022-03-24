import React from 'react'

// components
import Main from '../components/Main/Main'
import Info from "../components/Info/Info";
import Error from '../components/Error/Error'
import Footer from '../components/Footer/Footer'

interface Props {
  userInput: string
  setUserInput: React.Dispatch<string>
  placeholder?: string
  handleSubmit: (e: React.FormEvent) => void
  info: string | null
  error: string | null
  children: JSX.Element
}

const DefaultLayout = ({
  userInput,
  setUserInput,
  placeholder,
  handleSubmit,
  info,
  error,
  children,
}: Props) => {
  return (
    <div
      className={'w-screen h-screen overflow-hidden flex flex-col bg-[#000084]'}
    >
      <Main>{children}</Main>
      {info && <Info message={info} />}
      {error && <Error message={error} />}
      <Footer
        value={userInput}
        setValue={setUserInput}
        placeholder={placeholder}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default DefaultLayout
