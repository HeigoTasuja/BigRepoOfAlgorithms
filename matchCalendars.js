function matchCalendars(calendar1, dailyBounds1, calendar2, dailyBounds2, duration) {
    const updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
    const updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
    const mergedCalendar = mergeCalendar(updatedCalendar1, updatedCalendar2);
    const sortedCalendars = sortCalendars(mergedCalendar);
    return getAvailabilities(sortedCalendars, duration);
  }
  
  function updateCalendar(calendar, dailyBounds) {
    const updated = [["0:00", dailyBounds[0]], ...calendar, [dailyBounds[1], "23:59"]];
    return updated.map(m => [timeToMinutes(m[0]), timeToMinutes(m[1])]);
  }
  
  function mergeCalendar(calendar1, calendar2) {
    const merged = [];
    let i = 0, j = 0;
    while (i < calendar1.length && j < calendar2.length) {
      const meeting1 = calendar1[i], meeting2 = calendar2[j];
      if (meeting1[0] < meeting2[0]) {
        merged.push(meeting1);
        i++;
      } else {
        merged.push(meeting2);
        j++;
      }
    }
    while (i < calendar1.length) {
      merged.push(calendar1[i]);
      i++;
    }
    while (j < calendar2.length) {
      merged.push(calendar2[j]);
      j++;
    }
    return merged;
  }
  
  function sortCalendars(calendar) {
    const sorted = [calendar[0].slice()];
    for (let i = 1; i < calendar.length; i++) {
      const current = calendar[i];
      const previous = sorted[sorted.length - 1];
      if (previous[1] >= current[0]) {
        previous[1] = Math.max(previous[1], current[1]);
      } else {
        sorted.push(current.slice());
      }
    }
    return sorted;
  }
  
  function getAvailabilities(calendar, duration) {
    const availabilities = [];
    for (let i = 1; i < calendar.length; i++) {
      const start = calendar[i - 1][1];
      const end = calendar[i][0];
      if (end - start >= duration) {
        availabilities.push([minutesToTime(start), minutesToTime(end)]);
      }
    }
    return availabilities;
  }
  
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }
  
  function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? "0" + mins : mins}`;
  }
  