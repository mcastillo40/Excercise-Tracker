import React from "react";
import ReactModal from "react-modal";

export default class EditWorkout extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      lbs_valid: false,
      date_valid: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editInfoSubmit = this.editInfoSubmit.bind(this);
    this.handleDateInput = this.handleDateInput.bind(this);
    this.handleTypeInput = this.handleTypeInput.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  editInfoSubmit(e) {
    e.preventDefault();

    let workoutId = this.props.workoutInfo.id;

    let data = {
      id: JSON.stringify(workoutId),
      name: this.refs.name.value.trim(),
      reps: this.refs.reps.value,
      weight: this.refs.weight.value,
      lbs: this.refs.lbs.value,
      date: this.refs.date.value
    };

    console.log("data: ", data);

    let request = new Request("http://localhost:5000/update", {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(data)
    });

    let self = this;

    fetch(request)
      .then(response => {
        return response.json()
        .then(() => {
            return fetch("http://localhost:5000/workouts")
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("here");
            let updatedWorkout = data.find(updatedWorkout => {
                return updatedWorkout.id === workoutId
            });

            this.props.handleEdit(updatedWorkout);
        })
      })
      .catch(err => {
        return err;
      });

      //this.props.handleEdit(workoutId);

      this.handleCloseModal();
  }

  handleDateInput(e) {}

  handleTypeInput(e) {
    if (e.target.value == "") this.state.lbs_valid = false;
    else if (e.target.value == 0 || e.target.value == 1)
      this.state.lbs_valid = true;
    else this.state.lbs_valid = false;
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={this.handleOpenModal}>
          Edit
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
        >
          <form
            className="col-sm-4"
            id="addWorkout"
            onSubmit={this.editInfoSubmit}
            ref="workoutForm"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder={`Name: ${this.props.workoutInfo.name}`}
                defaultValue={this.props.workoutInfo.name}
                ref="name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                defaultValue={this.props.workoutInfo.reps}
                ref="reps"
                placeholder={`Reps: ${this.props.workoutInfo.reps}`}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                defaultValue={this.props.workoutInfo.weight}
                ref="weight"
                placeholder={`Weight: ${this.props.workoutInfo.weight}`}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                defaultValue={this.props.workoutInfo.lbs ? 1 : 0}
                ref="lbs"
                placeholder={
                  this.props.workoutInfo.lbs
                    ? "Lbs (Enter 0 for Kgs)"
                    : "Kgs (Enter 1 for Lbs)"
                }
                onChange={event => this.handleTypeInput(event)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.workoutInfo.date}
                ref="date"
                placeholder={`Date: ${this.props.workoutInfo.date}`}
                onChange={event => this.handleDateInput(event)}
                required
              />
            </div>
            <div className="form-group">
              <span className="col-sm-1" />
              <button className="btn btn-primary col-sm-5">Submit</button>
              <span className="col-sm-1" />
              <button
                className="btn btn-dark col-sm-5"
                onClick={this.handleCloseModal}
              >
                Close
              </button>
              <span className="col-sm-1" />
            </div>
          </form>
        </ReactModal>
      </div>
    );
  }
}
