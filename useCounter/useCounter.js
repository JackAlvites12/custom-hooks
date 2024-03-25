import { useState } from "react"

export const useCounter = ( valorInicial = 0 ) => {
    
    const [ counter, setCounter ] = useState( valorInicial )
    
    // Funcionalidades: 

    const incrementar = ( value = 1) => {
        setCounter( ( currentValue ) => currentValue + value )
    }

    const decrementar = ( value = 1 ) => {
        if( counter === 0 ) return
        setCounter( ( currentValue ) => currentValue - value )
    }

    const resetear = () => {
        setCounter( valorInicial )
    }
    
    return {
        counter,
        incrementar,
        decrementar,
        resetear,

    }
}