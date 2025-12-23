import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MacbookScroll() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const frameCount = 150;

  const currentFrame = (i) =>
    `/macbook/${String(i).padStart(4, "0")}.png`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 1920;
    canvas.height = 1080;

    const images = [];
    const macbook = { frame: 1 };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function drawFrame(index) {
      const img = images[index - 1];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
      );
    }

    images[0].onload = () => drawFrame(1);

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2, // smoother Apple feel
      pin: true,
      onUpdate: (self) => {
        const eased = gsap.parseEase("power2.out")(self.progress);
        const frame = Math.max(
          1,
          Math.ceil(eased * frameCount)
        );
        drawFrame(frame);
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: "320vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* subtle screen glow */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "400px",
          background: "rgba(120,120,255,0.15)",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          maxWidth: "1400px",
          height: "auto",
          zIndex: 1,
          filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
}