import React from "react"
import { Link } from "gatsby"

export default ({ children }) => (
  <div style={{ margin: `4rem auto`, maxWidth: '100%', padding: `0 1rem` }}>
  My Sweet Site
  <br/>
  <Link to="/profile/">profile</Link> 
  <br/>
  <Link to="/">home</Link> 
  <br/>
  <Link to="/githubInfo">GithubInfo</Link> 


    {children}
  </div>
)