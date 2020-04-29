import React, { useState, useCallback, useContext } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { Store } from '../../store';
import {
  Container,
  PlayPauseButton,
  PlusMinusButton,
  ColumnGrid,
  TextWrapper,
  GridItem,
  SliderWrapper,
} from './styledComponents';

import { metronome } from '../../controllers/Metronome';
import { BpmSlider } from './BpmSlider';
import { LengthSlider } from './LengthSlider';
import {
  ADD_SEQUENCE,
  ADD_STEP_TO_CURRENT_SEQUENCE,
  CLEAR_CURRENT_SEQUENCE,
} from '../../actions/sequenceActions';
import { toMSS } from '../../utils';

const INITIAL_BPM = 50,
  INITIAL_LENGTH = 1;

const Controls = () => {
  const [bpm, setBpm] = useState(INITIAL_BPM);
  const [length, setLength] = useState(INITIAL_LENGTH);
  const [playing, setPlaying] = useState(false);

  const {
    state,
    dispatch: { sequenceDispatch },
  } = useContext(Store);

  const onPlay = useCallback(() => {
    setPlaying(true);
    metronome.play();
  }, []);

  const onPause = useCallback(() => {
    setPlaying(false);
    metronome.pause();
  }, []);

  const onBpmSliderChange = useCallback((event, newValue) => {
    setBpm(newValue);
    metronome.tempo = newValue;
  }, []);

  const onLengthSliderChange = useCallback((event, newValue) => {
    setLength(newValue);
  }, []);

  const onAddStep = useCallback(() => {
    sequenceDispatch({
      type: ADD_STEP_TO_CURRENT_SEQUENCE,
      payload: { bpm, length },
    });
  }, [bpm, length, sequenceDispatch]);

  const onSaveSequence = useCallback(() => {
    sequenceDispatch({ type: ADD_SEQUENCE, payload: state.currentSequence });
  }, [sequenceDispatch, state.currentSequence]);

  const onClearSequence = useCallback(() => {
    setBpm(INITIAL_BPM);
    setLength(INITIAL_LENGTH);

    sequenceDispatch({ type: CLEAR_CURRENT_SEQUENCE });
  }, [sequenceDispatch]);

  return (
    <Grid container space={2}>
      <Container container>
        <Grid item xs={3} style={{ display: 'flex' }}>
          <Button
            onClick={playing ? onPause : onPlay}
            variant='contained'
            color='primary'
            style={{ alignSelf: 'center', width: '100%' }}
          >
            {playing ? 'PAUSE' : 'START'}
          </Button>
        </Grid>
        <ColumnGrid item xs={3} space={1}>
          <TextWrapper>
            <Typography variant='body1'>BPM:</Typography>
          </TextWrapper>
          <TextWrapper>
            <Typography variant='h4'>{bpm}</Typography>
          </TextWrapper>
        </ColumnGrid>
        <ColumnGrid item xs={3} space={1}>
          <TextWrapper>
            <Typography variant='body1'>Length:</Typography>
          </TextWrapper>
          <TextWrapper>
            <Typography variant='h4'>{toMSS(length)}</Typography>
          </TextWrapper>
        </ColumnGrid>
      </Container>
      <Container container style={{ paddingTop: '1em' }}>
        <GridItem>
          <Typography id='bpm-slider'>BPM:</Typography>
          <SliderWrapper>
            <BpmSlider onChange={onBpmSliderChange} value={bpm} />
          </SliderWrapper>
        </GridItem>
        <GridItem>
          <Typography id='bpm-slider'>Length:</Typography>
          <SliderWrapper>
            <LengthSlider value={length} onChange={onLengthSliderChange} />
          </SliderWrapper>
        </GridItem>
        <GridItem>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant='contained' color='secondary' onClick={onAddStep}>
              Add step
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={onSaveSequence}
              disabled={
                !state.currentSequence || !state.currentSequence.steps.length
              }
            >
              Save
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={onClearSequence}
            >
              Clear
            </Button>
          </div>
        </GridItem>
      </Container>
    </Grid>
  );
};

export { Controls };
