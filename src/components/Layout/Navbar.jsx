import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="py-5 bg-brand">
      <div className="container flex justify-center gap-10 text-white text-2xl">
        <Link to="/">Batch List</Link>
        <Link to="/addstudents">Add Students</Link>
        <Link to="/attendance">Take Attendance</Link>
      </div>
    </nav>
  );
};

export default Navbar;
