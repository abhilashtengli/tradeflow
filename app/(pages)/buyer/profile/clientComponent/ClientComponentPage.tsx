"use client";

import { baseUrl } from "@/app/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Data {
  name: string;
  password: string;
  role: string;
  email: string;
  country: string;
}

export default function ClientComponentPage({ data }: { data: Data }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: undefined,
    email: undefined,
    country: undefined,
    password: undefined
  });
  const { data: session } = useSession();
  const token = session?.accessToken;
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setError("");
    setSuccess("");
    e.preventDefault();
    // Handle form submission
    const updatedData = { ...formData };
    console.log(updatedData);

    try {
      const response = await axios.patch(`${baseUrl}/user`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    console.log("Form submitted:", data);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border m-10">
      <div className="h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative">
        {/* <Image alt="banner" width="100" height="32" className="w-full h-full" src="" /> */}
      </div>
      <div className="relative px-6 py-10 sm:px-10">
        <div className="absolute -top-20 left-6 sm:left-10">
          <Image
            alt="profile"
            width="32"
            height="32"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
            src="data:image/jpeg;base64,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"
          />{" "}
        </div>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {data.name}
            </h2>
            <p className="text-gray-600">{data.email}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full shadow">
              Copy profile link
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder={data.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />{" "}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder={data.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />{" "}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Update password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />{" "}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                placeholder={data.country}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              />{" "}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Delete user
            </button>
            <button
              type="submit"
              className={`mt-4 px-4 py-2 rounded ${
                loading ? "bg-gray-400" : "bg-blue-500"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            {success && <p className="text-green-500 mt-2">{success}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
