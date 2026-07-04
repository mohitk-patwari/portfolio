import { useState } from "react";
import { motion } from "framer-motion";
import CreativeLayout from "../../components/creative/CreativeLayout";
import MasonryGrid from "../../components/creative/MasonryGrid";
import DrawingCard from "../../components/creative/DrawingCard";
import Lightbox from "../../components/creative/Lightbox";

const drawings = [
  { src: "/hobbies/drawing/Ai Hoshino from the anime Oshi no Ko..jpg", title: "Ai Hoshino", medium: "Brush pen", note: "Oshi no Ko", rotate: -3 },
  { src: "/hobbies/drawing/black and white ink drawing depicts a snowy A-frame cabin nestled in a forest of pine trees with mountains in the background..jpg", title: "Winter Cabin", medium: "Ink", note: "Original", rotate: 2 },
  { src: "/hobbies/drawing/Ellie Williams from the video game series The Last of Us..jpg", title: "Ellie Williams", medium: "Watercolor · Sakura ink", note: "The Last of Us", rotate: -2 },
  { src: "/hobbies/drawing/Kyouko Hori from the anime series Horimiya..jpg", title: "Kyouko Hori", medium: "Graphite pencil", note: "Horimiya", rotate: 3 },
  { src: "/hobbies/drawing/Miles Morales wearing a Spider-Man suit, a hoodie, and headphones..jpg", title: "Miles Morales", medium: "Graphite pencil", note: "Spider-Verse", rotate: -2 },
  { src: "/hobbies/drawing/Obito Uchiha and Rin Nohara from the anime series Naruto Shippuden..jpg", title: "Obito & Rin", medium: "Graphite pencil", note: "Naruto Shippuden", rotate: 2 },
  { src: "/hobbies/drawing/Pain from the anime series Naruto.jpg", title: "Pain", medium: "Watercolor · acrylic · plastic crayons · Sakura ink", note: "Naruto", rotate: -3 },
  { src: "/hobbies/drawing/Studio Colorido anime film, Drifting Home.jpg", title: "Drifting Home", medium: "Watercolor · plastic crayons · Sakura pens · white pen", note: "Studio Colorido", rotate: 3 },
  { src: "/hobbies/drawing/Suzume Iwato from the anime movie Suzume no Tojimari..jpg", title: "Suzume Iwato", medium: "Colored pencil · plastic crayon · paint · Sakura ink", note: "Suzume", rotate: -2 },
  { src: "/hobbies/drawing/Taki Tachibana and Mitsuha Miyamizu.jpg", title: "Your Name", medium: "Watercolor · poster color · acrylic · plastic crayons · Sakura ink", note: "Your Name", rotate: 2 },
  { src: "/hobbies/drawing/This black and white ink drawing, often used as a tattoo design, features an astronaut in formal wear..jpg", title: "Formal Astronaut", medium: "Ink", note: "Tattoo design", rotate: -3 },
  { src: "/hobbies/drawing/Thor.jpg", title: "Thor", medium: "Plastic crayons · oil pastels · pencil color", note: "Marvel", rotate: 3 },
  { src: "/hobbies/drawing/Violet Evergarden.jpg", title: "Violet Evergarden", medium: "Graphite pencil", note: "Violet Evergarden", rotate: -2 },
];

const DrawingPage = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const activeDrawing = lightbox !== null ? drawings[lightbox] : null;

  return (
    <CreativeLayout theme="drawing">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
        style={{
          backgroundColor: "#faf6f1",
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(193,127,58,0.04) 0%, transparent 40%),
                      radial-gradient(circle at 80% 70%, rgba(139,111,71,0.04) 0%, transparent 40%)`,
        }}
      >
        <header className="pt-20 pb-12 px-6 max-w-2xl mx-auto text-center">
          <p className="font-mono text-xs text-[#8b6f47]/60 tracking-[0.2em] mb-4">
            CREATIVE / DRAWING
          </p>
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-4xl text-[#2d2416] font-bold"
          >
            Sketchbook
          </h1>
          <p
            style={{ fontFamily: "Playfair Display, serif" }}
            className="italic text-[#8b6f47] text-base mt-4"
          >
            Sketching is how I think slowly. Colour is how I feel loudly.
          </p>
        </header>

        <div className="px-6 pb-20 py-4 max-w-7xl mx-auto">
          <MasonryGrid gapClassName="gap-8" itemGapClassName="mb-8">
            {drawings.map((drawing, index) => (
              <DrawingCard
                key={drawing.src}
                src={drawing.src}
                title={drawing.title}
                medium={drawing.medium}
                note={drawing.note}
                rotate={drawing.rotate}
                onClick={() => setLightbox(index)}
              />
            ))}
          </MasonryGrid>
        </div>
      </motion.div>

      <Lightbox
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        src={activeDrawing?.src ?? ""}
        title={activeDrawing?.title ?? ""}
        subtitle={activeDrawing?.medium}
        description={activeDrawing?.note}
        theme="drawing"
        onNext={() => setLightbox((i) => (i === null ? null : (i + 1) % drawings.length))}
        onPrev={() =>
          setLightbox((i) => (i === null ? null : (i - 1 + drawings.length) % drawings.length))
        }
      />
    </CreativeLayout>
  );
};

export default DrawingPage;
