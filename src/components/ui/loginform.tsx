'use-client';
import { useState } from 'react';
import React, { FormEvent } from 'react';
import hide from '../../assets/pngs/hide.png';
import Link from 'next/link';
import { forgetUrl, signupUrl } from '@/configs/constants';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<string>('password');

  const handleHide = (e: React.MouseEvent<HTMLElement>) => {
    setHidePassword(hidePassword === 'password' ? 'text' : 'password');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('in submit of login form ');
    console.log(email);
    console.log(password);

    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-[#F8F8F8] w-[34vw] h-[45vh] flex items-center justify-center rounded-3xl border-[1px] border-solid border-[#666666] border-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center h-[93%] gap-[1.5rem] w-[85%]"
      >
        <div className="flex justify-evenly items-center flex-col h-[8.5vh]">
          <h3 className="text-3xl font-bold">Login</h3>
          <span>
            Don’t have an account?{' '}
            <u>
              {' '}
              <Link href={signupUrl}>Sign up </Link>
            </u>
          </span>
        </div>

        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <label>Email address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
        </div>
        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <div
            className="flex justify-between w-[100%] cursor-pointer"
            onClick={handleHide}
          >
            <label>Password:</label>
            <span className="flex justify-between items-center gap-1">
              Hide
              <img src={hide.src} />
            </span>
          </div>

          <input
            type={hidePassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
        </div>
        <div className="mt-2 w-full items-end ml-4">
          <Link href={forgetUrl} className="">
            <u>Forgot Password</u>
          </Link>
        </div>

        <div className="w-[95%] bg-black h-[5vh] rounded-md ">
          <button
            type="submit"
            className="text-white text-center w-[100%] h-full"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
