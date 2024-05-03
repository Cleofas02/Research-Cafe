import React from 'react'
import { Link } from 'react-router-dom';
import school from '../images/school.png'



 const Homepage = () => {
  return (
    <>
            <div className=' flex    items-center p-46 p-40 bg-sky-950 h-screen' >
                <div className='mr-16 tracking-widest'>
                    <img src={school} height={600} width={600} alt='school-logo' className='logo-nav' />
                </div>
                <div>
                    <h6 className='tracking-widest font-bold text-2xl text-white		'>Welcome to</h6> <br/>            
                    <h1 className='tracking-widest font-extrabold text-3xl text-blue-400'>San Mateo Senior High School</h1>
                    <h3 className='tracking-widest font-extrabold text-5xl text-blue-400'>Research Development Center (Research Cafe)</h3><br/>  
                    <p  className='tracking-widest font-bold  text-2xl text-white'>Card Catalogue</p><br/><br/>
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 text-lg'><Link to="/auth">Upload</Link></button> 
                        <button className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  text-lg'><Link to="/home">Get Started</Link></button> 
                    </div>
                </div>
            </div>

  
    </>
  ) 
}


export default Homepage;
