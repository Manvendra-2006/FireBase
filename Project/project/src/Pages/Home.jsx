import React, { useEffect } from 'react'
import { useAuth } from '../FireBase/FireBaseProvider'

const Home = ({data}) => {
    
const firebase = useAuth()
console.log(firebase.signout)
const signout = () =>{
    firebase.signout()
}
useEffect(()=>{
const writedata = async () =>{
    try{
       firebase.writedata(data?.email,data?.displayName,data?.uid) 
    }
    catch(error){
        console.log(error)
    }
}
writedata()
},[])

  return (
    <div>
        <div style={{border:"2px solid black",backgroundColor:"yello"}}>
        <button type='button' onClick={signout}>LogOut</button>
          <h1>{data?.displayName}</h1>
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, numquam aspernatur. Quia quaerat officia vel modi consequuntur ad, iste, suscipit voluptate assumenda ab vitae sed cupiditate non necessitatibus veritatis consequatur soluta doloremque illo, cum fugit. Quae iste totam quas cum?
            <h1>Home page</h1>
        </div>
        <div>
            <h1>User Detail</h1>
            <h1>{data?.email}</h1>          
        </div>
    </div>
  )
}

export default Home