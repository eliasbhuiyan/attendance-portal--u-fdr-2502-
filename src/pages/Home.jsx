import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import ListLoading from "../components/ui/ListLoading";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const db = getDatabase();
  const [loading, setLoading] = useState(true);
  const [batchName, setBatchName] = useState("");
  const [batchList, setBatchList] = useState([]);
  const handelAdd = () => {
    if (!batchName) {
      return toast.error("Batch name is required");
    }
    set(push(ref(db, "batchlist/")), {
      batchName,
    }).then(() => {
      setBatchName("");
    });
  };

  useEffect(() => {
    onValue(ref(db, "batchlist"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBatchList(arr);
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="w-xl bg-slate-100 p-10 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-primary pb-2 border-b-2 border-slate-400">
          Create New Batch
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <Input
            onChange={(e) => setBatchName(e.target.value)}
            label="Batch Name"
            value={batchName}
          />
          <Button onClick={handelAdd} size="lg">
            Add
          </Button>
        </div>
        <h2 className="text-2xl font-bold text-primary mt-10 py-2 border-b text border-slate-400">
          Batch List
        </h2>
        {loading ? (
          <ListLoading />
        ) : batchList.length > 0 ? (
          <div className="batchList mt-6">
            {batchList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-300"
              >
                <p className="text-xl font-semibold text-primary">
                  {item.batchName}
                </p>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">No batch created</p>
        )}
      </div>
    </div>
  );
};

export default Home;
