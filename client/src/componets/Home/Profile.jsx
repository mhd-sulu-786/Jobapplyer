import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Profile() {
    const id = localStorage.getItem("user");
    const [data, setData] = useState({}); // Initialize as an object

    useEffect(() => {
        axios.get(`http://localhost:2000/getuser/${id}`)
            .then(response => {
                setData(response.data.user || {}); // Ensure data is set correctly
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [id]);

    return (
        <div>
            <h1>{data.name || 'User'}</h1>
            {Array.isArray(data.applications) && data.applications.length > 0 ? (
                data.applications.map((app, index) => (
                    <div key={index}>
                    
                        <p>Experience: {app.experience}</p>
                        <p>Description: {app.description}</p>
                    </div>
                ))
            ) : (
                <p>No applications found.</p>
            )}
            <div className='btn'>
                <button className='btn btn-primary' onClick={() => window.location.href = '/home'}></button>
            </div>
        </div>
    );
}

export default Profile;