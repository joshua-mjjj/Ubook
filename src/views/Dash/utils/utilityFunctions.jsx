
export const getDailyDates = (start, end) => {
  let date = new Date(start);
  const endDate = new Date(end);
  
  const result = [];
  while (date <= endDate) {
      result.push(date);
      date = new Date(date);
      date.setUTCDate(date.getUTCDate() + 1);
  }
  return result;
}

export const getWeeklyDates = (start, end) => {
  let date = new Date(start);
  const endDate = new Date(end);
  
  const result = [];
  while (date <= endDate) {
      result.push(date);
      date = new Date(date);
      date.setUTCDate(date.getUTCDate() + 7);
  }
  return result;
}

export const getBiWeeklyDates = (start, end) => {
  let date = new Date(start);
  const endDate = new Date(end);
  
  const result = [];
  while (date <= endDate) {
      result.push(date);
      date = new Date(date);
      date.setUTCDate(date.getUTCDate() + 14);
  }
  return result;
}

export const getMonthlyDates = (start, end) => {
	let date = new Date(start);
	const endDate = new Date(end);

	const result = [];
	while (date <= endDate) {
	    result.push(date);
	    date = new Date(date);
	    date.setUTCDate(date.getUTCDate() + 31);
	}
	return result;
}