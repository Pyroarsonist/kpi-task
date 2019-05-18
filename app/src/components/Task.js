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
        return 'rgba(204, 204, 204, 0.7)';
      case 'important':
        return 'rgba(255, 255, 0, 0.7)';
      case 'vital':
        return 'rgba(255, 0, 0, 0.7)';
      default:
        return 'rgba(255, 255, 255, 1)';
    }
  };

  saveChanges = async () => {
    try {
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
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleString('en-US', dateOptions);
  };

  render() {
    const { task } = this.props;

    return (
      <div
        className={cx('mt-2 mb-3', this.props.isCreating ? 'col-12' : 'col-4')}
      >
        <Card>
          <CardHeader
            style={{ background: this.getImportanceClass(task.importance) }}
          >
            {this.state.isEdit ? (
              <Input
                type="text"
                placeholder="Title"
                value={this.state.title}
                className="w-100"
                onChange={e =>
                  this.setState({
                    title: e.target.value,
                  })
                }
              />
            ) : (
              task.title
            )}
          </CardHeader>
          <CardBody>
            <CardText>
              {this.state.isEdit ? (
                <textarea
                  className="w-100 form-control"
                  value={this.state.description}
                  placeholder="Description"
                  onChange={e =>
                    this.setState({
                      description: e.target.value,
                    })
                  }
                />
              ) : (
                task.description
              )}
            </CardText>
            {this.state.isEdit && (
              <select
                value={this.state.importance}
                onChange={e =>
                  this.setState({
                    importance: e.target.value,
                  })
                }
                className={cx('form-control', !this.props.isCreating && 'mb-4')}
              >
                <option value="standard">Standard</option>
                <option value="important">Important</option>
                <option value="vital">Vital</option>
              </select>
            )}
            {!this.state.completedAt && this.state.isEdit ? (
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
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline-success mr-3"
                  onClick={this.archiveTask}
                >
                  Archive
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
            )}
          </CardBody>
          <CardFooter className="text-muted">
            {this.state.isEdit ? (
              <div className="container-fluid">
                <DatePicker
                  className="form-control"
                  selected={new Date(this.state.deadline)}
                  onChange={val => this.setState({ deadline: val })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
                />
              </div>
            ) : (
              <div className="row">{this.getDate(this.state.deadline)}</div>
            )}
            {task.completedAt && (
              <div className="row"> {this.getDate(task.completedAt)} </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default Task;
