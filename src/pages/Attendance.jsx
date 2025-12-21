import React from "react";
import Select from "../components/ui/Select";
import Input from "../components/ui/Input";
import Switch from "../components/ui/Switch";
import Button from "../components/ui/Button";

const Attendance = () => {
  return (
    <section className="mt-10">
      <div className="max-w-5xl m-auto">
        <div className="bg-brand p-10 rounded-2xl shadow">
          <h2 className="border-b pb-3">Select Batch & Date</h2>
          <div className="flex items-center gap-6 mt-5">
            <Select />
            <Input type="date" className="py-4!" />
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
              <tr>
                <td>1</td>
                <td>John Deo</td>
                <td>
                  <Switch />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>John Deo</td>
                <td>
                  <Switch />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>John Deo</td>
                <td>
                  <Switch />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
