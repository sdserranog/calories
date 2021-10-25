import { useState, useEffect } from 'react'
import supabase from '@config/supabase'

const useFood = () => {
  const [food, setFood] = useState([])
  const [rangeDates, setRangeDates] = useState({ start: null, end: null })

  useEffect(() => {
    getFood()
  }, [rangeDates])

  const readFood = async () => {
    if (rangeDates.start && rangeDates.end) {
      return getFoodByDate({ start: rangeDates.start, end: rangeDates.end })
    }
    return await supabase.from('Food').select('*')
  }

  const getFood = async () => {
    const { data, error } = await readFood()
    if (error) handleError(error)
    setFood(data)
    return data
  }

  const getFoodByDate = async ({ start, end }) => {
    const { data, error } = await supabase
      .from('Food')
      .select('*')
      .gte('created_at', rangeDates.start)
      .lte('created_at', rangeDates.end)
    return { data, error }
  }

  const setFilterDates = async ({ start, end }) => {
    setRangeDates({ start, end })
  }

  const createFood = async ({ name, calories, price, date, user_id }) => {
    const { error } = await supabase
      .from('Food')
      .insert([{ name, calories, price, created_at: date, user_id }])
    if (error) handleError(error)
    getFood().then((data) => data)
  }

  const deleteFood = async (ids) => {
    const { error } = await supabase.from('Food').delete().in('id', ids)
    if (error) handleError(error)
    getFood().then((data) => data)
  }

  const editFood = async (id, data) => {
    const { error } = await supabase.from('Food').update(data).eq('id', id)
    if (error) handleError(error)
    getFood().then((data) => data)
  }

  const handleError = (error) => console.log(error)

  return { food, createFood, deleteFood, editFood, setFilterDates, rangeDates }
}

export default useFood
