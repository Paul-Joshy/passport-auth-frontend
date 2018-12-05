import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
            <Link className="navbar-brand" to="/">CodeWorkr API Auth</Link>
    
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    {/* <a href="/dashboard" className="nav-link"> Dashboard</a> */}
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              </ul>
    
              <ul className="nav navbar-nav ml-auto">
                { !this.props.isAuth ?
                  [<li className="nav-item" key="signup">
                    {/* <a className="nav-link" href="/signup">Signup</a> */}
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>,
                  <li className="nav-item" key="signin">
                    {/* <a className="nav-link" href="signin">Signin</a> */}
                    <Link className="nav-link" to="/signin">Sign In</Link>
                  </li>] : null }
                
                { this.props.isAuth ?
                  <li className="nav-item">
                    <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
                  </li> : null }
              </ul>
            </div>
          </nav>
        );
    }
}
