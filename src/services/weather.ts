const weatherIcons: Record<string, string> = {
  "0": "1",
  "1": "9",
  "2": "9",
  "3": "9",
  "45": "2",
  "48": "2",
  "51": "3",
  "53": "3",
  "55": "3",
  "56": "3",
  "57": "3",
  "61": "4",
  "63": "4",
  "65": "4",
  "66": "4",
  "67": "4",
  "71": "5",
  "73": "5",
  "75": "5",
  "77": "5",
  "80": "3",
  "81": "3",
  "82": "4",
  "85": "5",
  "86": "5",
  "95": "7",
  "96": "7",
  "99": "7",
};

export async function getWeather(lat: number, lon: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
  );
  const weather = await response.json();
  return {
    icon: weatherIcons[weather.current.weather_code as string],
    temperature: weather.current.temperature_2m as number,
  };
}
