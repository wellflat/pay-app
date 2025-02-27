import React from "react";
import { JSX } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs from "dayjs";

type Props = {
  handleChange: (month: string) => void;
  dateRange: { start: string, end: string };
  loading: boolean;
};

const MonthSelect = ({ handleChange, dateRange, loading }: Props): JSX.Element => {
  const generateMonthItems = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const months = [];

    let current = startDate.startOf('month');
    while (current.isBefore(endDate) || current.isSame(endDate, 'month')) {
      months.push({
        full: current.format('YYYY/MM'),
        month: current.month() + 1 // 1月が0なので+1する
      });
      current = current.add(1, 'month');
    }

    return months;
  };
  const monthItems = generateMonthItems(dateRange.start, dateRange.end);

  return (
    <Box sx={{ minWidth: 120, marginTop: 2 }}>
      <FormControl fullWidth>
          <InputLabel id="month-select-label">支払月</InputLabel>
          <Select
              labelId="month-select-label"
              id="month-select"
              label="Month"
              defaultValue={"10"}
              disabled={loading}
              onChange={
                (e: SelectChangeEvent) => handleChange(e.target.value)
            }>
              {monthItems.map((month, index) => (
                <MenuItem key={index} value={month.month}>{month.full}</MenuItem>
              ))}
          </Select>
      </FormControl>
    </Box>
  );
};

export default MonthSelect;

