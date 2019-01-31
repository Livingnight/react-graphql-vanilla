import React, { Component } from 'react';
import axios from 'axios';
import Form from './Components/form/form';
import Organization from './Components/organization/organization';

const Title = `React GraphQL Github Client`
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
})


const GET_ISSUES_OF_REPO = `
  query (
    $organization: String!, 
    $repository: String!
    $cursor: String
  ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions (last: 3){
                edges {
                  node {
                    id 
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            
          }
        }
      }
    }
  }
`;

const getIssuesOfRepo = (path, cursor) => {
  const [ organization, repository ] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPO,
    variables: {organization, repository, cursor}
  })}

const resolveIssuesQuery = queryResult => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors
})

class App extends Component {
  state = {
    path: `the-road-to-learn-react/the-road-to-learn-react`,
    organization: null,
    errors: null
  };
  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  };
  onChange = event => {
    this.setState({ path: event.target.value });
  }

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path)
    event.preventDefault();
  }
  
  onFetchFromGitHub = (path, cursor) => {
    getIssuesOfRepo(path, cursor).then( queryResult => {
      console.log(queryResult);
      this.setState(resolveIssuesQuery(queryResult, cursor))
    })
    
  }

  onFetchMoreIssues = () => {
    const { 
      endCursor 
    } = this.state.organization.repository.issues.cursor;

    this.onFetchFromGitHub(this.state.path, endCursor)
  };

  render() {
    const { organization, errors, path } = this.state;
    return (
      <div>
        <h1>{Title}</h1>
        <Form 
          path={path}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        {organization ? (
        <Organization 
        organization={organization} 
        errors={errors}
        onFetchMoreIssues={this.onFetchMoreIssues}
        />
        ) : (
          <p> No information yet... </p>
        )
        }

      </div>
    );
  }
}

export default App;
