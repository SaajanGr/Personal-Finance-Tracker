import { format } from "date-fns";

// Function to format the date for the user interface 
export function formatDate(data) {
  const [year, month, day] = data.substr(0, 10).split("-");
  return format(new Date(year, month - 1, day), "LLL, do yyyy");
}

// Function to format the date for the form
export const formatDateForTheForm = (date) => {
  const [year, month, day] = date.substr(0, 10).split("-");
  return format(new Date(year, month - 1, day), "yyyy-MM-dd");
};
