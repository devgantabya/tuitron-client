import React from "react";

const AddNewTuition = () => {
  return (
    <div>
      <h1>Add New Tuition Page</h1>
      <form>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" required />
        </div>
        <div>
          <label>Class:</label>
          <input type="text" name="class" required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" required />
        </div>
        <div>
          <label>Budget:</label>
          <input type="number" name="budget" required />
        </div>
        <div>
          <label>Details:</label>
          <input type="text" name="details" required />
        </div>
        <div>
          <label>Schedule:</label>
          <input type="text" name="schedule" required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <button type="submit">Add Tuition</button>
      </form>
    </div>
  );
};

export default AddNewTuition;
