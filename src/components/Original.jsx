import React, { useState, useEffect } from "react";
import Question from "../data/question.json";
import Result from "./Result";

const Original = ({ Quit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nextQuestion, setNextQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);

  const handleNextQuestion = () => {
    if (nextQuestion < Question.length - 1) {
      setNextQuestion(nextQuestion + 1);
      localStorage.setItem(currentQuestion.id, selectedOptions);
      setSelectedOptions([]);
      setTimer(30);
    } else {
      localStorage.setItem(currentQuestion.id, selectedOptions);
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (!showResult) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            return 0;
          }

          if (prev === 1) {
            setTimeout(handleNextQuestion(), 0);
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [nextQuestion, showResult]);

  const OptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const currentQuestion = Question[nextQuestion];
  const renderSentenceWithFilledBlanks = () => {
    const parts = currentQuestion.question.split("_____________");

    return (
      <p className="text-lg text-center text-gray-900 leading-8 mb-8">
        {parts.map((part, index) => {
          if (index === parts.length - 1) {
            return <span key={index}>{part}</span>;
          }

          return (
            <React.Fragment key={index}>
              {part}
              <span
                className={`${
                  selectedOptions[index]
                    ? "border border-gray-300 my-2 px-4 py-2 rounded-md text-gray-700 "
                    : ""
                }  mx-1 px-2 py-1 rounded inline-block min-w-[100px] text-center`}
              >
                {selectedOptions[index] || "_____________"}
              </span>
            </React.Fragment>
          );
        })}
      </p>
    );
  };

  return (
    <>
      {showResult ? (
        <Result
          quit={Quit}
          answerUser={Question.map((q) => ({
            question: q.question,
            userAnswer: localStorage.getItem(q.id),
            correctAnswer: q.correctAnswer,
          }))}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4 py-10">
          <div className="bg-white rounded-2xl shadow-md w-full max-w-3xl p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium">0:{timer}</span>
              <button
                onClick={Quit}
                className="text-gray-600 border border-gray-300 px-4 py-1 rounded-md text-sm hover:bg-gray-100 transition"
              >
                Quit
              </button>
            </div>

            <div className="flex gap-2 mb-8"></div>

            <h2 className="text-center text-gray-700 font-medium mb-6">
              Select the missing words in the correct order
            </h2>

            {renderSentenceWithFilledBlanks()}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  onClick={() => OptionClick(option)}
                  className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                // disabled={selectedOptions.length !== 4}
                className={`border ${
                  selectedOptions.length === 4
                    ? "bg-[#7253ea] text-white  hover:bg-[#6142d9] transition"
                    : " cursor-not-allowed border-gray-300 rounded-md text-gray-400 hover:bg-gray-100 transition "
                }   p-2 rounded-md `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Original;
