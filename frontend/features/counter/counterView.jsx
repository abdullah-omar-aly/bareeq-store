import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import {increment1 , decrement1 , increment ,decrement }from './counterSlice'

const CounterView = () => {
    const counter = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  return (
    <div>
        <p>counter now is : {counter}</p>
        <button onClick={() => {dispatch(increment1())}}>increment 1</button>
        <button onClick={() => {dispatch(decrement1())}}>decrement 1</button>
        <button onClick={() => {dispatch(increment(3))}}>increment </button>
        <button onClick={() => {dispatch(decrement(3))}}>decrement</button>
    </div>
  )
}

export default CounterView