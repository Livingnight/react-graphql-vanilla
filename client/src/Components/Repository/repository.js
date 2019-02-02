import React from 'react';

const Repository = props => (
    
    <div>
        <p>
            <strong>In Repository:</strong>
            <a href={props.repository.url}> {props.repository.name} </a>
        </p>
        <ul>
            {console.log(props.repository.issues.edges)}
            {props.repository.issues.edges.map(issue => (
                <li key={issue.node.id}>
                    <a href={issue.node.url}>{issue.node.title}</a>

                    <ul>
                       {issue.node.reactions.edges.map( reaction => (
                           <li key={reaction.node.id}>{reaction.node.content}</li>
                       ))} 
                    </ul>
                </li>
            ))}
        </ul>
        {props.repository.issues.pageInfo.hasNextPage && (
            <button onClick={props.onFetchMoreIssues}>More</button>
        )}
        <button
            type="button"
            onClick={ () => props.onStarRepository(props.repository.id, props.repository.viewerHasStarred)}
        >
            {props.repository.stargazers.totalCount}
            {props.repository.viewerHasStarred ? 'Unstar' : 'Star' }
        </button>
        
    </div>
)

export default Repository;