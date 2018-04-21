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
      table: "workouts",
      workouts: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  componentDidMount() {   
    fetch("http://localhost:5000/api/workouts")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ workouts: data });
      })
      .catch(err => {
        return err;
      });
  }

  addItem(item){
    this.setState((prevState) => ({
        workouts: prevState.workouts.concat(item)
    }));
  }

  deleteItem(item){
    console.log("delete this item: ", item);
  }

  deleteAll(){
    this.setState(() => ({
      workouts: []
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
            deleteItem={this.deleteItem}
            deleteAll={this.deleteAll}
            workouts={this.state.workouts} 
            table={this.state.table}
        />
      </div>
    );
  }
}

ReactDOM.render(<ExcerciseApp />, document.getElementById("app"));
