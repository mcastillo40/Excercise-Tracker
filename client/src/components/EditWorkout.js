import React from "react";
import ReactModal from "react-modal";
import { validateDate } from "../../public/js-helper/validatedate";

export default class EditWorkout extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      lbs_valid: true,
      date_valid: true
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.editInfoSubmit = this.editInfoSubmit.bind(this);
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

    // Validate that 1 for Lbs was entered or 0 for Kgs was entered
    if (data.lbs > 1 || data.lbs < 0 || data.lbs == "") {
      this.state.lbs_valid = false;
    }

    // Validate that date was inputted correctly
    if (!validateDate(data.date)) this.state.date_valid = false;

    if (this.state.lbs_valid && this.state.date_valid) {
      let request = new Request("http://localhost:5000/update", {
        method: "PUT",
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
              let updatedWorkout = data.find(updatedWorkout => {
                return updatedWorkout.id === workoutId;
              });

              this.props.editItem(updatedWorkout);
            });
        })
        .catch(err => {
          return err;
        });
      this.handleCloseModal();
    } else {
      if (!this.state.lbs_valid && !this.state.date_valid)
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
        <button className="btn" onClick={this.handleOpenModal}>
          Edit
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="modalStyle"
        >
          <form
            className="col-sm-8"
            id="addWorkout"
            onSubmit={this.editInfoSubmit}
            ref="workoutForm"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                defaultValue={this.props.workoutInfo.name}
                ref="name"
                name="name"
                placeholder={`Name: ${this.props.workoutInfo.name}`}
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
                required
              />

            </div>
            <div className="form-group has-error has-feedback">
                <div className="col-sm-10 has-error">
                    <input type="text" className="form-control has-success" id="inputError" />
                    <span className="glyphicon glyphicon-remove form-control-feedback"></span>
                </div>
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
