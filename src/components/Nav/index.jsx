import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  
  const [showSearch, toggleSearchVisibility] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link className="navbar-brand" to="/home" onClick={()=>{toggleSearchVisibility(false)}}>Geek Finds</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home" onClick={()=>{toggleSearchVisibility(false)}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin" onClick={()=>{toggleSearchVisibility(true)}}>Admin</Link>
            </li>
          </ul>
          {
            !showSearch ?
            <></>
            :
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          }
        </div>
      </nav>
  )
}

export default Nav;