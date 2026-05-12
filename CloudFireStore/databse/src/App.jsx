import React from 'react'
import { getFirestore , collection,addDoc , doc,getDoc, where , query, getDocs} from 'firebase/firestore'
import { app } from './Firebase/Firebase'
const firestore = getFirestore(app) // instance create 
const App = () => {
  const writeData = async () =>{
    console.log("Button Clicked")
    try{
 const result = await addDoc(collection(firestore,"cities"),{ //This will tell how to write a document inside a collection
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
  const writeSubCollection = async () =>{  // This tell how to write a collection inside a document
    try{
 const result = await addDoc(collection(firestore,"cities/cHjbA3cJBYGKO36ug2pi/places"),{
      name:"This is a place",
      des:"Awesome descrrip",
      good:true
    })
    console.log(result)
    }
    catch(err){
      console.log(err)
    }
  }
  const getDocument = async () =>{  // This will get the document or a data of specific path
    const res =  doc(firestore,"cities","UQNNuqDhSOqyc6joUdWU")
    const data = await getDoc(res)
    console.log(data.data())
  }
  getDocument()

  const getDocumentByQuery = async ()=>{ // This will get the particular document or collection 
      const collectionRef = collection(firestore,"userdata12345/document67890/purchase13579")
      const q = query(collectionRef,where("Car","==",987689100))
      const sanpshot = await getDocs(q)
      sanpshot.forEach((data)=>console.log(data.data()))
  }

  return (
    <div> 
      <h1>firebase app</h1>
      <button  type="button" onClick={writeData} >Put Data</button>
      <button type="button" onClick={writeSubCollection}>Put SubCollection</button>
      <button type='button' onClick={getDocument}>Get Document</button>
      <button type='button' onClick={getDocumentByQuery}>GetDocumentbyquery</button>
    </div>
  )
}

export default App