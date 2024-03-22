const Authors = ({ show, authors, editAuthor }) => {
  if (!show) {
    return null;
  }

  const onEditAuthor = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const setBornTo = Number(event.target.born.value);

    editAuthor({ variables: { name, setBornTo } });

    event.target.name.value = '';
    event.target.born.value = '';
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Edit author</h3>
      <form onSubmit={onEditAuthor}>
        <label htmlFor="name">Author: </label>
        <input id="name" name="name" type="text" required />
        <label htmlFor="born">Born in: </label>
        <input id="born" name="born" type="number" required min={1} max={2090} />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default Authors;
