import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import DateTimePicker from '@components/DateTimePicker'
import useAuth from '@hooks/useAuth'

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

const FoodModal = ({ open, data, handleClose, createFood, editFood }) => {
  const { user } = useAuth()

  const [name, setName] = useState()
  const [calories, setCalories] = useState()
  const [price, setPrice] = useState()
  const [date, setDate] = useState()

  useEffect(() => {
    if (data) {
      setName(data.name)
      setCalories(data.calories)
      setPrice(data.price)
      setDate(data.created_at)
    } else if (open) {
      setName()
      setCalories()
      setPrice()
      setDate(new Date())
    }
  }, [open, data])

  const handleName = (e) => {
    const { value } = e.target
    setName(value)
  }
  const handleCalories = (e) => {
    const { value } = e.target
    setCalories(value)
  }
  const handlePrice = (e) => {
    const { value } = e.target
    setPrice(value)
  }
  const handleDate = (date) => {
    setDate(date)
  }

  const handleCreate = () => {
    const user_id = user.id
    const data = { name, calories, price, date, user_id }
    createFood(data)
  }
  const handleEdit = () => {
    const newData = { name, calories, price, created_at: date }
    editFood(data.id, newData)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Food Entries
        </Typography>
        <TextField
          sx={{ width: '100%', mt: 2 }}
          id="product-name"
          label="Product Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={handleName}
        />
        <TextField
          sx={{ width: '100%', mt: 2 }}
          id="calories"
          label="Calories"
          variant="outlined"
          size="small"
          type="number"
          value={calories}
          onChange={handleCalories}
        />
        <TextField
          sx={{ width: '100%', mt: 2 }}
          id="price"
          label="Price"
          variant="outlined"
          size="small"
          type="number"
          value={price}
          onChange={handlePrice}
        />
        <Box sx={{ width: '100%', mt: 3 }}>
          <DateTimePicker date={date} onChange={handleDate} />
        </Box>
        <Button
          sx={{ width: '100%', mt: 3 }}
          variant="contained"
          onClick={data ? handleEdit : handleCreate}
        >
          {data ? 'Edit' : 'Create'}
        </Button>
      </Box>
    </Modal>
  )
}

export default FoodModal
