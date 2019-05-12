import React, {Component} from 'react';
import {Card as CardR, Button, CardHeader, CardFooter, CardBody, CardText} from 'reactstrap';
//import cx from 'classnames'

class Card extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

    render() {
        const {card} = this.props;
        return(
            <div className="col-4 mt-2">
        <CardR>
            <CardHeader className={this.getImportanceClass(card.importance)}>{card.title}</CardHeader>
            <CardBody>
                <CardText>{card.description}</CardText>
                <Button>Выполнено</Button>
            </CardBody>
            <CardFooter className="text-muted">{card.deadline}</CardFooter>
        </CardR>
            </div>
        )
    }
}

export default Card;