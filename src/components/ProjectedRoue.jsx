import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProjectedRoue(element) {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
        }
    }, [navigate])
  return (
    <div>
      
    </div>
  )
}

export default ProjectedRoue
