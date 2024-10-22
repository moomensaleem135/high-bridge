'use-client';
import React, { FormEvent } from 'react';
import hide from '../../assets/pngs/hide.png';
import { useState } from 'react';

const Form: React.FC = () => {
  const [createPassword, setCreatePassword] = useState<string>('');
  const [reEnter, setreEnter] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<string>('password');

  const handleHide = (e: React.MouseEvent<HTMLElement>) => {
    setHidePassword(hidePassword === 'password' ? 'text' : 'password');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCreatePassword('');
    setreEnter('');
  };

  return (
    <div className="bg-[#F8F8F8] w-[34vw] h-[45vh] flex items-center justify-center rounded-3xl border-[1px] border-solid border-[#666666] border-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center h-[93%] gap-[1.5rem] w-[85%]"
      >
        <div className="flex justify-between items-center flex-col h-[10vh]">
          <h3 className="text-3xl font-bold">Set a Password</h3>
          <span className="text-center">
            Your previous password has been rested. Please set a new <br />
            password for your account.
          </span>
        </div>

        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <label>Create Password:</label>
          <input
            type={hidePassword}
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
        </div>
        <div className="flex flex-col justify-between items-start w-[95%] h-[8vh]">
          <div
            className="flex justify-between w-[100%] cursor-pointer"
            onClick={handleHide}
          >
            <label>Re-enter Password:</label>
            <span className="flex justify-between items-center gap-1">
              Hide
              <img src={hide.src} />
            </span>
          </div>

          <input
            type={hidePassword}
            value={reEnter}
            onChange={(e) => setreEnter(e.target.value)}
            className="bg-transparent w-[100%] h-[5vh] border-[1px] border-solid border-[#666666] border-opacity-30 rounded-md p-3"
          />
        </div>

        <div className="w-[95%] bg-black h-[5vh] rounded-md ">
          <button
            type="submit"
            className="text-white text-center w-[100%] h-full"
          >
            Set Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
