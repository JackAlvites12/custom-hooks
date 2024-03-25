import { useEffect, useReducer } from "react"
import { todoReducer } from "../08-useReducer/todoReducer";


const init = () => {
  // Intenta parsear lo que está en el localStorage a un objeto de javascript
  // y si no encuentras nada retorna un arreglo vacío 
  
  return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {

  const [ todos, dispatch ] = useReducer( todoReducer, [], init)

  useEffect(()=>{

      localStorage.setItem('todos', JSON.stringify( todos ))

  }, [ todos ])

  // 1era Forma
  const todosCount = () => todos.length 
  const todosPendingCount = () => todos.filter( todo => !todo.done).length


  const handleNewTodo = ( todo ) => {

    const action = {
      type: '[TODO] add Todo',
      payload: todo,
    }

    // El dispatch no devuelve nada, solo actualiza el estado y aplica
    // un nuevo renderizado 
    dispatch( action )
  }

  const handleDeleteTodo = ( id ) => {
    
    dispatch({
      type: '[TODO] remove Todo',
      payload: id, 
    })

  }

  const handleToggleTodo = ( id ) => {

    dispatch({
      type: '[TODO] toggle Todo',
      payload: id,
    })

  }


  return {

    todos,
    todosCount,         //2da forma: todosCount: todos.length
    todosPendingCount,          //   todosPendingCount: todos.filter( todo => !todo.done ).length 
    handleNewTodo,
    handleToggleTodo,
    handleDeleteTodo,

  }

}
