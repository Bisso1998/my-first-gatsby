import React from "react"
// import { Link } from "gatsby"
import 'bootstrap/dist/css/bootstrap.css';
// import { Row, Col } from 'reactstrap';
import Header from './header'
export default ({ children }) => (
 <div>
    <Header/>
  <div style={{ marginTop: `4rem `, maxWidth: '100%', paddingLeft: `1rem` ,paddingRight: '1rem',  }}>
 
    {children}
  </div>
 </div>
)