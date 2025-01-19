"use client";
import React, { useState } from "react";
import axios from "axios";
import { fetchHoroImage } from "@/Components/Horo_image";
import { fetch_Planet_position } from "@/Components/Planet_pos";
import { Info } from "@/Components/Gemini";
import ReactMarkdown from "react-markdown";

interface FormData {
  name: string;
  dob: string;
  placeOfBirth: string;
  timeOfBirth: string;
  latitude?: number;
  longitude?: number;
}

const AstrologyForm = () => {
  const [svgContent, setSVGContent] = useState<string | null>(null);
  const [planetData, setPlanetData] = useState<any>(null);
  const [info, setInfo] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    placeOfBirth: "",
    timeOfBirth: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const place = e.target.value;
    setFormData((prevData) => ({ ...prevData, placeOfBirth: place }));

    if (place.length > 3) {
      try {
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            params: {
              address: place,
              key:`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
            },
          }
        );
        const { results } = response.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setFormData((prevData) => ({
            ...prevData,
            latitude: lat,
            longitude: lng,
          }));
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      console.error("Latitude and Longitude are required.");
      return;
    }

    const dataToSubmit = {
      day: new Date(formData.dob).getDate(),
      month: new Date(formData.dob).getMonth() + 1,
      year: new Date(formData.dob).getFullYear(),
      hour: parseInt(formData.timeOfBirth.split(":")[0], 10),
      min: parseInt(formData.timeOfBirth.split(":")[1], 10),
      lat: formData.latitude,
      lon: formData.longitude,
      tzone: 5.5,
    };

    try {
      const svg = await fetchHoroImage(dataToSubmit);
      setSVGContent(svg);

      const planetDataResponse = await fetch_Planet_position(dataToSubmit);
      setPlanetData(planetDataResponse);

      let string_data = JSON.stringify(planetDataResponse);
      let result = await Info(string_data);

      setInfo(result);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Astrology Form
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="placeOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Place of Birth:
            </label>
            <input
              type="text"
              id="placeOfBirth"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handlePlaceChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {formData.latitude && formData.longitude && (
              <p className="text-sm text-gray-500 mt-1">
                Latitude: {formData.latitude}, Longitude: {formData.longitude}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="timeOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Time of Birth:
            </label>
            <input
              type="time"
              id="timeOfBirth"
              name="timeOfBirth"
              value={formData.timeOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {svgContent && (
        <div
          className="mt-6 mx-auto bg-white rounded-lg shadow p-4"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ width: "350px", height: "350px" }}
        />
      )}

      {info && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Astrological Insights:
          </h3>
          <ReactMarkdown className="prose prose-sm text-gray-700">
            {info}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AstrologyForm;
