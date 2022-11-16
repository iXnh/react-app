import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <React.Fragment>
            <div className="navbar nabar-dark bg-dark navbar-expand-sm">
                <div className="container"> 
                    <Link to={`/`} className="navbar-brand text-light">
                     <i className='fa fa-mobile text-primary'/> E-KTP Management </Link>
                </div>
            </div>
        </React.Fragment>
    )
};

export default NavBar;