import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import User from './User';

const Users = () => {
    const [usersError, setUsersError] = useState(null)
    const [usersIsLoaded, setUsersIsLoaded] = useState(false)
    const [users, setUsers] = useState([])
    const [carsError, setCarsError] = useState(null)
    const [carsIsLoaded, setCarsIsLoaded] = useState(false)
    const [cars, setCars] = useState([])
    const [usersHaveCarsArray, setUsersHaveCarsArray] = useState([])
  
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
      let carsUsers = []
      for (car of cars) {
        for (user of users) {
          if (user.id === car.user_id) {
            carsUsers.push(user)
          }
        }
      }
      carsUsers = [...new Set(carsUsers)]
      setUsersHaveCarsArray(carsUsers)
    }, [cars, users])
  
    const deleteUser = id => {
      fetch('http://localhost:3000/users/' + id, {
        method: 'DELETE'
      })
      .then(
        setUsers(users.filter(x => x.id !== id))
      )
      .catch(err => console.log(err))
    }
  
    const editUser = user => {
      const index = users.findIndex(x => x.id === user.id)
      const usersCopy = [
        ...users.slice(0, index),
        user,
        ...users.slice(index+1)
      ]
      fetch('http://localhost:3000/users/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(
        setUsers(usersCopy)
      )
      .catch(err => console.log(err))
    }
  
    return (
      <>
      <div className="flex header">
        <Link to="/">Home</Link>
        <h1 className="title">Users</h1>
        <Link to="/users/add">Add user</Link>
      </div>
      
      {!usersIsLoaded 
      ? <h1 className="title">Loading...</h1> 
      : <main>
      {usersHaveCarsArray.map(user => (
        <User 
        key={user.id} 
        user={user}
        cars={cars}
        deleteUser={deleteUser}
        editUser={editUser}
        />
      ))}
      </main>
      }
      </>
    )
}

export default Users
