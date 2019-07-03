import React from 'react'


const Suggestions = (props) => {
    const option = props.results.map(r =>(
        <li key = {r.id} className = "searchResults">
            {r.card_name}
        </li>
))
    return <ul>{option}</ul>
}

export default Suggestions;