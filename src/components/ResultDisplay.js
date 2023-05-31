import React from 'react';

function ResultDisplay({ results, isLoading }) {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {results && (
        <div>
          <h1>Results</h1>
          <p className="app__data">{results}</p>
        </div>
      )}
    </>
  );
}

export default ResultDisplay;
