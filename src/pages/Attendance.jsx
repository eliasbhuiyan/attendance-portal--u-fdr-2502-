import React, { useEffect, useState } from "react";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import Switch from "../components/ui/Switch";
import Button from "../components/ui/Button";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
const Attendance = () => {
  const db = getDatabase();
  const [batchId, setBatchId] = useState("");
  const [batchList, setBatchList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [attendDate, setAttendDate] = useState("");
  useEffect(() => {
    onValue(ref(db, "batchlist"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
    });
  }, []);
  useEffect(() => {
    if (!batchId) return;
    onValue(ref(db, "studentlist/" + batchId), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key, attend: false });
      });
      setStudentList(arr);
    });
  }, [batchId]);

  const handelAttendToggle = (id, attend) => {
    console.log(id, attend);
    const attendUpdate = studentList.map((item) => {
      if (item.id == id) {
        item.attend = attend;
      }
      return item;
    });
    setStudentList(attendUpdate);
  };

  const handelAttendance = () => {
    if (!batchId) return toast.error("Please selact a batch");
    if (!attendDate) return toast.error("Please selact date");
    set(push(ref(db, "attendancelist/" + batchId)), {
      attendDate,
      studentList,
    }).then(() => {
      setBatchId("");
      setStudentList([]);
    });
  };
  return (
    <section className="mt-10">
      <ToastContainer />
      <div className="max-w-5xl m-auto">
        <div className="bg-brand p-10 rounded-2xl shadow">
          <h2 className="border-b pb-3">Select Batch & Date</h2>
          <div className="flex items-center gap-6 mt-5">
            <Select
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              options={batchList}
            />
            <Input
              onChange={(e) => setAttendDate(e.target.value)}
              type="date"
              className="py-4!"
            />
          </div>
        </div>
        <div className="bg-slate-100 p-10 rounded-2xl shadow mt-8 border">
          <table className="w-full">
            <thead>
              <tr>
                <td className="pb-6 w-[10%]">SL.</td>
                <td className="pb-6 w-full text-start">Student Name</td>
                <td className="pb-6 w-[10%]">Attendance</td>
              </tr>
            </thead>
            <tbody className="table_bdy">
              {studentList.map((item, i) => (
                <tr key={item.id}>
                  <td>{i + 1}</td>
                  <td>{item?.studentName}</td>
                  <td>
                    <Switch
                      attend={item.attend}
                      onChange={(e) =>
                        handelAttendToggle(item.id, e.target.checked)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <Button onClick={handelAttendance}>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
