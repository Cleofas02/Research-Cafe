import React from 'react'
import '../styles/Home.css'
import { Navbar } from './Navbar'
import Addpdft from './Addpdft'


export const Home = ({ user }) => {
    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Addpdft/>
        </div>
    )
}