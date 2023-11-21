import dayjs from "dayjs";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Calender() {
  // Check local storage for existing values
  const storedDatesString = localStorage.getItem('DATE_VALUE');
  const storedDates = storedDatesString ? JSON.parse(storedDatesString) : null;
  const defaultFrom = dayjs();
  const defaultTo = defaultFrom.add(1, 'day');

  // State to store selected dates
  const [selectedDates, setSelectedDates] = useState({
    from: storedDates ? dayjs(storedDates.from) : defaultFrom,
    to: storedDates ? dayjs(storedDates.to) : defaultTo,
  });

  // Function to handle date selection
  const handleDateChange = (date: any, type: any) => {
    setSelectedDates((prevDates) => {
      const updatedDates = {
        ...prevDates,
        [type]: date,
      };

      localStorage.setItem('DATE_VALUE', JSON.stringify(updatedDates));

      return updatedDates;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="FROM"
          format="M/D/YYYY"
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
          value={selectedDates.from}
          onChange={(date) => handleDateChange(date, 'from')}
        />
        <DatePicker
          label="TO"
          format="M/D/YYYY"
          slotProps={{ field: { shouldRespectLeadingZeros: true } }}
          value={selectedDates.to}
          onChange={(date) => handleDateChange(date, 'to')}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender;
