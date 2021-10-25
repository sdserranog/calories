import { useState, useEffect } from 'react'
import supabase from '@config/supabase'

const useFood = () => {
  const [food, setFood] = useState([])

  useEffect(() => {
    getFood()
  }, [])

  const getFood = async () => {
    let { data, error } = await supabase.from('Food').select('*')
    if (error) handleError(error)
    setFood(data)
    return data
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

  return { food, createFood, deleteFood, editFood }
}

export default useFood
