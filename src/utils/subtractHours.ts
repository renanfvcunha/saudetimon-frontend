export default (date: Date): Date => {
  const d = new Date(date);
  d.setHours(d.getHours() - 3);
  return d;
};
