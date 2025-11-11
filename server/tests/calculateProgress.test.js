const calculateProgress = require('../utils/calculateProgress');

test('calculates correct completion %', () => {
  const tasks = [{completed:true},{completed:false}];
  expect(calculateProgress(tasks)).toBe(50);
});
