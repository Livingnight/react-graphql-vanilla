import React from 'react';

const Form = props => (
    <form onSubmit={props.onSubmit}>
        <label htmlFor='url'>
            Show open issues for https://github.com/
        </label>
        <input
            id='url'
            type='text'
            onChange={props.onChange}
            style={{ width: '300px' }}
        />
        <button type='submit'>Search</button>

        <hr />

    </form>
)

export default Form;