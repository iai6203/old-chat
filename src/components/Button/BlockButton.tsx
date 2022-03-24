import React, { ButtonHTMLAttributes } from 'react'

const BlockButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        'mt-4 px-2 py-1 w-full bg-white text-black hover:cursor-default'
      }
    />
  )
}

export default BlockButton
