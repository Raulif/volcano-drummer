import React, { useCallback, useState, useContext, useEffect } from "react";
import { Button } from "@material-ui/core";

import { Store } from "../../store";
import { metronome } from "../../controllers/Metronome";

const PlaySequenceButton = ({ disabled }) => {
  const [playing, setPlaying] = useState(false);
  const { state } = useContext(Store);

  const playSequence = useCallback(() => {
    metronome.startSequence();
  }, []);

  const stopPlaySequence = useCallback(() => {
    metronome.pause();
  }, []);

  useEffect(() => {
    setPlaying(state.sequencePlaying);
  }, [state.sequencePlaying]);

  return (
    <div style={{ marginTop: "1em" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={playing ? stopPlaySequence : playSequence}
        disabled={disabled}
      >
        {`${playing ? "Stop" : "Play"} sequence`}
      </Button>
    </div>
  );
};

export { PlaySequenceButton };
