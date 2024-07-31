// RatingContext.js
import React, { createContext, useState, useContext } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratingData, setRatingData] = useState({});

  return (
    <RatingContext.Provider value={{ ratingData, setRatingData }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  return useContext(RatingContext);
};
