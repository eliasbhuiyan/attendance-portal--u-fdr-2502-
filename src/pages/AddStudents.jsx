import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
const AddStudents = () => {
  const db = getDatabase();
  const [batchList, setBatchList] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    onValue(ref(db, "batchlist"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
    });
  }, []);

  const handelAddStudent = () => {
    if (!batchId) return toast.info("Please select a batch");
    if (!studentName) return toast.error("Enter a student name");
    set(push(ref(db, "studentlist/" + batchId)), {
      studentName,
    });
  };

  useEffect(() => {
    if (!batchId) return;
    onValue(ref(db, "studentlist/" + batchId), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setStudentList(arr);
    });
  }, [batchId]);

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-xl bg-slate-100 p-10 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-primary pb-2 border-b-2 border-slate-400">
          Add New Student
        </h1>
        <Select
          onChange={(e) => setBatchId(e.target.value)}
          options={batchList}
        />
        <div className="mt-5 flex items-center gap-3">
          <Input
            onChange={(e) => setStudentName(e.target.value)}
            label="Student Name"
          />
          <Button onClick={handelAddStudent} size="lg">
            Add
          </Button>
        </div>
        <h2 className="text-2xl font-bold text-primary mt-10 py-2 border-b text border-slate-400">
          Student List
        </h2>
        <div className="batchList mt-6">
          {studentList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-300"
            >
              <p className="text-xl font-semibold text-primary">
                {item.studentName}
              </p>
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
