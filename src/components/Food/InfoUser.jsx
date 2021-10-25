import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const InfoUser = ({ todayCalories, monthlyBudget }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Additional data
        </Typography>
        <Typography variant="body" sx={{ mb: 2 }} component="div">
          <strong>Calories: </strong> {todayCalories}
        </Typography>
        <Typography variant="body">
          <strong>Month budget: </strong> {monthlyBudget}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default InfoUser
