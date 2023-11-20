import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

function Calender() {
  const currentDate = dayjs();
  const nextDay = currentDate.add(1, 'day');

  // State to store selected dates
  const [selectedDates, setSelectedDates] = useState({
    from: currentDate,
    to: nextDay,
  });

  // Function to handle date selection
  const handleDateChange = (date: any, type: any) => {
    setSelectedDates((prevDates) => ({
      ...prevDates,
      [type]: date,
    }));

    localStorage.setItem('DATE_VALUE', JSON.stringify(selectedDates));
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
