import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnnouncementPage({ user }) {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res =
        user.role === "STUDENT"
          ? await axios.get(`/api/announcements/student/${user.id}`)
          : await axios.get(`/api/announcements/all`);
      setAnnouncements(res.data);
    };
    fetchAnnouncements();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📢 Announcements</h1>
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet 📭</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map(a => (
            <div key={a.id} className="bg-white shadow p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <p className="text-gray-700 mt-2">{a.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {a.createdByRole} • {a.createdByName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
