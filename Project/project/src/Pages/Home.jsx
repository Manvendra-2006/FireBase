import React, { useEffect, useState } from 'react'
import { useAuth } from '../FireBase/FireBaseProvider'
import { Link } from 'react-router-dom'
const Home = ({ data }) => {

    const firebase = useAuth()
    const [bookdata, setbookdata] = useState([])

    const signout = () => {
        firebase.signout()
    }

    useEffect(() => {
        const writedata = async () => {
            try {
                await firebase.writedata(
                    data?.email,
                    data?.displayName,
                    data?.uid
                )
            }
            catch (error) {
                console.log(error)
            }
        }

        writedata()
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await firebase.getBookData(data?.uid)
                setbookdata(result)
            }
            catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])

    return (
        <div style={styles.container}>

            <div style={styles.header}>
                <h1 style={styles.heading}>
                    Welcome {data?.displayName || "User"}
                </h1>

               
            </div>

            <div style={styles.grid}>
                {
                    bookdata?.map((item, index) => {
                        return (
                            <div key={index} style={styles.card}>
                                <Link to={`/book/detail/${item.id}`}>
                                    <img
                                        src={item.pic}
                                        alt={item.BookName}
                                        style={styles.image}
                                    />

                                </Link>

                                <div style={styles.cardContent}>
                                    <h2 style={styles.bookName}>
                                        {item.BookName}
                                    </h2>

                                    <p style={styles.text}>
                                        ISBN: {item.isbnNumber}
                                    </p>

                                    <p style={styles.price}>
                                        ₹ {item.price}
                                    </p>
                                </div>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '30px'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },

    heading: {
        color: '#111827',
        fontSize: '32px'
    },

    logoutBtn: {
        padding: '10px 18px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#dc2626',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer'
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
        gap: '25px'
    },

    card: {
        backgroundColor: 'white',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: '0.3s'
    },

    image: {
        width: '100%',
        height: '260px',
        objectFit: 'cover'
    },

    cardContent: {
        padding: '18px'
    },

    bookName: {
        fontSize: '22px',
        color: '#111827',
        marginBottom: '10px'
    },

    text: {
        color: '#4b5563',
        marginBottom: '8px'
    },

    price: {
        color: '#2563eb',
        fontSize: '20px',
        fontWeight: 'bold'
    }
}

export default Home