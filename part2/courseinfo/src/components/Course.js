const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      )}
    </>
  )
}

const Total = ({ parts }) => {
  let total;

  if (parts.length !== 0) {
    total = parts.map(part => {
      return part.exercises;
    }).reduce((total, current) => {
      return total + current;
    });
  } else {
    total = 0;
  }

  return (
    <p><strong>total of {total} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
