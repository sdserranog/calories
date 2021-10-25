import { useState, useEffect } from 'react'
import supabase from '@config/supabase'

import { MAX_CALORIES, MAX_BUDGET } from '@utils/constants'

const useFood = () => {
  const [food, setFood] = useState([])
  const [rangeDates, setRangeDates] = useState({ start: null, end: null })
  const [todayCalories, setTodayCalories] = useState(0)
  const [monthlyBudget, setMonthlyBudget] = useState(0)

  useEffect(() => {
    getFood()
  }, [rangeDates])

  const readFood = async () => {
    if (rangeDates.start && rangeDates.end) {
      return getFoodByRangeDate({
        start: rangeDates.start,
        end: rangeDates.end,
      })
    }
    return await supabase.from('Food').select('*')
  }

  const getFood = async () => {
    const { data, error } = await readFood()
    getCaloriesToday()
    getPricesMonth()
    if (error) handleError(error)
    setFood(data)
    return data
  }

  const getFoodByRangeDate = async ({ start, end }) => {
    const { data, error } = await supabase
      .from('Food')
      .select('*')
      .gte('created_at', start)
      .lte('created_at', end)
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

  const getTodaysFood = async () => {
    let start = new Date()
    start.setUTCHours(0, 0, 0, 0)
    start = start.toISOString()

    let end = new Date()
    end.setUTCHours(23, 59, 59, 999)
    end = end.toISOString()
    console.log({ start, end })
    const { data, error } = await getFoodByRangeDate({ start, end })
    if (error) handleError(error)
    return data
  }

  const getMonthlyFood = async () => {
    const date = new Date()
    let start = new Date(date.getFullYear(), date.getMonth(), 1)
    let end = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    start = start.toISOString()
    end = end.toISOString()
    console.log({ start, end })
    const { data, error } = await getFoodByRangeDate({ start, end })
    if (error) handleError(error)
    return data
  }

  const getCaloriesToday = async () => {
    return await getTodaysFood().then((data) => {
      const calories = data.reduce((acc, food) => acc + food.calories, 0)
      setTodayCalories(calories)
      return calories
    })
  }

  const getPricesMonth = async () => {
    return await getMonthlyFood().then((data) => {
      const prices = data.reduce((acc, food) => acc + food.price, 0)
      setMonthlyBudget(prices)
      return prices
    })
  }

  const canAddCalories = async (calories) => {
    const { data } = await getTodayFood()
    console.log(data)
    return calories < MAX_CALORIES
  }

  const canAddPrice = async (budget) => {
    return budget < MAX_BUDGET
  }

  const handleError = (error) => console.log(error)

  return {
    food,
    createFood,
    deleteFood,
    editFood,
    setFilterDates,
    rangeDates,
    canAddCalories,
    canAddPrice,
    todayCalories,
    monthlyBudget,
  }
}

export default useFood
