import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import CircuitTraces from "../components/CircuitTraces";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import NavDrawer from "../components/NavDrawer";
import PortalTransition from "../components/PortalTransition";

type PortalTheme = "drawing" | "wildlife";

const Home = () => {
  const router = useRouter();
  const [portal, setPortal] = useState<{ dest: string; theme: PortalTheme } | null>(null);

  return (
    <>
      <Head>
        <title>{`Mohit Patwari — Engineer & Builder`}</title>
        <meta
          name="description"
          content={`Portfolio of Mohit Patwari — final year CS engineer building at the intersection of software, data, and systems.`}
        />
        <meta property="og:title" content={`Mohit Patwari — Engineer & Builder`} />
        <meta
          property="og:description"
          content={`Portfolio of Mohit Patwari — final year engineering student building scalable, immersive web experiences.`}
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a1628" />
      </Head>

      <NavDrawer />
      <Navbar />

      <main className="relative bg-subtle-grid bg-grid">
        <Hero />

        <div className="overflow-hidden border-y border-borderline/40 py-2 bg-sapphire/60" aria-hidden="true">
          <div className="ticker-track flex whitespace-nowrap w-max">
            {[0, 1].map((i) => (
              <span key={i} className="font-mono text-[10px] tracking-[0.2em] text-tealcyber/50 px-12">
                SYSTEMS ONLINE &nbsp;•&nbsp; BUILD PASSING &nbsp;•&nbsp; AVAILABLE_FOR_HIRE &nbsp;•&nbsp; STACK: POLYGLOT &nbsp;•&nbsp; OPEN_TO_OPPORTUNITIES &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>

        <CircuitTraces className="w-full h-32 opacity-60" />
        <div className="section-bg-dots section-panel-top overflow-hidden">
          <About />
        </div>
        <CircuitTraces className="w-full h-24 opacity-40" />
        <div className="section-bg-lines section-panel-top overflow-hidden">
          <Education />
        </div>
        <CircuitTraces className="w-full h-32 opacity-50" />
        <div className="section-bg-grid section-panel-top overflow-hidden">
          <Skills />
        </div>
        <CircuitTraces className="w-full h-24 opacity-40" />
        <div className="section-bg-diagonal section-panel-top overflow-hidden">
          <Projects />
        </div>
        <CircuitTraces className="w-full h-24 opacity-40" />
        <section id="creative" className="section mx-auto max-w-6xl px-6">
          <p className="mono-label">// THERE_IS_MORE</p>
          <h2 className="font-display text-3xl md:text-4xl text-lemon glow-lemon mt-2">
            Other Dimensions
          </h2>
          <p className="font-body text-butter/60 mt-2 max-w-lg">
            The operator exists beyond the terminal. Enter if you are curious.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button
              type="button"
              onClick={() => setPortal({ dest: "/creative/drawing", theme: "drawing" })}
              className="group cursor-pointer rounded-xl border border-rust/30 bg-royal p-6 text-left transition-all duration-300 hover:border-rust/60 hover:bg-glow"
            >
              <p className="mono-label text-rust/60">CREATIVE_OUTPUT</p>
              <p className="font-display text-2xl text-rust mt-2">Drawing</p>
              <p className="font-body text-sm text-butter/50 mt-2">
                Sketches, fan art, ink work.
              </p>
              <span className="inline-block text-rust mt-2 transition-transform group-hover:translate-x-2">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPortal({ dest: "/creative/wildlife", theme: "wildlife" })}
              className="group cursor-pointer rounded-xl border border-tealcyber/30 bg-royal p-6 text-left transition-all duration-300 hover:border-tealcyber/60 hover:bg-glow"
            >
              <p className="mono-label text-tealcyber/60">FIELD_RECON</p>
              <p className="font-display text-2xl text-tealcyber mt-2">Wildlife</p>
              <p className="font-body text-sm text-butter/50 mt-2">
                Butterflies, moths, fungi, one cat.
              </p>
              <span className="inline-block text-tealcyber mt-2 transition-transform group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </section>
        <CircuitTraces className="w-full h-24 opacity-40" />
        <div className="section-bg-dots section-panel-top overflow-hidden">
          <Contact />
        </div>
      </main>

      <PortalTransition
        isActive={portal !== null}
        destination={portal?.dest ?? ""}
        theme={portal?.theme ?? "drawing"}
        onComplete={() => {
          if (portal) router.push(portal.dest);
        }}
      />
    </>
  );
};

export default Home;
