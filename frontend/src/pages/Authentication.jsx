import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import axios from "axios";

function Authentication() {

  const click = () => {
    axios.get("http://localhost:8082/").then((res) => {
      console.log(res);
    });
  }

  return (
    <>
      <div>
        <p>
          <button onClick={click}> Click me </button>
        </p>
      </div>
    </>
  )
}

export default Authentication
