import React from 'react';
import school from '../images/school.png';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Navbar = () => {
    return (
        <div className='navbox   bg-sky-950 border-t-2 border-blue-900'>
            
            <div className='leftside '>
                <img src={school} height={110} width={110} alt='school-logo' className='logo-nav' />
                <h3 className='text-4xl font-bold text-slate-50'><h1 className='text-4xl font-bold text-blue-400'>San Mateo Senior High School</h1> Research Development Center (Research Cafe)<h1 className='text-4xl font-bold text-amber-400'>Card Catalogue</h1> </h3>
            </div>
            <div className='rightside'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 text-lg'><Link to="/">Home <FontAwesomeIcon icon="fa-light fa-house" /> </Link> </button> 

            </div>
        </div>
    )
}