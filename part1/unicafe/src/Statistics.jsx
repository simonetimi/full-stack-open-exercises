const StatisticLine = ({ label, value }) => {
  return (
    <>
      <td>{label}</td>
      <td>{value}</td>
    </>
  );
};

export const Statistics = ({ all, good, neutral, bad }) => {
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return (
    <>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <StatisticLine label="good" value={good} />
            </tr>
            <tr>
              <StatisticLine label="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine label="bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine label="all" value={all} />
            </tr>
            <tr>
              <StatisticLine label="average" value={average} />
            </tr>
            <tr>
              <StatisticLine label="positive" value={positive} />
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
