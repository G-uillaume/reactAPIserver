import React, { useState } from 'react'

const EditCar = ({ car, editCar, deleteCar, users }) => {
    const [selectedCar, setSelectedCar] = useState({
        id: car.id,
        model: car.model,
        manufacturer: car.manufacturer,
        year: car.year,
        user_id: car.user_id
    })

    const handleChange = (e) => {
        const value = e.target.name === 'user_id' ? Number(e.target.value) : e.target.value
        setSelectedCar({
            ...selectedCar, [e.target.name]: value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        editCar(selectedCar)
    }

    return (
        <div className="flip-card-back">
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} name="model" value={selectedCar.model} />
                <input type="text" onChange={handleChange} name="manufacturer" value={selectedCar.manufacturer} />
                <input type="number" onChange={handleChange} name="year" value={selectedCar.year} />
                <select name="user_id" onChange={handleChange} value={selectedCar.user_id}>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                    ))}
                </select>
                <div className="buttons">
                    <button type="submit">Edit</button>
                    <button onClick={() => deleteCar(car.id)}>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default EditCar
