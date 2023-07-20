import { useState } from 'react'

const AnecdoteOfDay = ({ anecdotesArr, votesArr, index }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotesArr[index]}</p>
      <p>has {votesArr[index]} votes</p>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const PopularAnecdote = ({ anecdotesArr, votesArr }) => {

  const findMostVotes = () => {
    let maxVotes = Math.max(...votesArr);
    let index = votesArr.indexOf(maxVotes);
    return anecdotesArr[index];
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{findMostVotes()}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randomNum = () => {
    return Math.floor(Math.random() * (anecdotes.length - 1));
  }

  const handleNext = () => {
    setSelected(randomNum());
  }

  const handleVote = () => {
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  return (
    <>
      <AnecdoteOfDay
        anecdotesArr={anecdotes}
        votesArr={votes}
        index={selected}
      />
      <Button
        handleClick={handleVote}
        text='vote'
      />
      <Button
        handleClick={handleNext}
        text='next anecdote'
      />
      <PopularAnecdote
        anecdotesArr={anecdotes}
        votesArr={votes}
      />
    </>
  )
}

export default App
