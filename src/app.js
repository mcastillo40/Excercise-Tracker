import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal"
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
    this.editItem = this.editItem.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/workouts")
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

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  addItem(item) {
    this.setState(prevState => ({
      workouts: prevState.workouts.concat(item)
    }));
  }

  editItem(item) {
    let workouts = this.state.workouts;
    let currentWorkout = workouts.find(currentWorkout => {
      return currentWorkout.id === item.id
    });

    let index = workouts.indexOf(currentWorkout);

    console.log("workouts", workouts);
    console.log("Index", index);

    workouts.splice(index, 1, item);

    this.setState(() => ({
      workouts: workouts
    }));

    //console.log("here ", this.setState(prevState));
    // console.log("THIS: ", workouts.indexOf(currentWorkout));
    // console.log("prev: ", prevState.workouts);

    // //let data = workouts.filter(item => itemToChange === item.id);

    // console.log("DATA: ", data)

    // this.setState(prevState => ({
    //    workouts: prevState.workouts.filter(item => itemToChange === item.id)
    // }));
  }

  deleteItem(itemToRemove) {
    this.setState(prevState => ({
      workouts: prevState.workouts.filter(item => itemToRemove !== item.id)
    }));
  }

  deleteAll() {
    this.setState(() => ({
      workouts: []
    }));
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} />
        <AddWorkout workouts={this.state.workouts} addItem={this.addItem} />
        <Workouts
          hasOptions={this.state.workouts.length > 0}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          deleteAll={this.deleteAll}
          workouts={this.state.workouts}
          table={this.state.table}
        />
      </div>
    );
  }
}

ReactDOM.render(<ExcerciseApp />, document.getElementById("app"));
