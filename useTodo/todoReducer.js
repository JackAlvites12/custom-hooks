

export const todoReducer = ( initialState = [], action ) => {
    
    switch ( action.type ) {
        case '[TODO] add Todo':

        // El state puede ser cualquier tipo de dato
        // en este caso será un arreglo, tratar de no
        // mutar el arreglo con push, si queremos crear un arreglo
        // basado en el anterior podemos usar un map o un filter
            return [...initialState, action.payload]

        case '[TODO] remove Todo': 
            return initialState.filter( todo => todo.id !== action.payload )

        case '[TODO] toggle Todo':
            return initialState.map( todo => {

                if( todo.id === action.payload ){

                    return {
                        ...todo, 
                        done: !todo.done,
                    }
                        
                    
                }

                return todo 
            })

        default:
            return initialState;
    }

} 















// case '[TODO] remove Todo':
//     /* Lo que tengo que retornar es el mismo estado inicial menos 
//        el todo que yo quiero eliminar, para ello usaremos filter
//        para eliminar, en el action puedo mandarle en el payload el id 
//        o todo el TODO */ 

//     return initialState.filter( todo => todo.id !== action.payload )
