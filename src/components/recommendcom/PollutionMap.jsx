import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BsFillCalendarHeartFill } from 'react-icons/bs';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './DateSelection.css';

const DateSelection = ({ onSelectDate, label, defaultDate }) => {
  const format = 'YYYY-MM-DD';
  const formattedDefaultDate = defaultDate ? new Date(defaultDate).toISOString().split('T')[0] : '';
  
  const [date, setDate] = useState(formattedDefaultDate);
  const [open, setOpen] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  const handleClickButton = () => {
    setOpen(!open);
  };

  const handleChangeCalendar = (selected) => {
    const formattedDate = selected.format(format);
    setDate(formattedDate);
    setOpen(false);

    onSelectDate(formattedDate, label);
  };

  const handleClickOut = useCallback(
    (e) => {
      if (open && inputRef?.current && calendarRef?.current) {
        const inputArea = inputRef.current;
        const calendarArea = calendarRef.current;
        const { target } = e;
        const outArea = !inputArea.contains(target) && !calendarArea.contains(target);

        if (outArea) {
          setOpen(false);
        }
      }
    },
    [open, inputRef, calendarRef]
  );

  useEffect(() => {
    if (open && inputRef?.current && calendarRef?.current) {
      document.addEventListener('click', handleClickOut);
    }
    return () => {
      document.removeEventListener('click', handleClickOut);
    };
  }, [open, inputRef, calendarRef, handleClickOut]);

  const isValidDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const limitDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);
    return current >= today && current <= limitDate;
  };

  return (
    <div ref={inputRef} className="grid grid-cols-4 text-center sm:grid-cols-2 md:grid-cols-4">
      <div className="col-span-3 mx-auto my-auto">
        <input
          type="text"
          value={date}
          placeholder="날짜선택"
          size={11}
          readOnly
          className="bg-transparent w-full"
        />
      </div>
      <div className="mx-auto my-auto">
        <button type="button" onClick={handleClickButton} style={{ display: 'inline-block' }}>
          <BsFillCalendarHeartFill className="calendar-heart-icon" />
        </button>
      </div>

      {open && (
        <div ref={calendarRef} className="calendar">
          <Datetime
            input={false}
            timeFormat={false}
            dateFormat={format}
            value={date}
            onChange={handleChangeCalendar}
            isValidDate={isValidDate}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelection;