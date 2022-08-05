import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Title = ({ text }) => {
    return <h1>{text}</h1>;
  };

  const Button = ({ text, feedback, handleClick }) => {
    return <button onClick={() => handleClick(feedback + 1)}> {text} </button>;
  };

  const Stats = () => {
    return (
      <>
        <Title text="statistics" />
        <p>
          good {good} <br />
          neutral {neutral} <br />
          bad {bad}
        </p>
      </>
    );
  };

  return (
    <div>
      <Title text="give feedback" />

      <Button text="good" feedback={good} handleClick={setGood}/>
      <Button text="neutral" feedback={neutral} handleClick={setNeutral}/>
      <Button text="bad" feedback={bad} handleClick={setBad}/>

      <Stats />
    </div>
  );
};

export default App;
