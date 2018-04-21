import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import AddWorkout from "./components/AddWorkout"

class ExcerciseApp extends React.Component {
    constructor(){
        super();

        this.state = {
            title: "Excercise Tracker",
            workouts: []
        };
    }

    render() {
        return (
            <div>
                <Header title={this.state.title} />
                <AddWorkout workouts={this.state.workouts}/>
                
            </div>
        );
    }
}

ReactDOM.render(<ExcerciseApp />, document.getElementById("app"));
