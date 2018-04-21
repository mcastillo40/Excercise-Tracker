import React from "react";


export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name_valid: false,
      rep_valid: false,
      weight_valid: false,
      lbs_valid: false,
      date_valid: false,
      formValid: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.workoutSubmit = this.workoutSubmit.bind(this);
  }

  workoutSubmit(e) {
    e.preventDefault();

    let data = {};
    
    console.log("NUM: ", this.refs.name.value);
    
  }

  handleUserInput(e) { }

  render() {
    return (
      <div>
        <form 
            className="col-sm-4" 
            id="addWorkout" 
            onSubmit={this.state.workoutSubmit}
            ref="workoutForm"
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              refs="name"
              placeholder="Workout Name"
              onChange={event => this.handleUserInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={this.state.reps}
              refs="reps"
              placeholder="Number of Reps"
              onChange={event => this.handleUserInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={this.state.weight}
              refs="weight"
              placeholder="Weight"
              onChange={event => this.handleUserInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              value={this.state.lbs}
              refs="lbs"
              placeholder="Enter 1 for lbs or 0 for kgs"
              onChange={event => this.handleUserInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.date}
              refs="date"
              placeholder="Date: YYYY-MM-DD"
              onChange={event => this.handleUserInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-dark col-sm-12 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
