import { useState } from 'react';

import Header from "./components/Header.jsx";
// import InputContainer from "./components/InputContainer.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

const UserInputData = {
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
};



function App() {
  const [inputData, setInputData] = useState(UserInputData);

  const inputIsValid = inputData.duration != "" && inputData.duration >= 1;

  function handleChange(inputField, newValue) {
    setInputData(prevData => {
        return {
            ...prevData,
            [inputField]: +newValue
        };
    });
  }

  return (
    <>
    <Header />
    <UserInput onChange={handleChange} inputData={inputData} />
    {!inputIsValid && <p className="center" > Please enter a valid duration </p> }
    {inputIsValid && <Results input={inputData} /> }
    </>
  );
}

export default App
