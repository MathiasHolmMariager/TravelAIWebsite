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
    const storedFromDate = localStorage.getItem('FROM_DATE');
    const storedToDate = localStorage.getItem('TO_DATE');

    if (storedFromDate && storedToDate) {
      setFromDate(dayjs(storedFromDate));
      setToDate(dayjs(storedToDate));
    }
  }, []);

  // Function to handle "from" date selection
  const handleFromDateChange = (date: any) => {
    setFromDate(date);
    localStorage.setItem('FROM_DATE', formatDateISO8601(date));
  };

  // Function to handle "to" date selection
  const handleToDateChange = (date: any) => {
    setToDate(date);
    localStorage.setItem('TO_DATE', formatDateISO8601(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="FROM"
          format="M/D/YYYY"
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <DatePicker
          label="TO"
          format="M/D/YYYY"
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
          value={toDate}
          onChange={handleToDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender;