import ModalFood from '@components/Food/Modal'
import Table from '@components/Table'
import useFood from '@hooks/useFood'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { useState } from 'react'

function Home() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState()

  const { food, createFood, deleteFood, editFood, setFilterDates, rangeDates } =
    useFood()

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

  return (
    <div className="App">
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
    </div>
  )
}

export default Home
