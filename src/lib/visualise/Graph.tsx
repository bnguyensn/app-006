/**
 * Produce a calendar visualisation using .json data
 */

import React from 'react';
import {useEffect, useState} from 'react';

export default function Graph() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count = ${count}`;
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  )
}
