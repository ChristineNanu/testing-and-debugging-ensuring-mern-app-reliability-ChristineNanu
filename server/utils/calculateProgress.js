module.exports = (tasks) => {
  const done = tasks.filter(t => t.completed).length;
  return Math.round((done / tasks.length) * 100);
};
