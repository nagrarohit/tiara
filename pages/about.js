import React from "react";
import Head from "next/head";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-teal-300 text-white">
      <Head>
        <title>About Me</title>
      </Head>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Hello, I'm nagrarohit</h1>
        <p className="mt-2">
          A Full Stack Developer exploring the realms of Web3.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Skills and Interests</h2>
        <p className="mt-2">
          I specialize in <span className="text-yellow-300">Solidity</span>,{" "}
          <span className="text-orange-600">JavaScript (JS)</span>,{" "}
          <span className="text-blue-500">TypeScript (TS)</span>, and{" "}
          <span className="text-red-900">Rust</span>.
        </p>
        <p className="mt-2">
          Proficient in frameworks like{" "}
          <span className="text-red-900">Next.js</span>,{" "}
          <span className="text-green-300">MongoDB</span>, and more.
        </p>
      </div>
      <div>
        <p className="text-lg">
          Currently on the lookout for new opportunities to contribute my skills
          and passion to innovative projects.
        </p>
        <p className="text-lg mt-2">
          Please hit any of the links below to get in touch!
        </p>
      </div>
    </div>
  );
};

export default About;
