import { useEffect, useState } from 'react'

import Table from '@components/Table'
import supabase from '@config/supabase'
import ModalFood from '@components/Food/Modal'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function Home() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])

  const handleCreate = async ({ name, calories, price, date, user_id }) => {
    console.log({ name, calories, price, date })
    const { data, error } = await supabase
      .from('Food')
      .insert([{ name, calories, price, created_at: date, user_id }])
      .single()
      .then(({ data, error }) => {
        console.log(data, error)
        if (!error) {
          setData((prevData) => [data, ...prevData])
        }
        setOpen(false)
      })
  }

  useEffect(() => {
    supabase
      .from('Food')
      .select('*')
      .then(({ data }) => {
        setData(data)
      })
  }, [])

  return (
    <div className="App">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Food
      </Button>
      <Table data={data} />
      <ModalFood
        open={open}
        handleClose={() => setOpen(false)}
        onChange={handleCreate}
      />
    </div>
  )
}

export default Home
