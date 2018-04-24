import React, { Component } from 'react';
import './App.css';
import ReactModal from "react-modal"
import Header from "./components/Header";
import AddWorkout from "./components/AddWorkout";
import Workouts from "./components/Workouts";

class ExcerciseApp extends Component {
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

// When component mounts get all items from the database
  componentDidMount() {
    let request = new Request("https://excercise-tracker.herokuapp.com/get-workouts", {
        method: "GET"
    });

    fetch(request)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ workouts: data });
      })
      .catch(err => {
        return err;
      });

      console.log(this.state.workouts);
  }

  // Function is to set react-modal
  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  // Function adds a workout to the state
  addItem(item) {
    this.setState(prevState => ({
      workouts: prevState.workouts.concat(item)
    }));
  }

  // Function obtains an edited item which it uses to change the 
  // that item in the state  
  editItem(item) {
    let workouts = this.state.workouts;

    // Find the workout in the state workouts array
    let currentWorkout = workouts.find(currentWorkout => {
      return currentWorkout.id === item.id
    });

    let index = workouts.indexOf(currentWorkout);

    workouts.splice(index, 1, item);

    this.setState(() => ({
      workouts: workouts
    }));
  }

  // Function deletes workout passed from the state
  deleteItem(itemToRemove) {
    this.setState(prevState => ({
      workouts: prevState.workouts.filter(item => itemToRemove !== item.id)
    }));
  }

  // This clears all the items from the state
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

export default ExcerciseApp;
