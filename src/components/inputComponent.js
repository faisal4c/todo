"use client";
import styles from './inputComponent.module.css'
import { useContext,useEffect, useState } from "react";
import {TextArrayContext} from "../providers/textArrayProvider";

export default function InputComponent({idx}) {
  const [showSuggestion,setShowSuggestion]=useState(false);
  const [suggestionAdded,setSuggestionAdded]=useState(false);
  const {textArray,setTextArray,relationArray,setRelationArray}=useContext(TextArrayContext);


  useEffect(()=>{
    const input=document.querySelector(`.innerClass${idx}`);
    input.innerText=textArray[idx];
    if(relationArray[idx].relArray.length!=0){
      let newStr='';
      for(let i=0;i<relationArray[idx].relArray.length;i++){
        newStr+='<>'+relationArray[idx].relArray[i];
      }
      const span=document.createElement('span');
      span.classList.add(`span${idx}`);
      span.innerText=newStr;
      input.append(span);
    }

  },[relationArray,textArray])

  const handleChange=(e)=>{


  }

  const handleSuggestionClick=(e)=>{
    const input=document.querySelector(`.innerClass${idx}`);
    setRelationArray((oldVal)=>{
      let newArr=[...oldVal];
      for(let elem of newArr){
        if(elem.originalText===textArray[idx]){
          let restRel=[];
          for(let i=0;i<newArr.length;i++){
            if(newArr[i].originalText==e.target.innerText){
              restRel=newArr[i].relArray;
            }
          }
          elem.relArray=[...elem.relArray,e.target.innerText,...restRel];
        }
      }
      return newArr;
    })
    setShowSuggestion(false);
  }

  const handleKeyDown=(e)=>{
    let keyId = e.keyCode;
    let str=e.target.innerText;

    if(keyId=='8'){
      let lastAngularBracketIdx=-1;
      for(let i=str.length-1;i>0;i--){
        if(str[i]=='>' && str[i-1]=='<'){
          lastAngularBracketIdx=i;
        }
      }

      if(lastAngularBracketIdx!=-1){
        e.target.innerText=str.substr(0,lastAngularBracketIdx-1);
        setRelationArray((oldVal)=>{
          for(let elem of oldVal){
            if(elem.originalText===textArray[idx]){
              elem.relArray=[];
            }
          }
          return oldVal;
        })
      }
    }
    else{
      const l=str.length;
  
      if(str.indexOf('<')!=-1){
        setShowSuggestion(true);
      }
      else{
        setShowSuggestion(false);
      }
    }
  }

  return (
    <div className={`${styles.inputWrapper} outerClass${idx}`}>
      <div className={`innerClass${idx} ${styles.main} inputDiv`} onChange={handleChange} onKeyDown={handleKeyDown} contentEditable={true}></div>
      <div className={`suggestion`}>
      {
          showSuggestion==1?
          textArray.map((elem,currIdx)=>
            <p key={currIdx} onClick={handleSuggestionClick}>{elem}</p>
          )
          :
          <div></div>
      }

      </div>
    </div>
  )
}
