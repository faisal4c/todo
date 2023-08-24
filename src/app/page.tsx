"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import InputComponent from "../components/inputComponent";
import TodoComponent from "../components/todoComponent";


export default function Home() {

  return (
      <TodoComponent/>
  );
}
