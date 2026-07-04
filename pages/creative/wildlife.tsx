import { useState } from "react";
import { motion } from "framer-motion";
import CreativeLayout from "../../components/creative/CreativeLayout";
import MasonryGrid from "../../components/creative/MasonryGrid";
import WildlifeCard from "../../components/creative/WildlifeCard";
import Lightbox from "../../components/creative/Lightbox";
import wildlifeData from "../../data/wildlife.json";

type WildlifeEntry = {
  name: string;
  scientific: string;
  fact: string;
  tag: string;
};

const data = wildlifeData as Record<string, WildlifeEntry>;

const wildlifeFiles = [
  "a female Ground Skimmer (Diplacodes trivialis)..jpg",
  "carpenter bee.jpg",
  "Common Baron butterfly (Euthalia aconthea).jpg",
  "Common Castor (Ariadne merione).jpg",
  "Common Jezebel (Delias eucharis).jpg",
  "Common Mormon.jpg",
  "fluffy grey Persian kitten.png",
  "Great Eggfly (Hypolimnas bolina), also known as the Blue Moon Butterfly..jpg",
  "Ground Skimmer (Diplacodes trivialis).jpg",
  "Handmaiden Moth (Syntomoides imaon),.jpg",
  "Hollyhock plant (Alcea rosea) and a bee for pollen.jpg",
  "IMG_20240609_145014.jpg",
  "male Plains Cupid (Chilades pandava).jpg",
  "Plains Cupid (Luthrodes pandava).jpg",
  "Red-waisted florella moth (Syngamia florella).jpg",
  "Reishi (Ganoderma lucidum).jpg",
  "Reishi mushroom (Ganoderma lucidum).jpg",
  "Spoladea recurvalis.jpg",
  "Tailed Jay (Graphium agamemnon).jpg",
  "Tailed Jay butterfly.jpg",
  "Tamil Bushbrown (Mycalesis subdita),.jpg",
];

const WildlifePage = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const activeFilename = lightbox !== null ? wildlifeFiles[lightbox] : null;
  const activeEntry = activeFilename ? data[activeFilename] : null;

  return (
    <CreativeLayout theme="wildlife">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0d1f0f] min-h-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(74,158,92,0.04) 24px, rgba(74,158,92,0.04) 25px)",
        }}
      >
        <header className="pt-20 pb-12 px-6 max-w-2xl mx-auto">
          <p className="font-mono text-xs text-[#4a9e5c]/60 tracking-[0.2em] mb-2">
            FIELD_RECON
          </p>
          <h1
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-4xl text-[#e8f5e3] font-bold"
          >
            Observations from the Field
          </h1>
          <p className="font-body text-sm text-[#e8f5e3]/50 mt-3">
            21 specimens documented. Bengaluru and surrounding regions.
          </p>
        </header>

        <div className="px-6 pb-20 max-w-7xl mx-auto">
          <MasonryGrid>
            {wildlifeFiles.map((filename, i) => {
              const entry = data[filename];
              if (!entry) return null;
              return (
                <WildlifeCard
                  key={filename}
                  src={`/hobbies/wildlife/${filename}`}
                  name={entry.name}
                  scientific={entry.scientific}
                  fact={entry.fact}
                  tag={entry.tag}
                  index={i + 1}
                  location="Bengaluru, IN"
                  onClick={() => setLightbox(i)}
                />
              );
            })}
          </MasonryGrid>
        </div>
      </motion.div>

      <Lightbox
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        src={activeFilename ? `/hobbies/wildlife/${activeFilename}` : ""}
        title={activeEntry?.name ?? ""}
        subtitle={activeEntry?.scientific}
        description={activeEntry?.fact}
        tag={activeEntry?.tag}
        theme="wildlife"
        onNext={() => setLightbox((i) => (i === null ? null : (i + 1) % wildlifeFiles.length))}
        onPrev={() =>
          setLightbox((i) =>
            i === null ? null : (i - 1 + wildlifeFiles.length) % wildlifeFiles.length
          )
        }
      />
    </CreativeLayout>
  );
};

export default WildlifePage;
