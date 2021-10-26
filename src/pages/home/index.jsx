import Alert from '@components/Alert'
import InfoUser from '@components/Food/InfoUser'
import ModalFood from '@components/Food/Modal'
import Table from '@components/Table'
import useFood from '@hooks/useFood'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { MAX_BUDGET, MAX_CALORIES } from '@utils/constants'
import { useEffect, useState } from 'react'

function Home() {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState([])
  const [selected, setSelected] = useState()

  const {
    food,
    createFood,
    deleteFood,
    editFood,
    setFilterDates,
    rangeDates,
    todayCalories,
    monthlyBudget,
    hasExcededCalories,
    hasExcededBudget,
  } = useFood()

  useEffect(() => {
    let messages = []
    if (hasExcededCalories())
      messages.push({
        id: 1,
        message: `Your daily goal is consume less than ${MAX_CALORIES} calories`,
      })
    if (hasExcededBudget())
      messages.push({
        id: 2,
        message: `Your budget for this month is less than $${MAX_BUDGET}`,
      })
    setErrors(messages)
  }, [todayCalories, monthlyBudget])

  const handleCreate = (data) => {
    createFood(data).then(() => setOpen(false))
  }
  const handleEdit = (id, data) => {
    editFood(id, data).then(() => setOpen(false))
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  const handleChangeDates = ({ start, end }) => {
    setFilterDates({ start, end })
  }

  const openModalEdit = (entry) => {
    setSelected(entry)
    setOpen(true)
  }

  const removeError = (id) => {
    const messages = errors.filter((error) => error.id !== id)
    setErrors(messages)
  }

  return (
    <div className="App">
      {errors.map((error) => (
        <Alert error={error} handleClose={removeError} key={error.id} />
      ))}
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Food
      </Button>
      <Table
        data={food}
        deleteFood={deleteFood}
        editFood={openModalEdit}
        selectDates={rangeDates}
        changeDates={handleChangeDates}
      />
      <ModalFood
        open={open}
        data={selected}
        handleClose={handleClose}
        createFood={handleCreate}
        editFood={handleEdit}
      />
      <InfoUser todayCalories={todayCalories} monthlyBudget={monthlyBudget} />
    </div>
  )
}

export default Home
