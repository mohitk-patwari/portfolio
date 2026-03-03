import { motion } from "framer-motion";

type EducationEntry = {
  degree: string;
  institute: string;
  year: string;
  status: "COMPLETED" | "IN PROGRESS";
};

const educationData: EducationEntry[] = [
  {
    degree: "B.E. Computer Engineering",
    institute: "University of Mumbai",
    year: "2021 - 2025",
    status: "IN PROGRESS",
  },
  {
    degree: "HSC (Science)",
    institute: "Maharashtra State Board",
    year: "2019 - 2021",
    status: "COMPLETED",
  },
  {
    degree: "SSC",
    institute: "Maharashtra State Board",
    year: "2019",
    status: "COMPLETED",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Education = () => {
  return (
    <section id="education" className="section mx-auto max-w-6xl px-6" aria-labelledby="education-heading">
      <p className="mono-label">// CREDENTIALS.log</p>
      <h2
        id="education-heading"
        className="mt-2 font-display text-3xl text-lemon glow-lemon md:text-4xl"
      >
        Education
      </h2>

      <motion.div
        className="mt-12 space-y-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {educationData.map((item) => (
          <motion.article
            key={`${item.degree}-${item.year}`}
            variants={itemVariants}
            className="group relative border-b border-borderline/50 py-6 pl-6 pr-28 transition-colors duration-300 hover:bg-glow/30 md:pr-36"
          >
            <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-borderline transition-all duration-300 group-hover:bg-lemon group-hover:glow-box-lemon" />

            <p className="font-display text-lg tracking-wide text-butter">{item.degree}</p>
            <p className="mt-1 font-mono text-sm text-tealcyber">{item.institute}</p>
            <p className="mt-1 font-mono text-xs text-butter/40">{item.year}</p>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-4">
              <span className="rounded-full border border-tealcyber/30 bg-tealcyber/10 px-3 py-1 font-mono text-xs text-tealcyber">
                {item.status}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;
