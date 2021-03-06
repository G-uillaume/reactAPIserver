import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className="center-flex home">
            <Link to="/users" id="seeUsers">See Users</Link>
            <Link to="/cars" id="seeCars">See Cars</Link>
        </div>
    )
}

export default Home
