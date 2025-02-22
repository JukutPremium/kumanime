"use client";

import Link from "next/link";
import { useState } from "react";
import handleCreateSeries from "@/action/handleCreateSeries";

export default function CreateSeriesPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Create New Series</h1>
          <Link
            href="/dashboard"
            className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            🔙 Back to Dashboard
          </Link>
        </div>
        <form action={handleCreateSeries} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={slug}
            readOnly
            className="w-full px-4 py-2 bg-gray-700 rounded text-gray-400"
          />
          <input
            type="text"
            name="banner"
            placeholder="Banner URL"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <textarea
            name="synopsis"
            placeholder="Synopsis"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <select
            name="status"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="text"
            name="studio"
            placeholder="Studio"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="season"
            placeholder="Season"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <select
            name="scheduleDay"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input
            type="text"
            name="genre"
            placeholder="Genre (separated by ; )"
            className="w-full px-4 py-2 bg-gray-800 rounded"
            required
          />
          <input
            type="text"
            name="preview"
            placeholder="Preview (optional)"
            className="w-full px-4 py-2 bg-gray-800 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="censor"
              className="form-checkbox text-green-500"
            />
            <span>Censor</span>
          </label>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          >
            Create Series
          </button>
        </form>
      </div>
    </div>
  );
}
