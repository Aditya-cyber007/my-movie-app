import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../auth/firebase";



export class Navbar extends Component {
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <Link className="navbar-brand" to="/">Movie-Everytime</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item"><Link className="nav-link" to="/Action">Action</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/Horror">Horror</Link></li>                   
                    <li className="nav-item"><Link className="nav-link" to="/Comedy">Comedy</Link></li>
                     <li className="nav-item"><Link className="nav-link" to="/Adventure">Adventure</Link></li>
                     <li className="nav-item"><Link className="nav-link" to="/Romance">Romance</Link></li>
                     <li className="nav-item"><Link className="nav-link" to="/si-fi">Science-fiction</Link></li>

                
              </ul>
                     <li className="btn btn-outline-info mx-2 "><Link className="nav-link" to="/mylist">My-List</Link></li>
                     <button className='btn btn-outline-warning mx-2' onClick={logout}>Logout</button>
              </div>
          </div>
          </nav>
  </div>
    );
  }
}

export default Navbar;
