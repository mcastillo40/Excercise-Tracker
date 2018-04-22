import React from "react";
import { validateDate } from "../../public/js-helper/validatedate";

export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lbs_valid: true,
      date_valid: true
    };

    this.workoutSubmit = this.workoutSubmit.bind(this);
  }

  workoutSubmit(e) {
    e.preventDefault();

    let data = {
      name: this.refs.name.value.trim(),
      reps: this.refs.reps.value,
      weight: this.refs.weight.value,
      lbs: this.refs.lbs.value,
      date: this.refs.date.value
    };

    // Validate that 1 for Lbs was entered or 0 for Kgs was entered
    if (data.lbs > 1 || data.lbs < 0 || data.lbs == "") {
      this.state.lbs_valid = false; 
    }
    
    // Validate that date was inputted correctly
    if(!validateDate(data.date))
      this.state.date_valid = false;

    if (this.state.lbs_valid && this.state.date_valid) {
      // Initialize request data
      let request = new Request("http://localhost:5000/new-workout", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(data)
      });

      let self = this;

      fetch(request)
        .then(response => {
          return response
            .json()
            .then(() => {
              return fetch("http://localhost:5000/workouts");
            })
            .then(response => {
              return response.json();
            })
            .then(data => {
              let lastItemLength = data.length - 1;
              let lastItem = data[lastItemLength];

              // Add item that was just placed into the database
              self.props.addItem(lastItem);
            });
        })
        .catch(err => {
          return err;
        });

      // Change values to empty
      this.refs.name.value = "";
      this.refs.reps.value = "";
      this.refs.weight.value = "";
      this.refs.lbs.value = "";
      this.refs.date.value = "";
    }
    else {
      if(!this.state.lbs_valid && !this.state.date_valid)
        alert("Error: Type of weight and date format are incorrect");
      else if (!this.state.date_valid)
        alert("Error: Date format should be MM-DD-YYYY");
      else if (!this.state.lbs_valid)
        alert("Error: Type of weight should be '1' for lbs or '0' for kgs");
    }
  }

  render() {
    return (
      <div>
        <form
          className="col-sm-4"
          id="addWorkout"
          onSubmit={this.workoutSubmit}
          ref="workoutForm"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref="name"
              name="name"
              placeholder="Workout Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={this.state.reps}
              ref="reps"
              name="reps"
              placeholder="Number of Reps"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={this.state.weight}
              ref="weight"
              name="weight"
              placeholder="Weight"
              required
            />
          </div>
          <div className="form-group">
            <input
              id="weightType"
              type="number"
              className="form-control"
              value={this.state.lbs}
              ref="lbs"
              name="lbs"
              placeholder="Enter 1 for lbs or 0 for kgs"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.date}
              ref="date"
              name="date"
              placeholder="Date: MM-DD-YYYY"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary col-sm-12">Add Workout</button>
          </div>
        </form>
      </div>
    );
  }
}
