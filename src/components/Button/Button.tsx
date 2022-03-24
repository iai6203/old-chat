import React, {ButtonHTMLAttributes} from 'react';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={
        'mt-4 px-2 py-1 bg-white text-black hover:cursor-default'
      }
    />
  );
};

export default Button;