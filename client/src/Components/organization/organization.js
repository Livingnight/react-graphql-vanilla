import React from 'react';
import Repository from '../Repository/repository';

const Organization = props => {
    if(props.errors){
        return(
            <div>
                <p>
                    <strong>Something Went Wrong:</strong>
                </p>
                {props.errors.map(error => error.message).join(' ')}
           </div>
        )
    }
    return (
        <div>
            <p>
                <strong>Issues from the organization:</strong>
            </p>
            <a href={props.organization.url}>{props.organization.name}</a>
            <Repository 
                repository={props.organization.repository}
                onFetchMoreIssues={props.onFetchMoreIssues}
                onStarRepository={props.onStarRepository}
                />
        </div>
    )
    
}

export default Organization;