import React, { useState } from "react";
import Original from "./components/Original";

const App = () => {
  const [isOriginal, setIsOriginal] = useState(false);

  return (
    <>
      {!isOriginal ? (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
          <div className="mb-6">
            <img src="/Logo.png" alt="" className=" w-12 " />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-5">
            Sentence Construction
          </h1>

          <p className="text-center text-gray-500 text-base max-w-md mb-10">
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>

          <div className="flex items-center justify-center gap-10 mb-10">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Time Per Question</p>
              <p className="text-base text-gray-900 font-medium">30 sec</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total Questions</p>
              <p className="text-base text-gray-900 font-medium">10</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Coins</p>
              <div className="flex items-center justify-center gap-1">
                <span className="h-2 w-2 bg-yellow-400 rounded-full"></span>
                <p className="text-base text-gray-900 font-medium">0</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-md border border-[#7253ea] text-[#7253ea] font-medium hover:bg-[#f6f3ff] transition">
              Back
            </button>
            <button
              onClick={() => setIsOriginal(true)}
              className="px-6 py-2 rounded-md bg-[#7253ea] text-white font-medium hover:bg-[#6142d9] transition"
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <Original Quit={() => setIsOriginal(false)} />
      )}
    </>
  );
};

export default App;
