import React from "react";

const Workout = props => {
  return (
    <div className="row center" id="selection">
      <div className="col-sm-2"> {props.workoutInfo.name} </div>
      <div className="col-sm-2"> {props.workoutInfo.reps} reps </div>
      <div className="col-sm-2"> {props.workoutInfo.weight} {props.workoutInfo.lbs ? "Lbs": "Kgs"}</div>
      
      <div className="col-sm-2"> {props.workoutInfo.date} </div>
      <div className="col-sm-2">
        <button
          className="btn"
          onClick={id => props.handleEdit(props.workoutInfo.id)}
        >
          Edit
        </button>
      </div>
      <div className="col-sm-2">
        <button
          className="btn"
          onClick={id => props.handleRemove(props.workoutInfo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Workout;
