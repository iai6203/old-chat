import React from 'react'

interface Props {
  email: string
  password: string
  loading: boolean
}

const Login = ({ email, password, loading }: Props) => {
  return (
    <div className={'pt-4'}>
      <h1 className={'text-2xl text-white font-bold text-center'}>PC 통신</h1>
      <p className={'mt-4 text-sm text-white text-center'}>
        PC 통신을 통해 상대방과의 채팅을 즐겨보세요!
        <br />
        대화를 즐기기 위해 로그인이 필요합니다.
      </p>

      {/* 로그인 폼 */}
      <div className={'mt-8 flex justify-center'}>
        <div className={'px-6 w-[300px]'}>
          <h6 className={'text-white'}>이메일 : {email}</h6>
          <h6 className={'mt-2 text-white'}>
            비밀번호 :{' '}
            {password
              .split('')
              .map(() => '*')
              .join('')}
          </h6>
          <button
            className={
              'mt-4 px-2 py-1 w-full bg-white text-black hover:cursor-default'
            }
          >
            {loading ? '요청 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
