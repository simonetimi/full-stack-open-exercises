const StatisticLine = ({ label, value }) => {
  return (
    <p>
      {label} {value}
    </p>
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
        <>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={all} />
          <StatisticLine label="average" value={average} />
          <StatisticLine label="positive" value={positive} />
        </>
      )}
    </>
  );
};
