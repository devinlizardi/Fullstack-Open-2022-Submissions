import { useState } from "react";

const Title = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, feedback, handleClick }) => {
  return <button onClick={() => handleClick(feedback + 1)}> {text} </button>;
};

const StastisticLine = ({ text, value }) => {
  return (
    <>
      <td> {text} </td>
      <td> {value} </td>
    </>
  );
};

const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <>
        <Title text="statistics" />
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <Title text="statistics" />
      <table>
        <tbody>
          <tr>
            <StastisticLine text="good" value={good} />
          </tr>
          <tr>
            <StastisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StastisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StastisticLine text="all" value={total} />
          </tr>
          <tr>
            <StastisticLine text="average" value={(good + -1 * bad) / total} />
          </tr>
          <tr>
            <StastisticLine text="positive" value={(good / total) * 100 + " %"} />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title text="give feedback" />

      <Button text="good" feedback={good} handleClick={setGood} />
      <Button text="neutral" feedback={neutral} handleClick={setNeutral} />
      <Button text="bad" feedback={bad} handleClick={setBad} />

      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
