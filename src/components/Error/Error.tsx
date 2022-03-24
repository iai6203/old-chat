import React from 'react';

interface Props {
  message: string
}

const Error = ({ message }: Props) => {
  return (
    <div className={'px-2 py-2 border-2 border-t-0 border-white'}>
      <span className={'whitespace-pre-wrap text-red-500'}>{message}</span>
    </div>
  );
};

export default Error;