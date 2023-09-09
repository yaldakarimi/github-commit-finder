export const formatDate = (date: string) => {
  const day = new Date(date).toLocaleString("en-US", { day: "2-digit" });
  const month = new Date(date).toLocaleString("en-US", { month: "long" });
  const year = new Date(date).getFullYear();
  const time = new Date(date).toLocaleTimeString("en-US");

  return `${month} ${day}, ${year} at ${time}`;
};