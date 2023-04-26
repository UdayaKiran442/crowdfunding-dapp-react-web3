import moment from "moment";
const calculateDaysLeft = (deadline) => {
  const currentDate = moment(new Date());
  const deadlineDate = moment(new Date(deadline));
  const daysLeft = deadlineDate.diff(currentDate, "days");
  return daysLeft;
};

export default calculateDaysLeft;
