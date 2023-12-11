import Head from "next/head";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCoatHangerThin } from "react-icons/pi";
import { MdOutlineRedeem } from "react-icons/md";
import { FaGooglePay } from "react-icons/fa";
import { BsPaypal } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tiara </title>
        <meta name="description" content="Tiara , A piece of Beauty"></meta>
        Hey! This is Tiara Website made for jewelerry sellinig basically a
        e-commerce website.
      </Head>

      <div>
        <section className="bg-center bg-contain bg-no-repeat bg-[url('/home.jpg')] bg-gray-400 bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              We produce the best ornaments.
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              Here at tiara we focus on quality where design, uniqueness, and
              care can unlock exceptional growth of the products.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="/rings"
                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
              >
                Shop Now
              </a>
            </div>
          </div>
        </section>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h3 className="mb-4 mt-6 text-3xl font-extrabold text-gray-900 text-center dark:text-white md:text-5xl lg:text-8xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Collections
            </span>
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              On Sale!
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="grid gap-6 ">
              <div>
                <a href="/rings">
                  <img
                    className=" custom-image"
                    src="/rings.jpg"
                    alt=""
                    width="610"
                    height="768"
                  />
                </a>
              </div>
              <div>
                <a href="/hairclips">
                  <img
                    className="custom-image "
                    src="/hairclips.jpg"
                    alt=""
                    width="610"
                    height="500"
                  />
                </a>
              </div>
              <div>
                <a href="/noserings">
                  <img
                    className=" custom-image"
                    src="/noserings.jpg"
                    alt=""
                    width="610"
                    height="566"
                  />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <a href="/bangles">
                  <img
                    className="custom-image"
                    src="/bangles.jpg"
                    alt=""
                    width="610"
                    height="598"
                  />
                </a>
              </div>
              <div>
                <a href="perfumes">
                  <img
                    className="custom-image"
                    src="/perfumes.jpg"
                    alt=""
                    width="610"
                    height="854"
                  />
                </a>
              </div>
              <div>
                <a href="/earings">
                  <img
                    className="custom-image"
                    src="/earings.jpg"
                    alt=""
                    width="610"
                    height="382"
                  />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <a href="/necklace">
                  <img
                    className="custom-image"
                    src="/necklace.jpg"
                    alt=""
                    width="610"
                    height="850"
                  />
                </a>
              </div>
              <div>
                <a href="/handcuffs">
                  <img
                    className="custom-image"
                    src="/handcuffs.jpg"
                    alt=""
                    width="610"
                    height="464"
                  />
                </a>
              </div>
              <div>
                <a href="/cufflinks">
                  <img
                    className="custom-image"
                    src="/cufflinks.jpg"
                    alt=""
                    width="610"
                    height="520"
                  />
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <a href="/glasses">
                  <img
                    className="custom-image"
                    src="/glasses.jpg"
                    alt=""
                    width="610"
                    height="422"
                  />
                </a>
              </div>
              <div>
                <a href="/watches">
                  <img
                    className="custom-image"
                    src="/watches.jpg"
                    alt=""
                    width="610"
                    height="1024"
                  />
                </a>
              </div>
              <div>
                <a href="/bags">
                  <img
                    className="custom-image"
                    src="/bags.jpg"
                    alt=""
                    width="610"
                    height="388"
                  />
                </a>
              </div>
            </div>
          </div>
          <figure className="max-w-screen-md mx-auto mt-16 text-center">
            <svg
              className="w-10 h-10 mx-auto mb-3 text-black dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 dark:text-gray-700">
                "Adorn yourself with elegance, embrace the allure of Tiara –
                where every piece tells a story of timeless beauty and refined
                craftsmanship."
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                <cite className="pe-3 font-medium text-gray-900 dark:text-gray-700">
                  nagrarohit
                </cite>
                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
                  CEO at Tiara
                </cite>
              </div>
            </figcaption>
          </figure>
          <div className="flex flex-wrap -mx-4 mt-16">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-12 h-12 mx-auto inline-flex items-center justify-center rounded-full bg-black text-black-500 mb-4">
                  <PiCoatHangerThin className="text-3xl text-white" />
                </div>
                <h2 className="text-xl md:text-lg lg:text-xl text-gray-900 font-bold title-font mb-2">
                  Premium Products
                </h2>
                <p className="leading-relaxed text-base">
                  Our jewelry is carefully crafted.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-12 h-12 mx-auto inline-flex items-center justify-center rounded-full bg-black text-black-500 mb-4">
                  <LiaShippingFastSolid className="text-3xl text-white" />
                </div>
                <h2 className="text-xl md:text-lg lg:text-xl text-gray-900 font-bold title-font mb-2">
                  Free Shipping
                </h2>
                <p className="leading-relaxed text-base">
                  We ship all over India for free.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-12 h-12 mx-auto inline-flex items-center justify-center rounded-full bg-black text-black-500 mb-4">
                  <MdOutlineRedeem className="text-3xl text-white" />
                </div>
                <h2 className="text-xl md:text-lg lg:text-xl text-gray-900 font-bold title-font mb-2">
                  Amazing Offers!
                </h2>
                <p className="leading-relaxed text-base">
                  We provide amazing offers & discounts on our products.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 w-full ">
            {" "}
            <FaGooglePay className="text-7xl text-blue-600 " />
            <BsPaypal className="text-7xl text-sky-400 ml-8" />
            <FaCcMastercard className="text-7xl text-yellow-500 ml-8" />
            <RiVisaLine className="text-7xl text-lime-500 ml-8" />
          </div>
        </div>
      </section>
    </div>
  );
}
