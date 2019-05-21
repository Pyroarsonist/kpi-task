import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  Input,
} from 'reactstrap';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class Task extends Component {
  static propTypes = {
    refetch: PropTypes.func.isRequired,
    task: PropTypes.shape({
      deadline: PropTypes.string,
      id: PropTypes.number,
      description: PropTypes.string,
      importance: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    isCreating: PropTypes.bool,
  };

  static defaultProps = {
    isCreating: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.props.task,
      isEdit: this.props.isCreating,
    };
  }

  getImportanceClass = importance => {
    switch (importance) {
      case 'standard':
        return { backgroundColor: '#1565c0', color: 'white' };
      case 'important':
        return { backgroundColor: '#f9a825' };
      case 'vital':
        return { backgroundColor: '#b71c1c', color: 'white' };
      default:
        return { backgroundColor: 'lightgray' };
    }
  };

  saveChanges = async () => {
    try {
      if (!this.state.title || !this.state.description)
        throw new Error('No title or description set');
      const task = {
        deadline: this.state.deadline,
        id: this.state.id,
        description: this.state.description,
        importance: this.state.importance,
        title: this.state.title,
      };
      await fetch('/api/tasks/edit/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(task),
      });
      this.setState({ isEdit: false });
      await this.props.refetch();
    } catch (e) {
      console.error(e);
    }
  };

  archiveTask = async () => {
    try {
      const task = {
        id: this.state.id,
        completedAt: new Date().toISOString(),
      };
      await fetch('/api/tasks/edit/', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(task),
      });
      this.setState({ isEdit: false });
      await this.props.refetch();
    } catch (e) {
      console.error(e);
    }
  };

  getDate = time => {
    const date = new Date(Date.parse(time));
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('en-GB', dateOptions);
  };

  getButtons = () => {
    if (this.state.completedAt) return null;
    if (this.state.isEdit)
      return (
        <>
          {!this.props.isCreating && (
            <>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() =>
                  this.setState({
                    isEdit: false,
                  })
                }
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-success float-right"
                onClick={this.saveChanges}
              >
                Save
              </button>
            </>
          )}
        </>
      );
    return (
      <>
        <button
          type="button"
          className="btn btn-outline-success mr-3"
          onClick={this.archiveTask}
        >
          Complete
        </button>
        <button
          type="button"
          className="btn btn-outline-primary float-right"
          onClick={() =>
            this.setState({
              isEdit: true,
            })
          }
        >
          Edit
        </button>
      </>
    );
  };

  selectColorClass = () => {
    switch (this.state.importance) {
      case 'standard':
        return 'border-primary';
      case 'important':
        return 'border-warning';
      case 'vital':
        return 'border-danger';
      default:
        return 'border-primary';
    }
  };

  render() {
    const { task } = this.props;

    return (
      <div className={cx('mt-2 mb-3', task.completedAt ? 'col-4' : 'col-12')}>
        <Card>
          <CardHeader style={this.getImportanceClass(task.importance)}>
            {this.state.isEdit ? (
              <Input
                title="Title"
                type="text"
                placeholder="Title"
                value={this.state.title}
                className={cx(this.state.title ? 'is-valid' : 'is-invalid')}
                onChange={e =>
                  this.setState({
                    title: e.target.value,
                  })
                }
              />
            ) : (
              <span title="Title">{task.title}</span>
            )}
          </CardHeader>
          <CardBody>
            <CardText>
              {this.state.isEdit ? (
                <textarea
                  title="Description"
                  className={cx(
                    this.state.description ? 'is-valid' : 'is-invalid',
                    'form-control',
                  )}
                  value={this.state.description}
                  placeholder="Description"
                  onChange={e =>
                    this.setState({
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                <span title="Description">{task.description}</span>
              )}
            </CardText>
            {this.state.isEdit && (
              <select
                title="Importance"
                value={this.state.importance}
                onChange={e =>
                  this.setState({
                    importance: e.target.value,
                  })
                }
                className={cx(
                  'form-control',
                  !this.props.isCreating && 'mb-4',
                  this.selectColorClass(),
                )}
              >
                <option value="standard">Standard</option>
                <option value="important">Important</option>
                <option value="vital">Vital</option>
              </select>
            )}
            {this.getButtons()}
          </CardBody>
          <CardFooter>
            {this.state.isEdit ? (
              <div className="container-fluid" title="Deadline">
                <DatePicker
                  className="form-control"
                  minDate={new Date()}
                  selected={new Date(this.state.deadline)}
                  onChange={val => this.setState({ deadline: val })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="d MMMM yyyy, H:mm"
                />
              </div>
            ) : (
              <div className="row ml-1 text-info" title="Deadline">
                {this.getDate(task.deadline)}
              </div>
            )}
            {task.completedAt && (
              <div className="row ml-1 text-muted" title="Completed date">
                {this.getDate(task.completedAt)}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Task;
