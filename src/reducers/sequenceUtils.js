export const saveCurrentSequenceToLocalStorage = (sequence) => {
  console.log('saving to storage');
  localStorage.setItem('currentSequence', JSON.stringify(sequence));
};

export const getCurrentSequenceFromLocalStorage = () => {
  const fetchedFromLocalStorage = JSON.parse(
    localStorage.getItem('currentSequence')
  );
  console.log({ fetchedFromLocalStorage });
  return fetchedFromLocalStorage;
};

export const clearLocalStorage = () => {
  localStorage.removeItem('currentSequence');
};

export const getNewSequence = () => ({
  id: Math.round(Math.random() * 100000),
  steps: [],
});
