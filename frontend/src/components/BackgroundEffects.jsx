import React from "react";

const defaultShootingStars = [
  {
    id: "star-1",
    top: "82%",
    left: "6%",
    length: 78,
    duration: 9.5,
    delay: 0.8,
    angle: -24,
    travel: 210,
  },
  {
    id: "star-2",
    top: "70%",
    left: "14%",
    length: 62,
    duration: 12,
    delay: 4.2,
    angle: -24,
    travel: 210,
  },
  {
    id: "star-3",
    top: "90%",
    left: "22%",
    length: 56,
    duration: 14,
    delay: 8,
    angle: -24,
    travel: 210,
  },
];

export default function BackgroundEffects({ shootingStars = defaultShootingStars }) {
  return (
    <div className="shooting-stars" aria-hidden="true">
      {shootingStars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            "--star-top": star.top,
            "--star-left": star.left,
            "--star-length": `${star.length}px`,
            "--star-duration": `${star.duration}s`,
            "--star-delay": `${star.delay}s`,
            "--star-angle": `${star.angle}deg`,
            "--star-travel": `${star.travel}px`,
          }}
        />
      ))}
    </div>
  );
}
