export function getDateDaysBefore(n: number) {
  const today = new Date();
  const dateBefore = new Date();
  return new Date(dateBefore.setDate(today.getDate() - n));
}
