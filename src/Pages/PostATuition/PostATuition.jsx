import React from "react";
import { Link } from "react-router";

const PostATuition = () => {
  return (
    <div>
      <h1>Post A Tuition Page</h1>
      <Link to="student/add-new-tuition" className="btn">Add New Tuition</Link>
    </div>
  );
};

export default PostATuition;
