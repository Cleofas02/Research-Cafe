import React from 'react';
import { Link } from 'react-router-dom';
import school from '../images/plain.png';

const Homepage = () => {
  return (
    <>
      <div className='flex items-center p-4 md:p-10 bg-sky-950 h-screen'>
        <div className='mr-16 tracking-widest'>
          <img src={school} height={600} width={600} alt='school-logo' className='logo-nav' />
        </div>
        <div>
          <h6 className='tracking-widest font-bold text-4xl text-blue-700 font-sans'>Welcome to</h6> <br/>
{/*           <h1 className='tracking-widest font-extrabold text-4xl text-white font-sans'>San Mateo Senior High School</h1>
 */}          <h3 className='tracking-widest font-extrabold text-6xl text-white font-sans'>RESEARCH DEVELOPMENT CENTER</h3><br/>
          <h3 className='tracking-widest font-extrabold text-5xl text-green-600 font-sans'>RESEARCH CAFE<br></br>CARD CATALOGUE</h3><br/>  
          <p className='tracking-widest font-bold text-6xl text-green-600 font-sans'></p><br/><br/>
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 text-lg font-montserrat'><Link to="/auth">Upload</Link></button> 
            <button className='bg-transparent hover:bg-blue-700 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-lg font-montserrat'><Link to="/home">Get Started</Link></button> 
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage;
