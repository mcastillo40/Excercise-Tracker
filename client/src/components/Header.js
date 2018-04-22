import React from "react";

// Display Header
const Header = (props) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
    NEW
      <div className="container">
        <h1 className="container center">{props.title}</h1>
      </div>
    </nav>
  );
};

export default Header; 