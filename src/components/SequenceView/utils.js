export const getXAxisDomainDataMax = (dataMax) => {
  if (dataMax <= 150) {
    return 180;
  }
  if (dataMax <= 300) {
    return 360;
  }
  if (dataMax <= 450) {
    return 510;
  }
  return 600;
};

export const getData = (steps) => {
  let totalLength = 0;
  return steps.reduce((acc, step) => {
    const { length, bpm } = step;
    if (!acc.length) {
      acc.push({ bpm: steps[0].bpm, length: 0 });
    }

    acc.push(
      // { bpm, length: totalLength },
      { bpm, length: (totalLength += length) }
    );
    return acc;
  }, []);
};
