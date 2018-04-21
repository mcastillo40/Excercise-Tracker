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

    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleTypeInput = this.handleTypeInput.bind(this);
    this.workoutSubmit = this.workoutSubmit.bind(this);
  }

  workoutSubmit(e) {
    e.preventDefault();

    // let data = {
    //     name: this.refs.name.value.trim(),
    //     reps: this.refs.reps.value,
    //     weight: this.refs.weight.value,
    //     lbs: this.refs.lbs.value,
    //     date: this.refs.date.value
    // };

    if (this.state.lbs_valid){

    }
    else{
        alert("Must Enter 0 or 1 for type of weight");
    }

    let data = {
        name: "Test this",
        reps: "12",
        weight: "120",
        lbs: "FALSE",
        date: "1989-10-08"
    };
    
    // Initialize request data
    let request = new Request("http://localhost:5000/api/new-workout", {
        method: "POST",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(data)
    }); 

    let self = this;

    // xmlhttprequest
    fetch(request)
        .then(function(response) {
            return response.json()
            .then(function(data) {
                return fetch("http://localhost:5000/api/workouts")
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                let lastItemLength = data.length - 1;
                let lastItem = data[lastItemLength];
                
                // Add item that was just placed into the database
                self.props.addItem(lastItem);
            })
        })
        .catch(function(err) {
            console.log(err);
        });   
  };

  handleDateInput(e) { };

  handleTypeInput(e) {
    if (e.target.value == "")
        this.state.lbs_valid = false;
    else if (e.target.value == 0 || e.target.value == 1)
        this.state.lbs_valid = true;
    else 
        this.state.lbs_valid = false
  };

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
              value={this.state.name}
              ref="name"
              name="name"
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
              ref="reps"
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
              ref="weight"
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
              ref="lbs"
              placeholder="Enter 1 for lbs or 0 for kgs"
              onChange={event => this.handleTypeInput(event)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={this.state.date}
              ref="date"
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
