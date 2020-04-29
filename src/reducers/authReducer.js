import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  FETCH_USER_FROM_LOCAL_STORAGE,
} from '../actions/authActions';
import {
  signUp,
  signIn,
  signOut,
  saveUserToLocalStorage,
  clearUserLocalStorage,
  getUserFromLocalStorage,
} from './authUtils';

const initialState = { user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_FROM_LOCAL_STORAGE: {
      const fetchedUser = getUserFromLocalStorage();
      return { ...state, user: fetchedUser || initialState.user };
    }

    case SIGN_UP: {
      const { username, password } = action.payload;
      signUp(username, password).then((user) => {
        saveUserToLocalStorage(user);
        console.log({ userInSignUp: user });
        return { ...state, user };
      });
      break;
    }

    case SIGN_IN: {
      const { username, password } = action.payload;
      const user = signIn(username, password);
      saveUserToLocalStorage(user);
      console.log({ userInSignIn: user });
      return { ...state, user };
    }

    case SIGN_OUT: {
      signOut();
      clearUserLocalStorage();
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
};

export { authReducer };
