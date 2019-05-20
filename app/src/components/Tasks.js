import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Task from './Task';
import { removeUsername } from '../actions';
import { logout } from '../tools';

class Tasks extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    removeUserName: PropTypes.func.isRequired,
    archived: PropTypes.bool,
  };

  static defaultProps = {
    archived: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tasks: [],
      modalIsOpen: false,
    };

    this.createdTask = React.createRef();
  }

  async componentDidMount() {
    await this.refetch();
  }

  refetch = async () => {
    try {
      this.setState({ loading: true });
      const url = this.props.archived ? '/api/tasks/archive/' : '/api/tasks/';
      const data = await fetch(url, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (data.ok) {
        const tasks = await data.json();
        this.setState({ tasks });
      } else {
        await this.logout();
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({ loading: false });
  };

  logout = async () => {
    this.props.removeUserName();
    await logout();
    this.props.history.push('/');
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  getDefaultCard = () => {
    return {
      title: '',
      description: '',
      deadline: new Date().toISOString(),
      importance: 'standard',
      completedAt: null,
    };
  };

  saveCard = async () => {
    const { state: cardFromState } = this.createdTask;
    try {
      const card = {
        deadline: cardFromState.deadline.toISOString(),
        description: cardFromState.description,
        importance: cardFromState.importance,
        title: cardFromState.title,
      };
      await fetch('/api/tasks/create/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(card),
      });
    } catch (e) {
      console.error(e);
    }
    this.closeModal();
    await this.refetch();
  };

    getTasks = () => {
        if (this.state.loading)
            return (
                <div className="row align-items-center h-50 justify-content-center">
                    <div className="text-center col-3 mt-5">
                        <h2 className="h3 mb-3 font-weight-normal">
              <span className="ml-3">
                Loading <i className="fa fa-spinner fa-pulse fa-fw" />
              </span>
                        </h2>
                    </div>
                </div>
            );
        return this.state.tasks.length ? (
            <div>
                <div className="row pt-3">
                    <div className="col-4 text-center">
                        <h3>Vital</h3>
                    </div>
                    <div className="col-4 text-center">
                        <h3>Important</h3>
                    </div>
                    <div className="col-4 text-center">
                        <h3>Standard</h3>
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
            </div>
        ) : (
            <div className='row align-items-center h-50 justify-content-center'>
                <div className="text-center col-3 mt-5">
                    <h2 className="h3 mb-3 font-weight-normal">No tasks available</h2>
                </div>
            </div>
        );
    };

    getTitleAndModal = () => {
        return (
            <div style={{backgroundColor: '#455a64', color: "white"}} className='row pt-1'>
                <h1 style={{color: ''}} className='ml-3 pt-1'>{this.props.archived ? 'Archive' : 'Tasks'}</h1>
                <div className="ml-auto mr-5 mt-1">
                    {this.props.archived || <button className="btn btn-outline-light btn-lg" onClick={this.openModal}>Add task</button>}
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
        );
    };

    render() {
        return (
            <div>
                    {this.getTitleAndModal()}
                {this.getTasks()}
            </div>
        );
    }


}

const mapDispatchToProps = dispatch => {
  return {
    removeUserName: () => {
      dispatch(removeUsername());
    },
  };
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Tasks);
