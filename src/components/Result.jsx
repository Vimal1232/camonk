import React, { useEffect, useState } from "react";

const Result = ({ quit, answerUser }) => {
  const [score, setScore] = useState(0);
  let fullscore = 0;

  useEffect(() => {
    console.log(answerUser);
    for (let i = 0; i < answerUser.length; i++) {
      if (answerUser[i].userAnswer === answerUser[i].correctAnswer.toString()) {
        fullscore += 1;
        console.log(answerUser[i].correctAnswer.toString());
      }
    }

    setScore(fullscore);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <button
          onClick={quit}
          className="text-gray-500 hover:text-black text-xl"
        >
          &larr;
        </button>
        <h1 className="text-gray-800 font-medium text-sm cursor-pointer">
          Sentence Construction
        </h1>
        <div className="w-6" />
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full border-[6px] border-green-500 flex items-center justify-center text-green-600 text-2xl font-semibold">
          {score}
        </div>
        <p className="text-sm text-gray-700 font-medium mt-2">
          Overall Score out Of 10
        </p>
      </div>

      <button
        onClick={quit}
        className="px-4 py-2 border cursor-pointer border-gray-300 rounded-md text-sm text-purple-700 hover:bg-gray-100 mb-6"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Result;
