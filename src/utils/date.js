const todaysDate = new Date().toISOString().split("T")[0];
const today = Date.parse(new Date().toISOString().split("T")[0]);
const MILLISECONDS = 24 * 60 * 60 * 1000;

const date = {
  parseByDate(value) {
    return Date.parse(value);
  },

  calculateDaysLeft(selectedDate, today) {
    return Math.ceil((selectedDate - today) / MILLISECONDS);
  },

  alertfrom3DaysLeft(value) {
    const selectedDate = date.parseByDate(value);
    const daysLeft = date.calculateDaysLeft(selectedDate, today);

    setTimeout(() => {
      if (value !== undefined) {
        if (0 < daysLeft && daysLeft < 4) {
          alert(`D-day 까지 ${daysLeft}일 남았습니다`);
        } else if (daysLeft === 0) {
          alert("D-day입니다");
        }
      }
    }, 500);
  },
};

export { todaysDate, today, date, MILLISECONDS };
