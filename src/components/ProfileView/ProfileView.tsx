import React from 'react'
import Button from '../Button/Button'

interface Props {
  prevNickname: string
  nickname: string
  loading: boolean
}

const ProfileView = ({ prevNickname, nickname, loading }: Props) => {

  return (
    <div className={'px-6 pt-4'}>
      <div>
        <h4 className={'text-2xl text-white font-bold text-center'}>
          프로필 수정
        </h4>
        <p className={'mt-4 text-sm text-white text-center'}>
          상대에게 보여질 자신의 모습을 설정하세요.
        </p>

        <div className={'mt-6'}>
          <h6
            className={
              'text-sm text-white font-bold text-center underline underline-offset-4'
            }
          >
            기존 닉네임 : {prevNickname}
          </h6>
        </div>

        <div className={'mt-8 flex justify-center'}>
          <div className={'px-6 w-[300px]'}>
            <h6 className={'text-white'}>닉네임 : {nickname}</h6>
            <button
              className={
                'mt-4 px-2 py-1 w-full bg-white text-black hover:cursor-default'
              }
            >
              {loading ? '요청 중...' : '저장'}
            </button>
          </div>
        </div>
      </div>
      <div className={'mt-6 flex justify-end'}>
        <Button>목록(B)</Button>
      </div>
    </div>
  )
}

export default ProfileView
