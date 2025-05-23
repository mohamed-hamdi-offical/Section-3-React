import React from 'react'
import { useEffect } from "react";

export default function Test() {
    const [ counter , setCounter] = React.useState(0);
    useEffect(() => {
       const x =setInterval(() => {
            console.log("Interval", counter);
            setCounter(counter + 1);

        }, 1000);
        return () => { 
            
            clearInterval(x);
        }


    }, []);
  return (
      <div> Test:{counter}</div>
  )
}
