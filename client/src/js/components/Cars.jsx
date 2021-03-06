import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Car from './Car'

const Cars = () => {
    const [usersError, setUsersError] = useState(null)
    const [usersIsLoaded, setUsersIsLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [carsError, setCarsError] = useState(null)
    const [carsIsLoaded, setCarsIsLoaded] = useState(false)
    const [cars, setCars] = useState([])
    const [carsCopy, setCarsCopy] = useState([])
  
    useEffect(() => {
      fetch('http://localhost:3000/users', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          setUsersIsLoaded(true)
          setUsers(result)
        },
        (error) => {
          setUsersIsLoaded(true)
          setUsersError(error)
        }
      )
      fetch('http://localhost:3000/cars', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          setCarsIsLoaded(true)
          setCars(result)
        },
        (error) => {
          setCarsIsLoaded(true)
          setCarsError(error)
        }
      )
    }, [])

    useEffect(() => {
        setCarsCopy([...cars])
    }, [cars])

    const deleteCar = id => {
        fetch('http://localhost:3000/cars/' + id, {
            method: 'DELETE'
        })
        .then(
            setCars(cars.filter(x => x.id != id))
        )
        .catch(err => console.log(err))
    }

    const editCar = car => {
        const index = cars.findIndex(x => x.id === car.id)
        const carsCopy = [
            ...cars.slice(0, index),
            car,
            ...cars.slice(index+1)
        ]
        fetch('http://localhost:3000/cars/' + car.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(
            setCars(carsCopy)
        )
        .catch(err => console.log(err))
    }

    return (
        <>
      <div className="flex header">
        <Link to="/">Home</Link>
        <h1 className="title">Cars</h1>
        <Link to={{ pathname: "cars/add", state:  { users } }}>Add car</Link>
      </div>
      
      {!carsIsLoaded 
      ? <h1 className="title">Loading...</h1> 
      : <main>
      {carsCopy.map(car => (
        <Car 
        key={car.id} 
        car={car}
        users={users}
        deleteCar={deleteCar}
        editCar={editCar}
        />
      ))}
      </main>
      }
      </>
    )
}

export default Cars
