import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Function to format the date to ISO 8601 format (YYYY-MM-DD)
const formatDateISO8601 = (date: any) => date.format('YYYY-MM-DD');


function Calender() {
  // State to store selected dates
  const [fromDate, setFromDate] = useState(dayjs());
  const [toDate, setToDate] = useState(dayjs().add(1, 'day'));

  // Check local storage for existing values on initial load
  useEffect(() => {
    const storedFromDate = localStorage.getItem('DATE_FROM');
    const storedToDate = localStorage.getItem('DATE_TO');

    if (storedFromDate && storedToDate) {
      setFromDate(dayjs(storedFromDate));
      setToDate(dayjs(storedToDate));
    }
  }, []);

  // Function to handle "from" date selection
  const handleFromDateChange = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
    const selectedDate = dayjs(date);

    // Check if selected "from" date is after current "to" date
    if (selectedDate.isAfter(toDate)) {
      setToDate(selectedDate.add(1, 'day')); // Set "to" date to the next day
    }

    setFromDate(selectedDate);
    localStorage.setItem('DATE_FROM', formatDateISO8601(selectedDate));
  };

  // Function to handle "to" date selection
  const handleToDateChange = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
    const selectedDate = dayjs(date);

    // Check if selected "to" date is before current "from" date
    if (selectedDate.isBefore(fromDate)) {
      setFromDate(selectedDate); // Set "from" date to the selected "to" date
      localStorage.setItem('DATE_FROM', formatDateISO8601(selectedDate));
    }

    setToDate(selectedDate);
    localStorage.setItem('DATE_TO', formatDateISO8601(selectedDate));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <div style={{ margin: '0 10px', width: '150px' }}>
          <DatePicker
            label="FROM"
            format="M/D/YYYY"
            slotProps={{ field: { shouldRespectLeadingZeros: true } }}
            value={fromDate}
            onChange={handleFromDateChange}
            className="datePickerContainer"
            minDate={dayjs()} // Set minimum date to the current day
          />
        </div>
        <div style={{ margin: '0 10px', width: '150px'}}>
          <DatePicker
            label="TO"
            format="M/D/YYYY"
            slotProps={{ field: { shouldRespectLeadingZeros: true } }}
            value={toDate}
            minDate={fromDate.add(1, 'day')}
            onChange={handleToDateChange}
            className="datePickerContainer"
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender;
