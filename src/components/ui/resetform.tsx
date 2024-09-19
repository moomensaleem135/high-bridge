'use-client';
import React, { FormEvent } from 'react';
import backArrow from '../../assets/pngs/backArrow.png';
import { useState } from 'react';

const Form: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('in submit of provide email for reset password');
    console.log(e.target);

    setEmail('');
  };

  return (
    <div className="bg-[#F8F8F8] w-[34vw] h-[40vh] flex items-center justify-center rounded-3xl border-[1px] border-solid border-[#666666] border-opacity-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start items-center h-[93%] gap-[1.5rem] w-[85%]"
      >
        <div className="flex justify-evenly items-center flex-col h-[8.5vh]">
          <h3 className="text-3xl font-bold">Forgot your password?</h3>
          <span className="text-center">
            Don’t worry, happens to all of us. Enter your email below to <br />
            recover your password
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

        <div className="w-[95%] bg-black h-[5vh] rounded-md ">
          <button
            type="submit"
            className="text-white text-center w-[100%] h-full"
          >
            Continue
          </button>
        </div>
        <span
          className="w-[95%] flex justify-start gap-2 items-center"
          onClick={(e) => {}}
        >
          <img src={backArrow.src} />
          Back to login
        </span>
      </form>
    </div>
  );
};

export default Form;
