import React, {Component} from 'react';
import Card from "./Card";


class Tasks extends Component {




    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }
    }

    async componentDidMount() {
        try {
            const url = this.props.archived ? '/api/tasks/archive/' : '/api/tasks/'
            const data = await fetch(url, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
            })
            if (data.ok) {
                const cards = await data.json()
                this.setState({cards})
            } else {
                this.setState({error: true})
            }
        } catch (e) {
            console.error(e)
        }
    }

    addTask=()=>{
        //delaem

    }

    render() {
        return (
            <>
                <div className='row'>
                <h1>Tasks</h1>
                    <button className="float-right" onClick={this.addTask}>Add task</button>
                </div>
                {this.state.cards.length ? <div
                    className="d-flex flex-wrap align-content-around"> {this.state.cards.map(card =>
                    <Card card={card} key={card.id}/>)}</div> : <div> No tasks available</div>}

            </>
        )
    }
}


export default Tasks;
