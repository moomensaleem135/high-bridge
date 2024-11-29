import React from 'react';

interface Prop {
  setCalednar: (value: string) => void;
  showCalendarDropdown: boolean;
  setCalendarShowDropdown: (value: boolean) => void;
}

const CalendarMenu: React.FC<Prop> = ({
  setCalednar,
  showCalendarDropdown,
  setCalendarShowDropdown,
}) => {
  const handleChoice = (e: any) => {
    setCalednar(e.target.innerText);
    setCalendarShowDropdown(false);
  };
  return (
    <div className="absolute bg-white w-[27.4%] top-[27rem] rounded-md h-[9vh] hover:">
      <ul className="h-full flex flex-col justify-center items-center">
        <li
          className="w-full h-full flex justify-start items-center rounded-t-md p-2 hover:bg-DropdownHover"
          onClick={handleChoice}
        >
          lunar
        </li>
        <li
          className="w-full h-full flex justify-start items-center rounded-b-md p-2 hover:bg-DropdownHover"
          onClick={handleChoice}
        >
          solar
        </li>
      </ul>
    </div>
  );
};

export default CalendarMenu;
