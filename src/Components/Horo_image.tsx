import { Buffer } from "buffer";

interface HoroImageParams {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone?: number; // Optional with a default value of 5.5
}

interface HoroImageResponse {
  svg: string; // Assuming the API returns an SVG string in the response
}

export async function fetchHoroImage({
  day,
  month,
  year,
  hour,
  min,
  lat,
  lon,
  tzone = 5.5, // Default value for tzone
}: HoroImageParams): Promise<string | null> {
  const api = "horo_chart_image/:chartId";
  const userId = "637012";
  const apiKey = "8487a3a807d90a9209d324041d8501a3e016b46e";

  const data: HoroImageParams = {
    day,
    month,
    year,
    hour,
    min,
    lat,
    lon,
    tzone,
  };

  const auth = "Basic " + Buffer.from(`${userId}:${apiKey}`).toString("base64");

  try {
    const response = await fetch(`https://json.astrologyapi.com/v1/${api}`, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);

    if (response.ok) {
      const result: HoroImageResponse = await response.json();
      return result.svg; // Return the SVG content directly
    } else {
      console.error("Failed to fetch data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching horo image:", error);
    return null;
  }
}
