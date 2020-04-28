/* eslint-disable no-restricted-globals */
export default () => {
  let timerID = null;
  let interval = 100;
  let currentSequenceIndex = 0;
  self.addEventListener("message", ({ data }) => {
    if (data === "start_sequence") {
      playSequenceIndex(currentSequenceIndex);
    } else if (data === "next_sequence") {
      ++currentSequenceIndex;
      playSequenceIndex(currentSequenceIndex);
    } else if (data === "finish_sequence") {
      currentSequenceIndex = 0;
    } else if (data === "start") {
      timerID = setInterval(function () {
        postMessage("tick");
      }, interval);
    } else if (data.interval) {
      interval = data.interval;
      console.log("interval=" + interval);

      if (timerID) {
        clearInterval(timerID);
        timerID = setInterval(function () {
          postMessage("tick");
        }, interval);
      }
    } else if (data === "stop") {
      clearInterval(timerID);
      timerID = null;
    }
  });

  const playSequenceIndex = (index) => {
    postMessage({
      message: "play_index",
      index,
    });
  };

  postMessage("setting worker");
};
