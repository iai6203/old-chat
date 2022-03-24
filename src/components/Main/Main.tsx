import React from 'react';

interface Props {
  children: JSX.Element
}

const Main = ({ children }: Props) => {
  return (
    <div className={'flex-1 border-2 border-white overflow-y-auto'}>
      {children}
    </div>
  );
};

export default Main;