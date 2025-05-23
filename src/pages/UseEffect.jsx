import React from "react";
// import { useEffect } from "react";
import Test from "../components/Test";
export default function UseEffect() {
    const [count, setcount] = React.useState(0);
    const [name, setName] = React.useState("Mohamed");

    // function callApi() {
    //     console.log("API called");
    //     setcount(count + 1);
    // }
    // useEffect(() => {
    //     callApi();
    // }, [name]);
    return (
        <>
            <Test />
            <div className="  gap-1.5 flex flex-col items-center justify-center h-screen">
                <h2 className="w-32 h-10  border-2 rounded-2xl flex items-center justify-center"> count: {count}</h2>
                <input className="border-2  rounded-3xl" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <button className=" w-[5em] h-[2em] bg-black text-white rounded-2xl" onClick={() => setcount(count + 1)}>
                    {" "}
                    counter
                </button>
            </div>
        </>
    );
}
