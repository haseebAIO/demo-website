"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const YourComponent = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [logoImage, setLogoImage] = useState("");
  const [navbar, setNavbar] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Retrieve data from local storage
    const storedFormData = localStorage.getItem("formData");

    if (storedFormData) {
      // Parse the string back into a JavaScript object
      const formData = JSON.parse(storedFormData);

      const {
        logoImage,
        navbarSections,
        sliderImages,
        titleText,
        subtitleText,
      } = formData;
      setLogoImage(logoImage);
      setNavbar(navbarSections);
      setSliderImages(sliderImages);
      setTitle(titleText);
      setSubtitle(subtitleText);
    }
  }, []);

  useEffect(() => {
    let timer1 = setTimeout(() => {
      if (index === sliderImages.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, [index]);
  console.log("testing: ", navbar);

  return (
    <div className="flex flex-col">
      <div>
        <nav className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo */}
            <Image
              src={logoImage}
              height={70}
              width={100}
              alt="logo"
              className="mr-2"
            />
          </div>

          {/* Navigation Bar Section */}
          <div className="space-x-4">
            {navbar.length &&
              navbar.map((section) => (
                <a href="#" className="text-white">
                  {section}
                </a>
              ))}
            {/* Add more navigation links as needed */}
          </div>
        </nav>
      </div>
      <div className="flex mx-auto mt-5 overflow-hidden relative w-fit">
        <div className="absolute top-[35%] left-[22%] w-full">
          <h1 className="text-7xl italic font-extrabold">{title}</h1>
          <h2 className="text-5xl italic font-semibold ml-16">{subtitle}</h2>
        </div>
        <Image
          src={sliderImages[index]}
          height={500}
          width={900}
          alt="logo"
          objectFit="contain"
          className="mx-auto h-fit w-fit"
        />
      </div>
    </div>
  );
};

export default YourComponent;
