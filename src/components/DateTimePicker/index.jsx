import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

export default function BasicDateTimePicker({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField size="small" sx={{ width: '100%' }} id="date" {...props} />
        )}
        label="Date"
        value={date}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}
