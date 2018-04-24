# Excercise-Tracker

Website Demo: https://excercise-tracker.herokuapp.com/

Refactor original Excercise-Tracker CRUD app to use React for the front-end and PostgreSQL for the database

I continued to use node.js in order to interact with the database and utilize queries to provide the changes requested by the
application.

The Workouts table included:

        id: SERIAL PRIMARY KEY
        name: CHAR(255) NOT NULL
        reps: INTEGER
        weight: INTEGER
        date: DATE
        lbs: BOOLEAN
