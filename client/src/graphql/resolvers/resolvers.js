export const resolveAddStarMutation = mutationResult => state => {
    const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
    const { totalCount } = state.organization.repository.stargazers
    console.log("mutation result", mutationResult)

    return {
      ...state, 
      organization: {
        ...state.organization,
        repository: {
          ...state.organization.repository,
          viewerHasStarred,
          stargazers: {
            totalCount: totalCount + 1,
          }
        }
      }
    }
  };

  export const resolveIssuesQuery = (queryResult, cursor) => state => {
    const { data, errors } = queryResult.data;
  
    if(!cursor) {
      return {
        organization: data.organization,
        errors,
      };
    }
    const { edges: oldIssues } = state.organization.repository.issues;
    const { edges: newIssues } = data.organization.repository.issues;
    const updatedIssues = [...oldIssues, ...newIssues];
  
    return {
      organization: {
        ...data.organization,
        repository: {
          ...data.organization.repository,
          issues: {
            ...data.organization.repository.issues,
            edges: updatedIssues,
          },
        },
      },
      errors,
    };
  };

  export const resolveRemoveStarMutation = mutationResult => state => {
    const { viewerHasStarred } = mutationResult.data.data.removeStar.starrable
    const { totalCount } = state.organization.repository.stargazers

    return {
      ...state,
      organization: {
        ...state.organization,
        repository: {
          ...state.organization.repository,
          viewerHasStarred,
          totalCount: totalCount - 1,
        }
      }
    }
  }