import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import AddWorkout from "./components/AddWorkout";
import Workouts from "./components/Workouts";

class ExcerciseApp extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "Excercise Tracker",
      workouts: []
    };

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    try {
      fetch("http://localhost:5000/api/workouts")
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ workouts: data });
        });
    } catch (e) {
      // JSON value is invalid
    }
  }

  addItem(item){
    console.log("item: ", item);

    this.setState((prevState) => ({
        workouts: prevState.workouts.concat(item)
    }));
    
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} />
        <AddWorkout 
            workouts={this.state.workouts} 
            addItem={this.addItem}
        />
        <Workouts 
            hasOptions={this.state.workouts.length > 0}
            workouts={this.state.workouts} 
        />
      </div>
    );
  }
}

ReactDOM.render(<ExcerciseApp />, document.getElementById("app"));
