import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../FireBase/FireBaseProvider'

const Update = ({ data }) => {

    const { id } = useParams()
    const firebase = useAuth()

    const [bookName, setbookName] = useState("")
    const [pic, setpic] = useState("")
    const [isbnNumber, setisbnNumber] = useState("")
    const [price, setprice] = useState("")
    const navigate = useNavigate()
    useEffect(() => {

        const getData = async () => {
            try {

                const result = await firebase.getSpecificData(data?.uid, id)

                console.log(result)

                setbookName(result?.BookName || "")
                setpic(result?.pic || "")
                setisbnNumber(result?.isbnNumber || "")
                setprice(result?.price || "")

            }
            catch (error) {
                console.log(error)
            }
        }

        if (data?.uid && id) {
            getData()
        }

    }, [data, id])

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedData = {
            bookName,
            pic,
            isbnNumber,
            price
        }

     firebase.writeBookData(updatedData,data?.uid)
     .then((res)=>{
        setbookName(res?.BookName || "")
                setpic(res?.pic || "")
                setisbnNumber(res?.isbnNumber || "")
                setprice(res?.price || "")
                navigate("/")

     })
     .catch((err)=>{
        console.log(err)
     })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Book Name</label>
                    <input
                        type="text"
                        value={bookName}
                        onChange={(e) => setbookName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Book Image URL</label>
                    <input
                        type="text"
                        value={pic}
                        onChange={(e) => setpic(e.target.value)}
                    />
                </div>

                <div>
                    <label>ISBN Number</label>
                    <input
                        type="text"
                        value={isbnNumber}
                        onChange={(e) => setisbnNumber(e.target.value)}
                    />
                </div>

                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Update Book
                </button>

            </form>

        </div>
    )
}

export default Update