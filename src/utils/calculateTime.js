export const calculateTime = (created_at) => {
  const createdDate = new Date(created_at);

  const createdHours = createdDate.getHours();
  const createdMinutes = createdDate.getMinutes();

  const stringHours = createdHours > 9 ? createdHours : `0${createdHours}`;
  const stringMinutes =
    createdMinutes > 9 ? createdMinutes : `0${createdMinutes}`;

  return `${stringHours}:${stringMinutes}`;
};
