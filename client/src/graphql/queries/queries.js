export const GET_ISSUES_OF_REPO = `
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
        id
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 3, after: $cursor, states: [OPEN]) {
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

 