import React, {Component} from 'react';
import {Card as CardR, Button, CardHeader, CardFooter, CardBody, CardText} from 'reactstrap';

class Card extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            ...this.props.card,
            isEdit: false,
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

    deleteCard(){
        //todo
}

    archiveCard(){
        //todo
    }

    saveChanges(){
        //todo
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
            <div className="col-4 mt-2">
                <CardR>
                    <CardHeader className={this.getImportanceClass(card.importance)}>
                        {this.state.isEdit ?
                            <input type="text" value={this.state.title} className="w-100"
                                   onChange={(e) => this.setState({
                                           title: e.target.value
                                   })}/> : card.title}
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            {this.state.isEdit ?
                                <textarea className="w-100" value={this.state.description}
                                          onChange={(e) => this.setState({
                                                  description: e.target.value
                                          })
                                          }></textarea> :
                                card.description}
                        </CardText>
                        {this.state.isEdit ?
                            <>
                                <Button className="bg-danger" onClick={()=> this.setState({
                                    isEdit: false
                                })}>
                                    Cancel
                                </Button>
                                <Button className="float-right bg-success" onClick={this.saveChanges()}>
                                    Save
                                </Button>
                            </> :
                            <>
                                <Button className="mr-3 bg-success" onClick={this.archiveCard()}>
                                    To complete
                                </Button>
                                < Button className="bg-danger" onClick={this.deleteCard()}>
                                    Delete
                                </Button>
                                <Button className="float-right bg-primary"  onClick={()=>this.setState({
                                    isEdit : true
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