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
    if(suggestionAdded){
      input.style.caretColor='transparent';
    }
    else{
      input.style.caretColor='initial';
    }
  },[suggestionAdded])
  useEffect(()=>{
    console.log(textArray[idx]);
    const input=document.querySelector(`.innerClass${idx}`);
    input.value=textArray[idx];
  },[textArray])

  const handleChange=(e)=>{

    const inpString=e.target.value;
    const l=inpString.length;

    if(inpString[l-2]=='<' && inpString[l-1]=='>'){
      setShowSuggestion(true);
    }
    else{
      setShowSuggestion(false);
    }
  }

  const handleSuggestionClick=(e)=>{
    const input=document.querySelector(`.innerClass${idx}`);
    setRelationArray((oldVal)=>{
      for(let elem of oldVal){
        if(elem.originalText===textArray[idx]){
          let restRel=[];
          for(let i=0;i<oldVal.length;i++){
            if(oldVal[i].originalText==e.target.innerText){
              restRel=oldVal[i].relArray;
            }
          }
          elem.relArray=[...elem.relArray,e.target.innerText,...restRel];
        }
      }
      return oldVal;
    })
    setSuggestionAdded(true);
    let newStr='';
    let currText=e.target.innerText;
    newStr+='<>'+currText;
    const fillStr=()=>{
      for(let i=0;i<relationArray.length;i++){
        if(relationArray[i].originalText==currText){
          console.log(relationArray[i].relArray);
          for(let j=0;j<relationArray[i].relArray.length;j++){
            newStr+='<>'+relationArray[i].relArray[j]+' ';
          }
        }
      }
    }

    fillStr();
    input.value=input.value.substring(0,input.value.length-2)+'';
    const relBox=document.querySelector(`.relBox${idx}`);
    relBox.innerText=newStr;

    const caretCoords = input.getBoundingClientRect();
    let boxCords=relBox.getBoundingClientRect();
    relBox.style.left=input.selectionEnd+'0px';
    boxCords=relBox.getBoundingClientRect();
    input.selectionEnd=input.selectionEnd+boxCords.right;
    
    console.log(caretCoords);

    console.log(relationArray);
    setShowSuggestion(false);
  }

  const handleKeyDown=(e)=>{
    let keyId = e.keyCode;

    if(keyId=='8'){
      let str=e.target.value;
      let lastAngularBracketIdx=-1;
      for(let i=str.length-1;i>0;i--){
        if(str[i]=='>' && str[i-1]=='<'){
          lastAngularBracketIdx=i;
        }
      }

      if(lastAngularBracketIdx!=-1){
        e.target.value=str.substr(0,lastAngularBracketIdx);
        setRelationArray((oldVal)=>{
          for(let elem of oldVal){
            if(elem.originalText===textArray[idx]){
              elem.relArray=[];
            }
          }
          return oldVal;
        })
      }
      console.log(e.target.value);
      if(suggestionAdded==true){
        const relBox=document.querySelector(`.relBox${idx}`);
        relBox.innerText='';
        setRelationArray((oldVal)=>{
          for(let elem of oldVal){
            if(elem.originalText===textArray[idx]){
              elem.relArray=[];
            }
          }
          return oldVal;
        })
        setSuggestionAdded(false);
      }
      
    }
  }

  return (
    <div className={`${styles.inputWrapper} outerClass${idx}`}>
      <input className={`innerClass${idx} ${styles.main}`} onChange={handleChange} onKeyDown={handleKeyDown}/>
      <span className={`relBox${idx}`}></span>
      <div className={`suggestion`}>
      {
          showSuggestion==1?
          textArray.map((elem,currIdx)=>
            <p onClick={handleSuggestionClick}>{elem}</p>
          )
          :
          <div></div>
      }

      </div>
    </div>
  )
}
