import React from "react";
import ReactModal from "react-modal";

export default class EditWorkout extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      workout: []
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
  }

  render() {
    console.log(this.props);
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
                value={this.state.name}
                ref="name"
                name="name"
                placeholder={ `Name: ${this.props.workoutInfo.name}` }
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.reps}
                ref="reps"
                placeholder={`Reps: ${this.props.workoutInfo.reps}`}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.weight}
                ref="weight"
                placeholder={`Weight: ${this.props.workoutInfo.weight}`}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                value={this.state.lbs}
                ref="lbs"
                placeholder={this.props.workoutInfo.lbs ? "Lbs (Enter 0 for Kgs)" : "Kgs (Enter 1 for Lbs)"}
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
                placeholder={`Date: ${this.props.workoutInfo.date}`}
                onChange={event => this.handleDateInput(event)}
                required
              />
            </div>
            <div className="form-group">
                <span className="col-sm-1"></span>
                <button className="btn btn-primary col-sm-5">Submit</button>
                <span className="col-sm-1"></span>
                <button className="btn btn-dark col-sm-5" onClick={this.handleCloseModal}>
                    Close
                </button>
                <span className="col-sm-1"></span>
            </div>
          </form>
        </ReactModal>
      </div>
    );
  }
}
