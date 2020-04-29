import { Auth } from 'aws-amplify';

export const signUp = async (
  username = 'username1',
  password = 'password1'
) => {
  try {
    // const id = Math.floor(Math.random() * 1000);
    const user = await Auth.signUp({
      username,
      password,
      attributes: { email: 'test@volcano-app.com' },
    });
    /**
     * user = {
        user: CognitoUser;
        userConfirmed: boolean;
        userSub: string (like an id);
    }
     */
    return user;
  } catch (err) {
    console.log('error signing up: ', err);
  }
};

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (err) {
    window.alert('User not found. Wrong login details');
    console.log('error signing in ', err);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (err) {
    console.log('error signing out: ', err);
  }
};

export const saveUserToLocalStorage = (user) => {
  console.log('saving user to storage');
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const fetchedUserFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  console.log({ fetchedUserFromLocalStorage });
  return fetchedUserFromLocalStorage;
};

export const clearUserLocalStorage = () => {
  localStorage.removeItem('user');
};
