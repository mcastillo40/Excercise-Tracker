import React from "react"
import Workout from "./Workout"

export default class Workouts extends React.Component {
    constructor(props){
        super(props)
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleRemoveAll() {
        console.log("Remove All");
    };

    handleRemove(current){
        console.log("Remove Select", current);
    }

    handleEdit(current) {
        
        console.log("Edit Select", current);
    }

    render(){
        //console.log("Workouts: ",this.props.workouts);
        return (
            <div className="center container col-sm-4">
                <div className ="row center" id="headLine">
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
        )
    }
}
