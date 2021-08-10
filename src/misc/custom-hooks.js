import { useReducer, useEffect } from 'react';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}
//key for local storage
function usePersistedReducer(reducer, initialState, key) {
    //third argument is initializer function when that gonna need to computate
    //the initial state and whatever will be returned as third function will set as initial state
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}
