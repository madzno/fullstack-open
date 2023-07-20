const Filter = ({ currentName, handler }) => {
  return (
    <div>
      filter shown with <input value={currentName} onChange={handler} />
    </div>
  )
}

export default Filter
