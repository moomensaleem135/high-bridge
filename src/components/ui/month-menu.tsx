import React from 'react';

interface Prop {
  setMonth: (value: string) => void;
  calendar: string;
}

const MonthMenu: React.FC<Prop> = ({ setMonth, calendar }) => {
  return (
    <>
      {calendar === 'lunar' ? (
        <div className="absolute bg-white w-[27.4%] top-[32.8rem] rounded-md h-[40vh] overflow-auto">
          <ul className="h-full flex flex-col justify-start items-center">
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-t-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Muharram')}
            >
              <input type="checkbox" />
              Muharram
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Safar')}
            >
              <input type="checkbox" />
              Safar
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`Rabi' al-Awwal`)}
            >
              <input type="checkbox" />
              Rabi' al-Awwal
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`Rabi' al-Thani`)}
            >
              <input type="checkbox" />
              Rabi' al-Thani
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Jumada al-Awwal')}
            >
              <input type="checkbox" />
              Jumada al-Awwal
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Jumada al-Thani')}
            >
              <input type="checkbox" />
              Jumada al-Thani
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Rajab')}
            >
              <input type="checkbox" />
              Rajab
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`Sha'ban`)}
            >
              <input type="checkbox" />
              Sha'ban
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Ramadan')}
            >
              <input type="checkbox" />
              Ramadan
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('Shawwal')}
            >
              <input type="checkbox" />
              Shawwal
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`Dhu al-Qa'dah`)}
            >
              <input type="checkbox" />
              Dhu al-Qa'dah
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-b-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(` Dhu al-Hijjah`)}
            >
              <input type="checkbox" />
              Dhu al-Hijjah
            </li>
          </ul>
        </div>
      ) : (
        <div className="absolute bg-white w-[27.4%] top-[32.8rem] rounded-md h-[40vh] overflow-auto">
          <ul className="h-full flex flex-col justify-start items-center">
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-t-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('January')}
            >
              <input type="checkbox" />
              January
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('February')}
            >
              <input type="checkbox" />
              February
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`March`)}
            >
              <input type="checkbox" />
              March
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`April`)}
            >
              <input type="checkbox" />
              April
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('May')}
            >
              <input type="checkbox" />
              May
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('June')}
            >
              <input type="checkbox" />
              June
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('July')}
            >
              <input type="checkbox" />
              July
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`August`)}
            >
              <input type="checkbox" />
              August
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('September')}
            >
              <input type="checkbox" />
              September
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth('October')}
            >
              <input type="checkbox" />
              October
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`November`)}
            >
              <input type="checkbox" />
              November
            </li>
            <li
              className="w-full h-[10%] flex justify-start items-center gap-2 rounded-b-md p-2 hover:bg-[#DFE3E6]"
              onClick={(e) => setMonth(`December`)}
            >
              <input type="checkbox" />
              December
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MonthMenu;
