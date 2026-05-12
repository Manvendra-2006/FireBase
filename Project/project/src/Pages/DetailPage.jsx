import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../FireBase/FireBaseProvider'
import { Link } from 'react-router-dom'
const DetailPage = ({data}) => {
    const {id} = useParams()
    console.log(id)
    const firebase = useAuth()
    const [bookData,setbookData] = useState(null)
    useEffect(()=>{
        try{
             if (!data?.uid || !id) return
  const result = firebase.getSpecificData(data?.uid,id)
  .then((res)=>{
    setbookData(res)
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
        }
        catch(error){
            console.log(error)
        }
      
    },[data,id])
  return (
    <div>
        <h1>{bookData?.BookName}</h1>
       <img src={bookData?.pic} alt="" />
        <h1>{bookData?.price}</h1>
        <h1>{bookData?.isbnNumber}</h1>
        <Link to={`/book/detail/update/${id}`}>Update Data</Link>
    </div>
  )
}

export default DetailPage