import React,{useState} from 'react'
import { addTodo } from './apiCalls'
import { useAppDispatch } from '../hooks/useTypedSelectors'


const AddTodo = () => {
    const dispatch = useAppDispatch()
    const [enteredTodo, setEnteredTodo] = useState('')

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(enteredTodo?.length)
        try {
           dispatch(addTodo({title: enteredTodo, completed: false})).unwrap()

           setEnteredTodo('')  
        } catch (err: any) {
          console.log(err.message)
        }
        
          
    }

  return (
    <form onSubmit={onSubmitHandler}>
        <input type='text' placeholder='Add a new todo' value={enteredTodo} onChange={(e)=> setEnteredTodo(e.target.value)} />
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddTodo