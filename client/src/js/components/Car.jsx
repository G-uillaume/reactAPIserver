import React from 'react'
import EditCar from './EditCar'

const Car = ({ car, users, editCar, deleteCar }) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h2>{car.model}</h2>
                    <p>{car.manufacturer}</p>
                    <p>{car.year}</p>
                    {users.map(user => {
                        if (car.user_id === user.id) {
                            return <p key={user.id}>Owned by <strong>{user.first_name} {user.last_name}</strong></p>
                        }
                    })}
                </div>
                <EditCar
                car={car}
                editCar={editCar}
                deleteCar={deleteCar}
                users={users}
                />
            </div>
        </div>
    )
}

export default Car
