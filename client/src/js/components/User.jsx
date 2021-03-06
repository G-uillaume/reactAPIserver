import React from 'react';
import EditUser from './EditUser';

const User = ({ user, cars, editUser, deleteUser}) => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <h2>{user.first_name} {user.last_name}</h2>
                    <h3>Cars :</h3>
                    <ul>
                        {cars.map(car => {
                            if (car.user_id === user.id) {
                                return <li key={car.id}>{car.model} ({car.manufacturer}, {car.year})</li>
                            }
                        })}
                    </ul>
                </div>
                <EditUser
                user={user}
                editUser={editUser}
                deleteUser={deleteUser}
                />
            </div>
        </div>
    )
}

export default User
