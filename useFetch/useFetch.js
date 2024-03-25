import { useEffect, useState } from 'react'

const localCache = {}

export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false, 
        error: null,
    })

    // Quiero que llames a la API solo cuando la URL cambia 
    // de esta manera evitaremos llamadas innecesarias cada vez
    // que el componente que tenga el hook useFetch se renderice
    useEffect(() => {
        
        getFetch()

    }, [ url ])

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,

        })
    }
    
    const getFetch = async () => {

        // Si el localCache[ url que le estas pasando] ya existe entonces 
        // quiero que me establezcas el nuevo estado 
        if( localCache[ url ] ){

            // Guardamos en caché
            setState({
                data: localCache[ url ], //Guardamos el valor de localCache[ url ]
                isLoading: false,        // osea su data 
                hasError: false, 
                error: null
            })

            return; // Aqui ya no haces nada mas y de esta manera evitarás que 
                    // haya un tiempo de espera por el await new Promise de abajo...
        } 


        setLoadingState()
        
        const res = await fetch( url )

        // Esperamos 1.5 seg para que resuelva una promesa anónima
        await new Promise(resolve => setTimeout(resolve,1000))



        // Si la respuesta.ok no se cumple entonces establecemos el sgte estado:
        if( !res.ok ){
            setState({
                data: null,
                isLoading: false,
                hasError: true, 
                error: {
                    code: res.status,
                    message: res.statusText,
                }
            })
            return;
        }

        const data = await res.json()

        setState({
            data: data,
            isLoading: false,
            hasError: false, 
            error: null,
        })

        /* Manejo del cache 
        Aquí le decimos que en la propiedad URL le asigne toda 
        la data, ejm: Si recibo el url de https://pokeapi.co/api/v2/pokemon/1   
        entonces esta URL toda su data se guardará en la propiedad de la URL: 
            'https://pokeapi.co/api/v2/pokemon/1': data{...{...}}
        
        En resumen: url será la llave y data será el valor 
            */ 
        localCache[ url ] = data 


    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
