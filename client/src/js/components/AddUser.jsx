import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
const AddUser = () => {
    const [userInputs, setUserInputs] = useState({
        first_name: '',
        last_name: '',
        email: ''
    })

    const onChange = e => {
        setUserInputs({
            ...userInputs, [e.target.name]: e.target.value
        })
    }

    const history = useHistory()

    const onSubmit = () => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInputs)
        }).then(
            history.push("/users")
        )
        .catch(err => console.log(err))
    }


    return (
        <div className="center-flex">
            <h1 className="addTitle">Add an user</h1>
            <form className="addForm" onSubmit={onSubmit}>
                <p>
                    <label htmlFor="first_name">First name : </label>
                    <input type="text" onChange={onChange} id="first_name" name="first_name" value={userInputs.first_name}/>
                </p>
                <p>
                    <label htmlFor="last_name">Last name : </label>
                    <input type="text" onChange={onChange} id="last_name" name="last_name" value={userInputs.last_name}/>
                </p>
                <p>
                    <label htmlFor="email">Email : </label>
                    <input type="email" onChange={onChange} id="email" name="email" value={userInputs.email}/>
                </p>
                <div className="buttonsAdd">
                    <button>Submit</button>
                    <Link to="/users">Back to users</Link>
                </div>
            </form>
        </div>
    )
}

export default AddUser
