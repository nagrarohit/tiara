import Image from "next/image";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Tiara </title>
        <meta name="discription" content="Tiara , A piece of Beauty"></meta>
        Hey! This is Tiara Website made for jewelerry sellinig basically a
        e-commerce website.
        <div className="mx-4"> This is me</div>
      </Head>
      <Navbar></Navbar>
      <div>
        <img src="/home.jpg"></img>
      </div>
      <Footer></Footer>
    </div>
  );
}
