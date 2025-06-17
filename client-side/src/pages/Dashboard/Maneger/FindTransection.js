import React from "react";

import TransectionRow from "../TransectionRow";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";

const FindTransection = () => {
  const [tranection, setTransection] = useState([]);
  const [sortedTransition, setSortedTransition] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    const sortByDate = tranection.filter(
      (td) =>
        new Date(td.data).toDateString() === new Date(selected).toDateString()
    );
    setSortedTransition(sortByDate);
  }, [selected, tranection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountNumber = e.target.accountNumber.value;

    const url = `${process.env.REACT_APP_API_URL}/findtransection${accountNumber}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTransection(data);
        e.target.reset();
      });
  };
  const css = `
  .my-selected:not([disabled]) { 
    
    color: #6160DC;
  
  }
  .my-selected:hover:not([disabled]) { 
   
    font-weight: bold; 
    background:#6160DC;
   
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: #6160DC;
  }
`;

  return (
    <div className="lg:grid lg:grid-cols-4">
      <div className="lg:col-span-1 mx-auto">
        <div className="sticky w-full   top-0">
          <form onSubmit={handleSubmit} className="p-4 w-full ">
            <input
              name="accountNumber"
              type="text"
              placeholder="Search..."
              class="input  input-bordered input-primary w-full   lg:max-w-md"
            />
            <button className="btn bg-[#6160DC] text-white  border-none w-full mt-2 hover:bg-[#6565c9]">
              Find
            </button>
          </form>
          <style>{css}</style>
          {tranection.length > 0 && (
            <DayPicker
              styles={{
                caption: { color: "#6160DC" },
              }}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          )}
          {sortedTransition.length <= 0 && tranection.length > 0 && (
            <h1 className="text-xs text-center text-red-500 font-semibold">
              There is no transection in selected date
            </h1>
          )}
        </div>
      </div>

      {/* Transection Table */}
      <section className=" shadow-2xl rounded-2xl col-span-3">
        {tranection.length <= 0 && (
          <h1 className="text-3xl text-center text-black">
            Search Results is empty{" "}
          </h1>
        )}
        <h1 className="text-3xl font-semibold text-black text-center">
          {sortedTransition.length > 0
            ? sortedTransition.length
            : tranection.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <tbody>
              {sortedTransition.length > 0
                ? sortedTransition?.map((rowdata, i) => (
                    <TransectionRow key={i} rowdata={rowdata} />
                  ))
                : tranection?.map((rowdata, i) => (
                    <TransectionRow key={i} rowdata={rowdata} />
                  ))}

              {/* {tranection?.map((rowdata, i) => (
                <TransectionRow key={i} rowdata={rowdata} />
              ))} */}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default FindTransection;
