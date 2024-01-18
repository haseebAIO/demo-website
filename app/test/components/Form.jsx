// Form.js

import { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import axios from "axios";

const Form = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [navbarSections, setNavbarSections] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDropLogoImage = async (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", "demo_builder_folder");
      formData.append("cloud_name", "debjbymt9");
      formData.append("folder", "Cloudinary-React");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/debjbymt9/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const res = await response.json();
        setLogoImage(res.secure_url);
        console.log("testing: response: ", res);
      } catch (err) {
        console.log("testing: error: ", err);
      }
      setLoading(false);
    } else {
      alert("Please upload only one image for the logo.");
    }
  };

  const onDropSliderImages = async (acceptedFiles) => {
    if (acceptedFiles.length >= 4) {
      setLoading(true);
      const images_url = [];
      try {
        const uploaders = acceptedFiles.map(async (file) => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "demo_builder_folder"); // Replace the preset name with your own
          formData.append("cloud_name", "debjbymt9");
          formData.append("folder", "Cloudinary-React");

          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios
            .post(
              "https://api.cloudinary.com/v1_1/debjbymt9/image/upload",
              formData,
              {
                headers: { "X-Requested-With": "XMLHttpRequest" },
              }
            )
            .then((response) => {
              const data = response.data;
              const fileURL = data.secure_url; // You should store this URL for future references in your app
              images_url.push(fileURL);
            });
        });

        // Once all the files are uploaded
        await axios.all(uploaders);
        setSliderImages(images_url);
      } catch (err) {
        console.log("testing: multi error: ", err);
      }
      setLoading(false);
    } else {
      alert("Please upload at least 4 images for the slider.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (
      !logoImage ||
      navbarSections.length === 0 ||
      sliderImages.length < 4 ||
      !titleText ||
      !subtitleText
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    try {
      // Prepare the data to be passed to the preview page
      const formData = {
        logoImage,
        navbarSections,
        sliderImages,
        titleText,
        subtitleText,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
      router.push("/preview");
    } catch (error) {
      console.error("Error converting images to base64:", error);
      alert("An error occurred while processing the images.");
    }
  };

  const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg", ".jpeg"],
      },
      onDrop: onDropLogoImage,
      multiple: false,
    });

  const {
    getRootProps: getRootPropsSlider,
    getInputProps: getInputPropsSlider,
  } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: onDropSliderImages,
  });

  return (
    <form className="max-w-screen-md mx-auto mt-8" onSubmit={handleSubmit}>
      {/* Logo Image */}
      <div className="mb-4">
        <label
          htmlFor="logoImage"
          className="block text-sm font-medium text-gray-700"
        >
          Logo Image
        </label>
        <div {...getRootPropsLogo()} className="dropzone">
          <input {...getInputPropsLogo()} />
          <p className="p-1 text-[#cc4545] border-blue-100 border-2">
            Drag 'n' drop an image, or click to select a file
          </p>
        </div>
        {loading && (
          <div className="mt-2">
            <p>Loading ..... </p>
          </div>
        )}
        {logoImage && (
          <div className="mt-2">
            <p>Image Uploaded</p>
          </div>
        )}
      </div>

      {/* Navbar Sections */}
      <div className="mb-4">
        <label
          htmlFor="navbarSections"
          className="block text-sm font-medium text-gray-700"
        >
          Navbar Sections
        </label>
        <TagsInput
          value={navbarSections}
          onChange={(tags) => setNavbarSections(tags)}
          inputProps={{ placeholder: "Press Tab to add a tag" }}
        />
      </div>

      {/* Slider Images */}
      <div className="mb-4">
        <label
          htmlFor="sliderImages"
          className="block text-sm font-medium text-gray-700"
        >
          Slider Images (min 4)
        </label>
        <div {...getRootPropsSlider()} className="dropzone">
          <input {...getInputPropsSlider()} />
          <p className="p-1 text-[#cc4545] border-blue-100 border-2">
            Drag 'n' drop at least 4 images, or click to select files
          </p>
        </div>
        {loading && (
          <div className="mt-2">
            <p>Loading ..... </p>
          </div>
        )}
        {sliderImages.length > 0 && (
          <div className="mt-2">
            <p>Uploaded {sliderImages.length} images</p>
          </div>
        )}
      </div>

      {/* Title and Subtitle Text */}
      <div className="mb-4">
        <label
          htmlFor="titleText"
          className="block text-sm font-medium text-gray-700"
        >
          Title Text
        </label>
        <input
          type="text"
          id="titleText"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="subtitleText"
          className="block text-sm font-medium text-gray-700"
        >
          Subtitle Text
        </label>
        <input
          type="text"
          id="subtitleText"
          value={subtitleText}
          onChange={(e) => setSubtitleText(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
