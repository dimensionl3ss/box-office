import { useReducer, useEffect, useState } from 'react';
import {apiGet} from '../misc/config';
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

export function useLastQuery (key = 'lastQuery'){
  //lazy evaluation this will be evaluated only once when state is initialized
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    
    return persisted ? JSON.parse(persisted) : "";
  });
  const setPersistatedInput = (newState) => {
    setInput(newState);
    sessionStorage.setItem(key,JSON.stringify(newState));
  }
  return [input,setPersistatedInput];
}
const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
export function useShow(showId) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      show: null,
      isLoading: true,
      error: null,
    }
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showId]);
  return state;
}