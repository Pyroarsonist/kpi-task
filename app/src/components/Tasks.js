import React, {Component} from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {removeUsername} from "../actions";
import {compose} from "redux";
import Card from "./Card";
import {logout} from "../tools";


class Tasks extends Component {


    constructor(props) {
        super(props)

        this.state = {
            cards: [],
            modalIsOpen: false
        }
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }


    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    logout = async ()=>{
        this.props.removeUserName()
        await logout();
        this.props.history.push("/");
    }

    refetch = async () => {
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
                await this.logout()
            }
        } catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
        await this.refetch()
    }

    getDefaultCard = () => {
        return {
            "title": "",
            "description": "",
            "deadline": new Date(),
            "importance": "standard",
            "completedAt": null,
        }
    }

    saveCard = async () => {
        const {state: cardFromState} = this.refs.createdCard;
        try {
            const card = {
                deadline: cardFromState.deadline.toISOString(),
                description: cardFromState.description,
                importance: cardFromState.importance,
                title: cardFromState.title
            }
            await fetch('/api/tasks/create/', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(card)
            })
        } catch (e) {
            console.error(e)
        }
        this.closeModal()
        await this.refetch()
    }


    render() {
        return (
            <>
                <div style={{backgroundColor: 'rgba(178, 178, 178, 0.9)'}} className='row pt-1'>
                    <h1 style={{color: ''}} className='pl-3 pt-1'>TASKS</h1>
                    <div className="ml-auto pr-5 mt-1">
                        <button className="btn btn-outline-primary btn-lg" onClick={this.openModal}>Add task</button>
                    </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                        >
                            <ModalHeader>
                                <div>Creating new task</div>
                            </ModalHeader>
                            <ModalBody>
                                <div className='container-fluid'>
                                    <Card card={this.getDefaultCard()} ref="createdCard" isCreating/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-secondary" onClick={this.closeModal}>
                                    Close
                                </button>
                                <button className="btn-primary btn" onClick={this.saveCard}>
                                    Save Changes
                                </button>
                            </ModalFooter>

                        </Modal>
                </div>
                {this.state.cards.length ?
                    <div>
                        <div className="row pt-3">
                            <div className="col-4 text-center">
                                <h3>VITAL TASKS</h3>
                            </div>
                            <div className="col-4 text-center">
                                <h3>IMPORTANT TASKS</h3>
                            </div>
                            <div className="col-4 text-center">
                                <h3>STANDART TASKS</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                        {this.state.cards.filter((card) => card.importance === "vital").map(card =>
                    <Card card={card} key={card.id} refetch={this.refetch}/>)}
                    </div>
                            <div className="col-4">
                                {this.state.cards.filter((card) => card.importance === "important").map(card =>
                                    <Card card={card} key={card.id} refetch={this.refetch}/>)}
                            </div>
                            <div className="col-4">
                                {this.state.cards.filter((card) => card.importance === "standard").map(card =>
                                    <Card card={card} key={card.id} refetch={this.refetch}/>)}
                            </div>
                        </div>
                    </div>:
                    <div className='row align-items-center h-50 justify-content-center'>
                        <div className="text-center col-3 mt-5">
                            <h2 className="h3 mb-3 font-weight-normal">No tasks available</h2>
                        </div>
                    </div>}

            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        removeUserName: () => {
            dispatch(removeUsername())
        }
    }
}


export default compose(withRouter, connect(
    null,
    mapDispatchToProps
))(Tasks)
