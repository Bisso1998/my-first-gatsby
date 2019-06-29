import React, { Component } from "react"
// import { graphql } from "gatsby"
import axios from "axios"
import Layout from "../components/layout"

class FetchGithubInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            company: null,
            loading: false,
        }
      }
      componentDidMount() {
        this.fetchGitHubInfo()
      }

      fetchGitHubInfo = () => {
          console.log("Fetching data...");
        this.setState({ loading: true })
        axios
          .get(`https://api.github.com/users/mshwery`)
          .then(data => {
            console.log(data);
            this.setState({
              loading: false,
              username: data.data.name,
              company: data.data.company
            })
          })
          .catch(error => {
            this.setState({ loading: false, error })
          })
        }

        render() {
            return(
                <Layout>
                    <h1>Github Hero is here</h1>
                    {
                        this.state.loading ? (
                            <p>Fetching data from github...</p>
                        ) : (
                            <h2>{this.state.username} works at {this.state.company}</h2>
                        )
                    }
                    <button onClick={ this.fetchGitHubInfo }>Fetch Data now</button>
                </Layout>
            )

        }
}

export default FetchGithubInfo
