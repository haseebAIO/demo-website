"use client";

import React, { useEffect, useState } from "react";

import { UploadButton } from "../../utils/uploadthing";

// ... (previous imports)

const Page = () => {
  const [jsonData, setJsonData] = useState(null);
  const [formData, setFormData] = useState({});
  const [primaryColor, setPrimaryColor] = useState("#ff8000");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
  const [hasCustomFont, setHasCustomFont] = useState(false);

  const gellAllPlaceholders = (data) => {
    const placeholders = data.templates.reduce((acc, template) => {
      template.pages.forEach((page) => {
        Object.entries(page.placeholders).forEach(([key, value]) => {
          acc[key] = value;
        });
      });
      return acc;
    }, {});

    return placeholders;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        let data = await response.json();
        data = JSON.parse(data.data);
        const placeholders = gellAllPlaceholders(data);
        setJsonData(placeholders);
      } catch (error) {
        console.error("Error fetching JSON file:", error);
      }
    };

    fetchData();
  }, []);

  const uploadData = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles);
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
      return res.secure_url;
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleChange = async (placeholderName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [placeholderName]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("testing: form data: ", formData);
    // console.log("testing: modified data: ", modifiedData);
    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const response = await res.json();
    localStorage.setItem("routes", JSON.stringify(response.data));
    console.log("testing: ", response);
  };

  return (
    <div className="flex justify-start items-start">
      {jsonData && (
        <div className="mt-4 w-full flex flex-col justify-center items-center">
          <form className="grid grid-cols-3 gap-x-10">
            {/* Primary Color Selection Field */}
            <div className="flex flex-col">
              <label htmlFor="primaryColorHex" className="px-2">
                Primary Color:
              </label>
              <div className="flex items-center px-2">
                <input
                  type="color"
                  id="primaryColorHex"
                  className=""
                  value={primaryColor}
                  onChange={(e) => {
                    setPrimaryColor(e.target.value);
                    handleChange("primaryColor", e.target.value);
                  }}
                />
                {/* <label htmlFor="primaryColor">Primary Color:</label> */}
                <input
                  type="text"
                  name="primaryColor"
                  id="primaryColors"
                  value={primaryColor}
                  placeholder="#ff8000"
                  className="p-1 bg-slate-50 border-2 focus-visible:outline-none"
                  onChange={(e) => {
                    setPrimaryColor(e.target.value);
                    handleChange("primaryColor", e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Secondary Color Selection Field */}
            <div className="flex flex-col">
              <label htmlFor="secondaryColorHex">Secondary Color:</label>
              <div className="flex items-center px-2">
                <input
                  type="color"
                  id="secondaryColorHex"
                  className=""
                  value={secondaryColor}
                  onChange={(e) => {
                    setSecondaryColor(e.target.value);
                    handleChange("secondaryColor", e.target.value);
                  }}
                />
                {/* <label htmlFor="primaryColor">Primary Color:</label> */}
                <input
                  type="text"
                  name="secondaryColor"
                  id="secondaryColor"
                  placeholder="#FFFFFF"
                  value={secondaryColor}
                  className="p-1 bg-slate-50 border-2 focus-visible:outline-none"
                  onChange={(e) => {
                    setSecondaryColor(e.target.value);
                    handleChange("secondaryColor", e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Font Input Field */}
            {!hasCustomFont ? (
              <div className="flex flex-col justify-center gap-1">
                <label htmlFor="fontInput">Select Font:</label>
                <select
                  name="fontInput"
                  id="fontInput"
                  className="py-2 px-1"
                  onChange={(e) => handleChange("fontInput", e.target.value)}
                >
                  <option default value="Arial">
                    Arial
                  </option>
                  <option value="Josefin Sans">Josefin Sans</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <label htmlFor="customFontName">Font Name:</label>
                <input
                  type="text"
                  name="customFontName"
                  id="customFontName"
                  className="border-blue-100 border-2 p-1"
                  onChange={(e) =>
                    handleChange("customFontName", e.target.value)
                  }
                />
              </div>
            )}

            {/* User Uploaded Font Input Group */}
            <div className="mt-2 ml-2">
              {/* YES/NO Select for upload custom font */}
              <div className="flex flex-col justify-center gap-1">
                <label htmlFor="fontInput">Upload Custom Font:</label>
                <select
                  name="customFont"
                  id="customFont"
                  className="py-2 px-1"
                  onChange={(e) => {
                    handleChange("hasCustomFont", e.target.value);
                    setHasCustomFont((s) => !s);
                  }}
                >
                  <option default value={false}>
                    No
                  </option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>

            {/* Map placeholders into form fields */}
            {Object.keys(jsonData).map((placeholderName, key) => (
              <div key={placeholderName + key} className="flex flex-col p-2">
                <label htmlFor={placeholderName}>{placeholderName}</label>
                {jsonData[placeholderName].type === "image" ? (
                  <input
                    type="file"
                    className="border-blue-100 border-2 p-1"
                    id={placeholderName}
                    onChange={async (e) => {
                      const url = await uploadData(e.target.files[0]);
                      handleChange(placeholderName, url);
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    className="border-blue-100 border-2"
                    id={placeholderName}
                    onChange={(e) =>
                      handleChange(placeholderName, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          </form>

          <div className="my-4">
            <UploadButton
              endpoint="fontUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <button
            className="m-2 p-2 border-black border-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
