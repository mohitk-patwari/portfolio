import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import ConstellationSkills from "../components/ConstellationSkills";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <Head>
        <title>{`Mohit Patwari \u2014 Engineer & Builder`}</title>
        <meta
          name="description"
          content={`Portfolio of Mohit Patwari \u2014 final year CS engineer building at the intersection of software, data, and systems.`}
        />
        <meta
          property="og:title"
          content={`Mohit Patwari \u2014 Engineer & Builder`}
        />
        <meta
          property="og:description"
          content={`Portfolio of Mohit Patwari \u2014 final year engineering student building scalable, immersive web experiences.`}
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a1628" />
      </Head>

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Education />
        <ConstellationSkills />
        <Projects />
      </main>
    </>
  );
};

export default Home;
