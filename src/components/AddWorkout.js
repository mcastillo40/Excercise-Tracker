import React from "react";

export default class AddWorkout extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <form className="col-sm-4" id="addWorkout" action="/" method="post">
                    <div className="form-group">
                        <input 
                        type="text" 
                        className="form-control" 
                        name="workout_name" 
                        placeholder="Workout Name"
                        required 
                        />
                    </div>
                </form>
            </div>
        )
    };
};