import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const allReviews = () => {
    return good + neutral + bad;
  }

  const calculateAvg = () => {
    return ((good * 1) + (bad * -1)) / allReviews();
  };

  const percentPositive = () => {
    return (good / allReviews()) * 100;
  };

  if (allReviews() === 0) {
    return (
      <>
        <h3>statistics</h3>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h3>statistics</h3>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={allReviews()} />
          <StatisticLine text='average' value={calculateAvg()} />
          <StatisticLine text='positive' value={percentPositive()} />
        </tbody>
      </table>
    </>
  )
};

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [goodTotal, setGoodTotal] = useState(0);
  const [neutralTotal, setNeutralTotal] = useState(0);
  const [badTotal, setBadTotal] = useState(0);

  const handleGoodClick = () => {
    let total = good + 1;
    setGoodTotal(total);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    let total = neutral + 1;
    setNeutralTotal(total);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    let total = bad + 1;
    setBadTotal(total);
    setBad(bad + 1);
  };

  return (
    <>
      <h3>give feedback</h3>
      <Button
        handleClick={handleGoodClick}
        text='good'
      />
      <Button
        handleClick={handleNeutralClick}
        text='neutral'
      />
      <Button
        handleClick={handleBadClick}
        text='bad'
      />
      <Statistics
        good={goodTotal}
        neutral={neutralTotal}
        bad={badTotal}
      />
    </>
  )
}
export default App;
