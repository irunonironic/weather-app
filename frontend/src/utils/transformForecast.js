import { format } from 'date-fns';

export const transformForecastData = (rawData) => {
  if (!rawData || !rawData.list) return [];

  const grouped = {};

  rawData.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0];
    const temp = entry.main.temp;
    const icon = entry.weather[0].main;

    if (!grouped[date]) grouped[date] = { temps: [], icons: [] };
    grouped[date].temps.push(temp);
    grouped[date].icons.push(icon);
  });

  return Object.entries(grouped)
    .slice(0, 7)
    .map(([date, data]) => {
      const avgTemp = Math.round(data.temps.reduce((a, b) => a + b, 0) / data.temps.length);
      const icon = data.icons[Math.floor(data.icons.length / 2)];
      return {
        day: format(new Date(date), 'EEE'),
        icon,
        high: avgTemp,
      };
    });
};
