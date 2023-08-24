"use client"
import {createContext,useState} from 'react'

export const TextArrayContext=createContext();

export  function TextArrayProvider({children}){
    const [textArray, setTextArray] = useState([]);
    const [relationArray, setRelationArray] = useState([]);
    return(
        <TextArrayContext.Provider value={{textArray,setTextArray,relationArray, setRelationArray}}>
            {children}
        </TextArrayContext.Provider>
    )
}