import React from 'react';

const Score = ({scores}) => {
  return (
    <div className="scores">
        Scores - x:{scores['X']} o:{scores['O']} tie:{scores['ties']}
    </div>
  );
}

export default Score;