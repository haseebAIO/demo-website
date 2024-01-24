'use client'
import React, { useEffect, useState } from 'react'
import './slider.css'


const slider = ({ sliderImages }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        "https://images.getbento.com/accounts/e9c30316149f0d973e280c0845ddac02/media/YTzr4InRS5e9oNEX6IW9_Noho_319_NF_740.jpg?w=1200&fit=max&auto=compress,format",
        // "https://images.getbento.com/accounts/e9c30316149f0d973e280c0845ddac02/media/YTzr4InRS5e9oNEX6IW9_Noho_319_NF_740.jpg?w=1200&fit=max&auto=compress,format",
        // "https://placekitten.com/802/402",
    ];

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (sliderImages?.length) {
            setImages(sliderImages);
        }
        else {
            setImages(slides);
        }
    }, [images])
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };
  return (
    <div>
        <div className="w-full  relative">
                <div className="overflow-hidden rounded-lg w-full">
                    <div
                        className="flex transition-transform duration-300 w-full  ease-in-out transform"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <img
                                key={index}
                                className="w-full h-[600px] object-cover "
                                src={slide}
                                alt={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                    onClick={prevSlide}
                >
                    {"<"}
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                    onClick={nextSlide}
                >
                    {">"}
                </button>
            </div>
    </div>
  )
}

export default slider