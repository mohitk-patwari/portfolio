import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <>
      <Head>
        <title>{`Mohit Patwari \u2014 Full Stack Developer`}</title>
        <meta
          name="description"
          content={`Portfolio of Mohit Patwari \u2014 final year engineering student building scalable, immersive web experiences.`}
        />
        <meta
          property="og:title"
          content={`Mohit Patwari \u2014 Full Stack Developer`}
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
        <Skills />
        <Projects />
      </main>
    </>
  );
};

export default Home;
