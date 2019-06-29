import React from "react"
import Header from '../components/header'
import Layout from "../components/layout"
import { graphql } from "gatsby"

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }`

export default ({data}) => (
  <Layout>
      <div style={{ color: `teal` }}>
  <Header headerText="I am Bisso"/>
    <h1>Here goes my profile {data.site.siteMetadata.title}</h1>
    <p>Such wow. Very React.</p>
  </div>
  </Layout>
)