'use-client';
import React, { FormEvent } from 'react';
import hide from '../../assets/pngs/hide.png';
import { useState } from 'react';
import Link from 'next/link';
import { signinUrl } from '@/configs/constants';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [checkedLocal, setCheckedLocal] = useState<boolean>(false);
  const [checkedServer, setCheckedServer] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<string>('password');

  const handleHide = (e: React.MouseEvent<HTMLElement>) => {
    setHidePassword(hidePassword === 'password' ? 'text' : 'password');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('in submit of sign up form');
    console.log(name);
    console.log(checkedLocal);
    console.log(checkedServer);

    if (password !== confirm) {
      throw new Error('Password dont match');
    }

    setName('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setCheckedLocal(false);
    setCheckedServer(false);
  };

  return (
    <div className="bg-[#F8F8F8] w-[34vw] h-[75vh] flex items-center justify-center rounded-3xl border-[1px] border-solid border-[#666666] border-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center h-[93%] gap-[1.5rem] w-[85%]"
      >
        <div className="flex justify-evenly items-center flex-col h-[8.5vh]">
          <h3 className="text-3xl font-bold">Create an account</h3>
          <span>
            Already have an account?{' '}
            <u>
              <Link href={signinUrl}>Log in</Link>
            </u>{' '}
          </span>
        </div>

        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <label>Username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
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
        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <div
            className="flex justify-between w-[100%] cursor-pointer"
            onClick={handleHide}
          >
            <label>Confirm password:</label>
            <span className="flex justify-between items-center gap-1">
              Hide
              <img src={hide.src} />
            </span>
          </div>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type={hidePassword}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
        </div>
        <div className="flex flex-col justify-between items-start w-[95%] h-[6vh]">
          <div className="flex justify-start items-center gap-2 w-[95%]">
            <label
              className="flex items-start cursor-pointer relative"
              htmlFor="check-with-local"
            >
              <input
                type="checkbox"
                checked={checkedLocal}
                onChange={(e) => setCheckedLocal(!checkedLocal)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="check-with-local"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label htmlFor="local">
              Local (We will save your data locally on your system in a file).
            </label>
          </div>
          <div className="flex justify-start items-center gap-2 w-[95%]">
            <label
              className="flex items-start cursor-pointer relative"
              htmlFor="check-with-server"
            >
              <input
                type="checkbox"
                checked={checkedServer}
                onChange={(e) => setCheckedServer(!checkedServer)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="check-with-server"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label htmlFor="local">
              Server (We will encrypt and save your data on our servers).
            </label>
          </div>
        </div>
        <div className="w-[95%] bg-black h-[5vh] rounded-md ">
          <button
            type="submit"
            className="text-white text-center w-[100%] h-full"
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
