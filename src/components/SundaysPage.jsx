import React, { useState, useEffect } from "react";

import { format, differenceInCalendarDays, isSunday, addDays } from "date-fns";

 

const SundaysPage = () => {

  const currentYear = new Date().getFullYear();

  const maxYear = currentYear + 2;

 

  const minDate = new Date(currentYear, 0, 1);

  const maxDate = new Date(maxYear, 11, 31);

 

  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  const [sundayDates, setSundayDates] = useState([]);

 

  const calculateSundays = (start, end) => {

    if (start && end) {

      const daysBetween = differenceInCalendarDays(end, start);

      const sundays = [];

 

      for (let i = 0; i <= daysBetween; i++) {

        const currentDate = addDays(start, i);

 

        if (isSunday(currentDate) && currentDate.getDate() < 28) {

          sundays.push(currentDate);

        }

      }

 

      setSundayDates(sundays);

    } else {

      setSundayDates([]);

    }

  };

 

  useEffect(() => {

    calculateSundays(startDate, endDate);

  }, [startDate, endDate]);

 

  const isValidDateRange =

    startDate &&

    endDate &&

    startDate < endDate &&

    startDate >= minDate &&

    endDate <= maxDate;

 

  const handleStartDateChange = (e) => {

    const selectedDate = new Date(e.target.value);

    if (selectedDate >= minDate && selectedDate <= maxDate) {

      setStartDate(selectedDate);

    }

  };

 

  const handleEndDateChange = (e) => {

    const selectedDate = new Date(e.target.value);

    if (selectedDate >= minDate && selectedDate <= maxDate) {

      setEndDate(selectedDate);

    }

  };

 

  return (

    <div>

      <h1>Sundays Counter</h1>

      <div>

        <label>Start Date:</label>

        <input

          type="date"

          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}

          onChange={handleStartDateChange}

          min={format(new Date(), "yyyy-MM-dd")}

          max={format(maxDate, "yyyy-MM-dd")}

        />

      </div>

      <div>

        <label>End Date:</label>

        <input

          type="date"

          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}

          onChange={handleEndDateChange}

          min={

            startDate

              ? format(startDate, "yyyy-MM-dd")

              : format(new Date(), "yyyy-MM-dd")

          }

          max={format(maxDate, "yyyy-MM-dd")}

        />

      </div>

      <div>

        {isValidDateRange ? (

          <>
            <p>Please select valid dates within the next two years.</p>
            <p>
              Number of Sundays between the selected dates: {sundayDates.length}
            </p>

            {sundayDates.length > 0 && (

              <div>

                <p>Sunday Dates:</p>

                <ul>

                  {sundayDates.map((date) => (

                    <li key={date.toISOString()}>

                      {format(date, "yyyy-MM-dd")}

                    </li>

                  ))}

                </ul>

              </div>

            )}

          </>

        ) : (

          <p>Please select valid dates within the next two years.</p>

        )}

      </div>

    </div>

  );

};

 

export default SundaysPage;