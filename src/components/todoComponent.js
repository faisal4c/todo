
"use client";
import { useContext, useEffect, useState } from "react";
import InputComponent from "../components/inputComponent";
import {TextArrayContext} from "../providers/textArrayProvider";

export default function TodoComponent() {
  const {textArray,setTextArray,relationArray,setRelationArray}=useContext(TextArrayContext);
  const [newTodo,setNewToDo]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    setTextArray((oldVal)=>{
        return [newTodo,...oldVal]
    })
    setRelationArray((oldVal)=>{
        return [{originalText:newTodo,relArray:[]},...oldVal];
    })
  }

  const handleChange=(e)=>{
    setNewToDo(e.target.value);
  }

  return (
    <main>
    <div className="text-content wrapper">
      <h1>faisal4c@gmail.com</h1>
    </div>
    
    <div className="form-wrapper wrapper">
      <form className="mainForm" onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
        <input type="submit" />
      </form>
    
      <form  className="todo-items">
        {
            relationArray.map((elem,idx)=>(
                <InputComponent key={idx} idx={idx}/>
            ))
        }

      </form>
    </div>
    </main>
  );
}
