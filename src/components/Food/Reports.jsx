import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import useFood from '@hooks/useFood'
import { useEffect, useState } from 'react'

const Reports = () => {
  const [AVGCaloriesLastWeek, setAVGCaloriesLastWeek] = useState(0)
  const [entriesLastWeek, setEntriesLastWeek] = useState(0)
  const { averageCaloriesLastWeek, numberOfEntriesLastWeek } = useFood()

  useEffect(() => {
    averageCaloriesLastWeek().then((data) => setAVGCaloriesLastWeek(data))
    numberOfEntriesLastWeek().then((data) => setEntriesLastWeek(data))
  }, [])

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Reports
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Last 7 days
        </Typography>
        <Typography variant="body" sx={{ mb: 2 }} component="div">
          <strong>Entries : </strong> {entriesLastWeek}
        </Typography>
        <Typography variant="body">
          <strong>Calories average: </strong> {AVGCaloriesLastWeek}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Reports
