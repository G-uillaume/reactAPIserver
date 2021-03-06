import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

const AddCar = (props) => {
    const[carInputs, setCarInputs] = useState({
        model: '',
        manufacturer: '',
        year: '',
        user_id: ''
    })


    const onChange = e => {
        const value = e.target.name === 'user_id' ? Number(e.target.value) : e.target.value
        setCarInputs({
            ...carInputs, [e.target.name]: value
        })
    }

    const history = useHistory()

    const onSubmit = () => {
        fetch('http://localhost:3000/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carInputs)
        }).then(
            history.push("/cars")
        )
        .catch(err => console.log(err))
    }

    return (
        <div className="center-flex">
        <h1 className="addTitle">Add a car</h1>
        <form className="addForm" onSubmit={onSubmit}>
            <p>
                <label htmlFor="model">Model : </label>
                <input type="text" id="model" name="model" onChange={onChange} value={carInputs.model} />
            </p>
            <p>
                <label htmlFor="manufacturer">Manufacturer : </label>
                <input type="text" id="manufacturer" name="manufacturer" onChange={onChange} value={carInputs.manufacturer} />
            </p>
            <p>
                <label htmlFor="year">Year : </label>
                <input type="number" id="year" name="year" onChange={onChange} value={carInputs.year} />
            </p>
            <p>
                <label htmlFor="user_id">User : </label>
                <select id="user_id" name="user_id" onChange={onChange} value={carInputs.user_id}>
                    <option>...</option>
                    {props.location.state.users.map(user => (
                        <option value={user.id}>{user.first_name} {user.last_name}</option>
                    ))}
                </select>
            </p>
            <div className="buttonsAdd">
                    <button>Submit</button>
                    <Link to="/cars">Back to cars</Link>
                </div>
        </form>
        </div>
    )
}

export default AddCar
