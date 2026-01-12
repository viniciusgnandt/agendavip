const timeUtils = {
  hourToMinutes: (hourMinute) => {
    const [hour, minutes] = hourMinute.split(':');
    return Number(hour) * 60 + Number(minutes);
  },
};

export default timeUtils;
