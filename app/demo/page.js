"use client";

import React, { useEffect, useState } from "react";

// ... (previous imports)

const Page = () => {
  const [jsonData, setJsonData] = useState(null);
  const [formData, setFormData] = useState({
    primaryColor:'#ff8000',
    secondaryColor:'#FFFFFF'
  });

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
        console.log("Testing: ", placeholders);
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
    localStorage.setItem('routes',JSON.stringify(response.data));
    console.log('testing: ', response);
  };

  return (
    <div className="flex justify-start items-start">
      {jsonData && (
        <div className="mt-4 w-full flex flex-col justify-center items-center">
          <form className="grid grid-cols-3 gap-x-10">
            <div className="flex justify-between items-center px-2">
              <label htmlFor="primaryColor">Primary Color:</label>
              <input type="color" id="primaryColor" className="p-1" defaultValue={"#ff8000"} onChange={(e) => {
                handleChange('primaryColor', e.target.value)
              }}/>
            </div>
            <div className="flex justify-between items-center px-2">
              <label htmlFor="primaryColor">Secondary Color:</label>
              <input type="color" id="secondaryColor" className="p-1" defaultValue={"#FFFFFF"} onChange={(e) => {
                handleChange('secondaryColor', e.target.value)
              }}/>
            </div>
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
