import React, { useContext, useEffect } from "react";
import { Container } from "@material-ui/core";

import { Controls, SequenceView, PlaySequenceButton } from "./components";
import { metronome, initMetronome } from "./controllers/Metronome";
import { Store } from "./store";
import {
  FETCH_LOCAL_STORAGE,
  SEQUENCE_STARTED_PLAYING,
  SEQUENCE_FINISHED_PLAYING,
} from "./actions";
import { Todos } from "./components/Todos";

const App = () => {
  const { state, dispatch } = useContext(Store);
  const { currentSequence } = state;

  useEffect(() => {
    const sequenceStartCB = () => dispatch({ type: SEQUENCE_STARTED_PLAYING });
    const sequenceFinishCB = () =>
      dispatch({ type: SEQUENCE_FINISHED_PLAYING });

    initMetronome(sequenceStartCB, sequenceFinishCB);
  }, [dispatch]);

  useEffect(() => {
    !currentSequence && dispatch({ type: FETCH_LOCAL_STORAGE });
  });

  useEffect(() => {
    currentSequence && (metronome.sequence = currentSequence);
  }, [currentSequence]);

  const hasSteps = currentSequence && currentSequence.steps.length;

  return (
    <Container
      style={{
        maxWidth: "350px",
        margin: "0 auto",
        textAlign: "center",
        padding: 0,
      }}
    >
      <Controls />

      {currentSequence && (
        <>
          <SequenceView sequence={currentSequence} key={currentSequence.id} />
          {<PlaySequenceButton disabled={!hasSteps} />}
        </>
      )}

      <Todos />

      {/* {thereAreSequences && (
        <Box>
          {sequence.list.map((seq, idx) => (
            <StyledDiv
              style={{ borderBottom: "1px solid grey", paddingBottom: "1em" }}
            >
              <p style={{ display: "inline", marginRight: "1em" }}>
                {idx + 1}.
              </p>
              <p
                style={{ display: "inline", marginRight: "10px" }}
              >{`${seq.bpm} bpm`}</p>
              <p
                style={{ display: "inline", marginRight: "10px" }}
              >{`${seq.length} secs`}</p>
            </StyledDiv>
          ))}
        </Box>
      )} */}
    </Container>
  );
};

export default App;
