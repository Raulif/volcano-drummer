import {
  ADD_SEQUENCE,
  SET_CURRENT_SEQUENCE,
  ADD_STEP_TO_CURRENT_SEQUENCE,
  FETCH_LOCAL_STORAGE,
  CLEAR_CURRENT_SEQUENCE,
  SEQUENCE_FINISHED_PLAYING,
  SEQUENCE_STARTED_PLAYING,
} from '../actions/sequenceActions';

import {
  getNewSequence,
  saveCurrentSequenceToLocalStorage,
  clearLocalStorage,
  getCurrentSequenceFromLocalStorage,
} from './sequenceUtils';

const initialState = {
  currentSequence: undefined,
  sequences: [],
  sequencePlaying: false,
};

const sequenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_STORAGE:
      const fetchedSequence = getCurrentSequenceFromLocalStorage();
      return { ...state, currentSequence: fetchedSequence || getNewSequence() };

    case ADD_SEQUENCE:
      saveCurrentSequenceToLocalStorage(action.payload);
      return { ...state, sequences: state.sequences.push(action.payload) };

    case SET_CURRENT_SEQUENCE:
      return {
        ...state,
        currentSequence:
          state.sequences.find((s) => s.id === action.payload) ||
          getNewSequence(),
      };

    case ADD_STEP_TO_CURRENT_SEQUENCE:
      const curr = state.currentSequence || getNewSequence();
      curr.steps.push(action.payload);
      return { ...state, currentSequence: curr };

    case CLEAR_CURRENT_SEQUENCE: {
      clearLocalStorage();
      return { ...state, currentSequence: getNewSequence() };
    }

    case SEQUENCE_STARTED_PLAYING: {
      return { ...state, sequencePlaying: true };
    }

    case SEQUENCE_FINISHED_PLAYING: {
      return { ...state, sequencePlaying: false };
    }

    default:
      return state;
  }
};

export { sequenceReducer };
