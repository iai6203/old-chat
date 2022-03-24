import React from 'react';

interface Props {
  message: string
}

const Info = ({ message }: Props) => {
  return (
    <div className={'px-2 py-2 border-2 border-t-0 border-white'}>
      <span className={'whitespace-pre-wrap text-white'}>{message}</span>
    </div>
  );
};

export default Info;