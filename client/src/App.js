import React, { Component } from 'react';
import axios from 'axios';
import Form from './Components/form/form';
import Organization from './Components/organization/organization';
import { GET_ISSUES_OF_REPO } from './graphql/queries'
import { ADD_STAR, REMOVE_STAR } from './graphql/mutations';
import { resolveAddStarMutation, resolveIssuesQuery, resolveRemoveStarMutation } from './graphql/resolvers';

const Title = `React GraphQL Github Client`
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
})

const getIssuesOfRepo = (path, cursor) => {
  const [ organization, repository ] = path.split('/');

  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPO,
    variables: {organization, repository, cursor}
  })}

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
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    
    this.onFetchFromGitHub(this.state.path, endCursor)
  };

  addStarToRepository = repositoryId => {
    return axiosGitHubGraphQL.post('', {
      query: ADD_STAR,
      variables: {repositoryId},
    })
  }

  removeStarFromRepo = repositoryId => {
    return axiosGitHubGraphQL.post('', {
      query: REMOVE_STAR,
      variables: {repositoryId}
    })
  }

  onStarRepository = (repositoryId, viewerHasStarred) => {
    if(viewerHasStarred){
      console.log("viewerHasStarred: ", viewerHasStarred, "removing")
      this.removeStarFromRepo(repositoryId).then( mutationResult => {
        console.log("removing star!")
        this.setState(resolveRemoveStarMutation(mutationResult))
      })
    }
    else{
      console.log("viewerHasStarred: ", viewerHasStarred, "adding")
      this.addStarToRepository(repositoryId).then(
        mutationResult => {
        console.log("made it this far!")

        this.setState(resolveAddStarMutation(mutationResult))
      });
    }
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
        onStarRepository={this.onStarRepository}
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
