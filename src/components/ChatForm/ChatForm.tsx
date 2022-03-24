import React from 'react';

// components
import Button from "../Button/Button";

interface Props {
  title: string
  loading: boolean
}

const ChatForm = ({ title, loading }: Props) => {
  return (
    <div className={'pt-4 px-6'}>
      <div>
        <h4 className={'text-2xl text-white font-bold text-center'}>채팅방 생성</h4>
        <p className={'mt-4 text-sm text-white text-center'}>
          새로운 사람과의 대화를 위해 채팅방을 만들어보세요.
          <br />
          채팅방을 생성하기 위해서는 제목을 정해야 합니다.
        </p>

        <div className={'mt-8 flex justify-center'}>
          <div className={'px-6 w-[300px]'}>
            <h6 className={'text-white'}>채팅방 제목 : {title}</h6>
            <button
              className={
                'mt-4 px-2 py-1 w-full bg-white text-black hover:cursor-default'
              }
            >
              {loading ? '요청 중...' : '생성'}
            </button>
          </div>
        </div>
      </div>
      <div className={'mt-6 flex justify-end'}>
        <Button>목록(B)</Button>
      </div>
    </div>
  );
};

export default ChatForm;