import React, {Component} from 'react';
import Card from "./Card";

const cards = [
    {
        "id": 2,
        "title": "wow new fukcing title123",
        "description": "description2",
        "createdAt": "2019-05-05T12:38:25.843+0000",
        "deadline": "2011-05-05T12:30:08.633+0000",
        "importance": "vital",
        "completed": false,
    },
    {
        "id": 4,
        "title": "title3",
        "description": "description4\n",
        "createdAt": "2019-05-05T13:28:07.934+0000",
        "deadline": "1938-05-05T12:30:08.633+0000",
        "importance": "important",
        "completed": false,
    },
    {
        "id": 3,
        "title": "title3",
        "description": "description3",
        "createdAt": "2019-05-05T13:16:23.396+0000",
        "deadline": "0001-05-05T13:30:08.633+0000",
        "importance": "standard",
        "completed": false,
    },
    {
        "id": 1,
        "title": "titleX",
        "description": "description1",
        "createdAt": "2019-05-05T12:34:45.399+0000",
        "deadline": "2019-05-05T12:34:45.397+0000",
        "importance": "standard",
        "completed": false,
    }
]

class Home extends Component {
    render() {
        return (

            <>
                <h1>Cards</h1>
                <div> {cards.map(card => <Card card={card}/>)}</div>
            </>
        )
    }
}



export default Home;