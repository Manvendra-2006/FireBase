import React, { useState } from 'react'
import { useAuth } from '../FireBase/FireBaseProvider'

const AddListing = ({data}) => {
    const firebase = useAuth()
    console.log(firebase)
  const [bookName, setbookName] = useState('')
  const [isbnNumber, setisbnNumber] = useState('')
  const [price, setprice] = useState('')
  const [pic, setpic] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bookData = {
      bookName,
      isbnNumber,
      price,
      pic
    }   
    if(!data?.uid){
        return (
            <div>
                <h1>Data is not submitted</h1>
            </div>
        )
    }
   await firebase.writeBookData(bookData,data?.uid)
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Add Book Listing</h2>

        <label style={styles.label}>Book Name</label>
        <input
          type="text"
          placeholder="Enter book name"
          value={bookName}
          onChange={(e) => setbookName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>ISBN Number</label>
        <input
          type="text"
          placeholder="Enter ISBN number"
          value={isbnNumber}
          onChange={(e) => setisbnNumber(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Price</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Book Image URL</label>
        <input
          type="text"
          placeholder="Enter image URL"
          value={pic}
          onChange={(e) => setpic(e.target.value)}
          style={styles.input}
        />

        {pic && (
          <img
            src={pic}
            alt="Book Preview"
            style={styles.preview}
          />
        )}
        
        <button type="submit" style={styles.button}>
          Add Listing
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  },
  form: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '14px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#111827'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '18px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  preview: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '18px'
  }
}

export default AddListing