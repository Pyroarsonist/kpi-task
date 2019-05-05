import React, {Component} from 'react';
import {Card, Button, CardHeader, CardFooter, CardBody, CardText} from 'reactstrap';
import cx from 'classnames'

class Card extends Component {

    constructor(props) {
        super(props)
        this.state = {
            completed: this.props.completed
        }
    }

    getImportanceClass() {
        switch (this.props.importance) {
            case "standard" :
                return 'bg-primary'
            case "important" :
                return 'bg-warning'
            case "vital" :
                return 'bg-danger'
            default:
                return 'bg-secondary'
        }
    }

    render() {
        const {card} = this.props;
        return(
        <Card>
            <CardHeader className={cx(this.getImportanceClass())}>{card.title}</CardHeader>
            <CardBody>
                <CardText>{card.text}</CardText>
                <Button>Выполнено</Button>
            </CardBody>
            <CardFooter className="text-muted">{card.deadline}</CardFooter>
        </Card>
        )
    }
}

export default Card;