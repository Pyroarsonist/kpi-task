import React, {Component} from 'react';
import {Card as CardR, Button, CardHeader, CardFooter, CardBody, CardText, Input} from 'reactstrap';
import cx from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'

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

    getDate = () => {
        const date = new Date(Date.parse(this.state.deadline))
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
        return date.toLocaleString('en-US', dateOptions)
    }


    render() {
        const {card} = this.props;

        return (
            <div className={cx('mt-2 mb-3', this.props.isCreating ? "col-12" : "col-4")}>
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
                        {this.state.isEdit &&
                        <select value={this.state.importance} onChange={(e) => this.setState({
                            importance: e.target.value
                        })} className={cx("form-control", !this.props.isCreating && 'mb-4')}>
                            <option value="standard">Standard</option>
                            <option value="important">Important</option>
                            <option value="vital">Vital</option>
                        </select>


                        }
                        {this.state.completed ? <></> :
                         this.state.isEdit ?
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
                        {this.state.isEdit ? <div className='container-fluid'>
                            <DatePicker
                                className="form-control"
                                selected={new Date(this.state.deadline)}
                                onChange={val =>
                                    this.setState({deadline: val})
                                }
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                            />


                        </div> : this.getDate()}
                    </CardFooter>
                </CardR>
            </div>
        )
    }
}

export default Card;