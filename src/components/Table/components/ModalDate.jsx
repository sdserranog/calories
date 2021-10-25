import { useState } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  borderRadius: 6,
  boxShadow: 16,
  p: 4,
}

const FoodModal = ({ open, handleClose, selectDates, changeDates }) => {
  const [value, setValue] = useState([
    selectDates?.start || new Date(),
    selectDates?.end || new Date(),
  ])

  const handleFilter = () => {
    const [start, end] = value
    changeDates({ start: start.toISOString(), end: end.toISOString() })
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 3 }}
        >
          Select Dates
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />

          <Button
            sx={{ width: '100%', mt: 3 }}
            variant="contained"
            onClick={handleFilter}
          >
            Filter
          </Button>
        </LocalizationProvider>
      </Box>
    </Modal>
  )
}

export default FoodModal
