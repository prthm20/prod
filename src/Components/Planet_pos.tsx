import { Buffer } from "buffer";

// Define the types for the input parameters
interface PlanetPositionParams {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone?: number; // Optional with a default value of 5.5
}

// Define the response structure (adjust as needed based on API response)
interface PlanetPositionResponse {
  [key: string]: any; // Adjust according to the actual shape of the response
}

export async function fetch_Planet_position({
  day,
  month,
  year,
  hour,
  min,
  lat,
  lon,
  tzone = 5.5,
}: PlanetPositionParams): Promise<PlanetPositionResponse | null> {
  const api = "planets";
  const userId = "637012";
  const apiKey = `${process.env.NEXT_PUBLIC_ASTRO}`;

  const data: PlanetPositionParams = {
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

    if (response.ok) {
      const result: PlanetPositionResponse = await response.json();
      return result; // Return the fetched data
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching planet data:", error);
    throw error; // Ensure the error is handled appropriately
  }
}
