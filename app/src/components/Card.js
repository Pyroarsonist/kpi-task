import React, {Component} from 'react';
import {Card as CardR, Button, CardHeader, CardFooter, CardBody, CardText, Input} from 'reactstrap';
import cx from 'classnames'

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.card,
            isEdit: this.props.isCreating,
        }
    }


    getImportanceClass(importance) {
        switch (importance) {
            case "standard" :
                return 'bg-primary';
            case "important" :
                return 'bg-warning';
            case "vital" :
                return 'bg-danger';
            default:
                return 'bg-secondary'
        }
    }

    saveChanges = async () => {
        try {
            const card = {
                deadline: this.state.deadline,
                id: this.state.id,
                description: this.state.description,
                importance: this.state.importance,
                title: this.state.title
            }
            await fetch('/api/tasks/edit/', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(card)
            })
            this.setState({isEdit: false})
            await this.props.refetch()
        } catch (e) {
            console.error(e)
        }
    }

    archiveCard = async () => {
        try {
            const card = {
                id: this.state.id,
                completed: true,
            }
            await fetch('/api/tasks/edit/', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(card)
            })
            this.setState({isEdit: false})
            await this.props.refetch()
        } catch (e) {
            console.error(e)
        }
    }


    render() {
        const {card} = this.props;
        const date = new Date(Date.parse(card.deadline))
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        return (
            <div className={cx('mt-2', this.props.isCreating ? "col-12" : "col-4")}>
                <CardR>
                    <CardHeader className={this.getImportanceClass(card.importance)}>
                        {this.state.isEdit ?
                            <Input type="text" placeholder='Title' value={this.state.title} className="w-100"
                                   onChange={(e) => this.setState({
                                       title: e.target.value
                                   })}/> : card.title}
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            {this.state.isEdit ?
                                <textarea className="w-100 form-control" value={this.state.description}
                                          placeholder='Description'
                                          onChange={(e) => this.setState({
                                              description: e.target.value
                                          })
                                          }></textarea> :
                                card.description}
                        </CardText>
                        {this.props.isCreating &&
                        <select value={this.state.value} onChange={(e) => this.setState({
                            importance: e.target.value
                        })} className="form-control">
                            <option value="standard">Standard</option>
                            <option value="important">Important</option>
                            <option value="vital">Vital</option>
                        </select>


                        }
                        {this.state.isEdit ?
                            <>
                                {!this.props.isCreating && <><Button className="bg-danger"
                                                                     onClick={() => this.setState({
                                                                         isEdit: false
                                                                     })}>
                                    Cancel
                                </Button>
                                    <Button className="float-right bg-success" onClick={this.saveChanges}>
                                        Save
                                    </Button></>}
                            </> :
                            <>
                                <Button className="mr-3 bg-success" onClick={this.archiveCard}>
                                    Archive
                                </Button>
                                <Button className="float-right bg-primary" onClick={() => this.setState({
                                    isEdit: true
                                })}>
                                    Edit
                                </Button>
                            </>
                        }
                    </CardBody>
                    <CardFooter className="text-muted">
                        {date.toLocaleString('en-US', dateOptions)}
                    </CardFooter>
                </CardR>
            </div>
        )
    }
}

export default Card;