import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import CircuitTraces from "../components/CircuitTraces";
import Projects from "../components/Projects";
import NavDrawer from "../components/NavDrawer";

const Home = () => {
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
      </main>
    </>
  );
};

export default Home;
