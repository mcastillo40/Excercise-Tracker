import React from "react";
import Workout from "./Workout";
import EditWorkout from "./EditWorkout"

export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleRemoveAll() {
    let table = this.props.table;

    let request = new Request(`http://localhost:5000/api/delete-all/${table}`, {
      method: "DELETE"
    });

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(() => {
        this.props.deleteAll();
      })
      .catch(err => {
        return err;
      });
  }

  handleRemove(id) {
    let request = new Request(
      `http://localhost:5000/api/delete-item/${id}`,
      {
        method: "DELETE"
      }
    );

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(() => {
          console.log("item: ", id)
        this.props.deleteItem(id);
      })
      .catch(err => {
        console.log("this: ", err);
        return err;
      });
  }

  handleEdit(current) {
    console.log("Edit Select", current);
  }

  render() {
    return (
      <div className="center container col-sm-4">
        <div className="row center" id="headLine">
          <div className="col-sm-5 increaseFont"> WORKOUTS </div>
          <div className="col-sm-1"> </div>
          <div className="col-sm-1"> </div>
          <div className="col-sm-5">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={!this.props.hasOptions}
              onClick={this.handleRemoveAll}
            >
              Remove All
            </button>
          </div>
        </div>
        {this.props.workouts.map(workout => (
          <Workout
            key={workout.id}
            workoutInfo={workout}
            handleRemove={this.handleRemove}
            handleEdit={this.handleEdit}
          />
        ))}
      </div>
    );
  }
}
