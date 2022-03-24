import React from 'react'

interface Props {
  value: string
  setValue: React.Dispatch<string>
  placeholder?: string
  handleSubmit: (e: React.FormEvent) => void
}

const Footer = ({ value, setValue, placeholder, handleSubmit }: Props) => {
  return (
    <form className={'px-3 py-2 flex gap-4 border-2 border-t-0 border-white'} onSubmit={handleSubmit}>
      <span className={'text-white'}>{'>>'}</span>
      <input
        type="text"
        className={'w-full text-white bg-transparent outline-0'}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus
      />
    </form>
  )
}

export default Footer
