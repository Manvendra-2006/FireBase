import React, { useEffect, useState } from 'react'
import { app } from './FireBase/RealTimeDataBase'
import {getDatabase,set,ref,get,child,onValue} from "firebase/database"
const database = getDatabase(app) // instance of database 
const App = () => {
  //const putdata = (key,data) => set(ref(database,key),data)  here key is path 
  const putData = async ()=>{ // This is how we put data or create data in realtime database
    try{
        await set(ref(database,"users/user1"),{
          name:"Manvendra",
          age:"12",
          subject:"maths"
        })
    }catch(error){
      console.log("Error",error)
    }
  }
 
    const getData = async () =>{
  const dbRef = ref(database)  // yaha parent ka refrence diye kiske andar data get krna hain 
    const data = child(dbRef,"users/user1") // yaha child batye kya dhudna hain
    const snapshot = await get(data)
    console.log(snapshot.val())  // yah get kre
    }
    onValue(ref(database,"users"),(snapshot)=>console.log(snapshot.val())) // To get the real time data
    const [name,setname]= useState(null)
    useEffect(()=>{
          onValue(ref(database,"users"),(snapshot)=>setname(snapshot.val().user1.name)) // To get the real time data
    },[])
  return (
    <div>
      <button onClick={putData}>Put Data</button>
      <button onClick={getData}>GetData</button>
      <h1>{name}</h1>
    </div>
  )
}

export default App