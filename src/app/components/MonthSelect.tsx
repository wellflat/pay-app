import { JSX } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  handleChange: (month: string) => void;
  loading: boolean;
};

const MonthSelect = ({ handleChange, loading }: Props): JSX.Element => {

  return (
    <Box sx={{ minWidth: 120, marginTop: 2 }}>
      <FormControl fullWidth>
          <InputLabel id="month-select-label">支払月</InputLabel>
          <Select
              labelId="month-select-label"
              id="month-select"
              label="Month"
              defaultValue="10"
              disabled={loading}
              onChange={
                (e: SelectChangeEvent) => handleChange(e.target.value)
            }>
              <MenuItem value={10}>2024/10</MenuItem>
              <MenuItem value={11}>2024/11</MenuItem>
              <MenuItem value={12}>2024/12</MenuItem>
              <MenuItem value={1}>2025/01</MenuItem>
          </Select>
      </FormControl>
    </Box>
  );
};

export default MonthSelect;