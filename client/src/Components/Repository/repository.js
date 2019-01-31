import React from 'react';

const Repository = props => (

    <div>
        <p>
            <strong>In Repository:</strong>
            <a href={props.repository.url}> {props.repository.name} </a>
        </p>
        <ul>
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
        <button onClick={props.onFetchMoreIssues}>More</button>
    </div>
)

export default Repository;