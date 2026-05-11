import React from 'react'
import { getFirestore , collection,addDoc , doc,getDoc} from 'firebase/firestore'
import { app } from './Firebase/Firebase'
const firestore = getFirestore(app) // instance create 
const App = () => {
  const writeData = async () =>{
    console.log("Button Clicked")
    try{
 const result = await addDoc(collection(firestore,"cities"),{
      name:"Delhi",
      pinCode:1234,
      lat:123,
      long:456
    })
    console.log("Result",result)
    }
   catch(err){
     console.log("Firestore Error Code:", err.code)
  console.log("Firestore Error Message:", err.message)
  console.log(err)
   }
  }
  const writeSubCollection = async () =>{
   
    try{
 const result = await addDoc(collection(firestore,"cities/cHjbA3cJBYGKO36ug2pi/places"),{
      name:"This is a place",
      des:"Awesome descrrip",
      good:true
    })
    }
    catch(err){
      console.log(err)
    }
  }
  const getDocument = async () =>{
    const res =  doc(firestore,"cities","UQNNuqDhSOqyc6joUdWU")
    const data = await getDoc(res)
    console.log(data.data())
  }
  getDocument()
  return (
    <div> 
      <h1>firebase app</h1>
      <button  type="button" onClick={writeData} >Put Data</button>
      <button type="button" onClick={writeSubCollection}>Put SubCollection</button>
      <button type='button' onClick={getDocument}>Get Document</button>
    </div>
  )
}

export default App