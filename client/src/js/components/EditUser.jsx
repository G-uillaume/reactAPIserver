import React, { useState } from 'react'

const EditUser = ({ user, editUser, deleteUser }) => {
    const [selectedUser, setSelectedUser] = useState({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    })

    const handleChange = (e) => {
        setSelectedUser({
            ...selectedUser, [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editUser(selectedUser)
    }
    
    return (
        <div className="flip-card-back">
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} name="first_name" value={selectedUser.first_name} />
                <input type="text" onChange={handleChange} name="last_name" value={selectedUser.last_name}/>
                <input type="email" onChange={handleChange} name="email" value={selectedUser.email}/>
                <div className="buttons">
                    <button type="submit">Edit</button>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser
