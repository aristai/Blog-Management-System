import React, { useEffect, useState, useCallback } from "react";
import { useBlogContent } from "../context/BlogContantContext";

const TrackSave = () => {
  const { data } = useBlogContent();
  const [relativeTime, setRelativeTime] = useState("");

  // Helper function to calculate the relative time string
  const updateRelativeTime = useCallback(() => {
    const now = Date.now();
    const updatedAt = new Date(data.updated_at).getTime();
    const diffMs = now - updatedAt;
    const diffSeconds = Math.floor(diffMs / 1000);

    let text = "";

    if (diffSeconds < 60) {
      text = `Edited ${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
    } else {
      const diffMinutes = Math.floor(diffSeconds / 60);
      if (diffMinutes < 60) {
        text = `Edited ${diffMinutes} minute${
          diffMinutes !== 1 ? "s" : ""
        } ago`;
      } else {
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
          text = `Edited ${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
        } else {
          const diffDays = Math.floor(diffHours / 24);
          text = `Edited ${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
        }
      }
    }

    setRelativeTime(text);
  }, [data.updated_at]);

  // Update the relative time every second
  useEffect(() => {
    updateRelativeTime(); // initial calculation
    const interval = setInterval(updateRelativeTime, 1000);
    return () => clearInterval(interval);
  }, [data.updated_at, updateRelativeTime]);

  return <div className="text-sm text-gray-600">{relativeTime}</div>;
};

export default TrackSave;
