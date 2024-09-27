import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

interface Prop {
  value: string;
  onChange: (value: string) => void;
}

const OtpField: React.FC<Prop> = ({ value, onChange }) => {
  return (
    <OtpInput
      containerStyle={`flex justify-evenly items-center gap-1 h-5/6 w-full`}
      inputStyle={`w-[13%] flex justify-evenly items-center text-center h-full border-solid border-[2px] border-verifyField rounded-md text-lg bg-transparent`}
      value={value}
      skipDefaultStyles
      onChange={onChange}
      numInputs={5}
      inputType="tel"
      renderInput={(props) => <input {...props} />}
    />
  );
};

export default OtpField;
