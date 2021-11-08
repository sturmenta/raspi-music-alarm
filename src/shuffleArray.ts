const shuffleArray = (array: any[]) => {
  const _array = [...array];

  for (let i = _array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }

  return _array;
};

export default shuffleArray;
