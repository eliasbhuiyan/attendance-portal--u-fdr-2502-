import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
const AddStudents = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-xl bg-slate-100 p-10 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-primary pb-2 border-b-2 border-slate-400">
          Add New Student
        </h1>
        <Select />
        <div className="mt-5 flex items-center gap-3">
          <Input label="Student Name" />
          <Button size="lg">Add</Button>
        </div>
        <h2 className="text-2xl font-bold text-primary mt-10 py-2 border-b text border-slate-400">
          Student List
        </h2>
        <div className="batchList mt-6">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-300">
            <p className="text-xl font-semibold text-primary">Full Name</p>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-300">
            <p className="text-xl font-semibold text-primary">Full Name</p>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-300">
            <p className="text-xl font-semibold text-primary">Full Name</p>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
