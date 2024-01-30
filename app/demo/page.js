"use client";

import React, { useEffect, useState } from "react";

// ... (previous imports)

const Page = () => {
    const [jsonData, setJsonData] = useState(null);
    const [formData, setFormData] = useState({});
    const [modifiedData, setModifiedData] = useState(null); // New state to hold the modified data
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/api");
          let data = await response.json();
          data = JSON.parse(data.data);
          console.log("testing: ", data.templates[0]);
          setJsonData(data.templates[0]);
          setModifiedData(data.templates[0]); // Initialize modifiedData with a copy of jsonData
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
  
    const handleChange = async (pageName, placeholderName, value) => {
      // Upload image if type is image
      const url =
        modifiedData.pages.find((page) => page.name === pageName).placeholders[
          placeholderName
        ].type === "image"
          ? await uploadData(value)
          : "";
  
      // Update modifiedData with new value
      setModifiedData((prevData) => {
        return {
          ...prevData,
          pages: prevData.pages.map((page) => {
            if (page.name === pageName) {
              return {
                ...page,
                placeholders: {
                  ...page.placeholders,
                  [placeholderName]: url || value
                },
              };
            }
            return page;
          }),
        };
      });
  
      // Update formData with new value
      setFormData((prevData) => {
        return {
          ...prevData,
          [pageName]: {
            ...prevData[pageName],
            [placeholderName]: {
              value: url || value,
              type: modifiedData.pages.find((page) => page.name === pageName)
                .placeholders[placeholderName].type,
            },
          },
        };
      });
    };
  
    const handleSubmit =async () => {
      console.log("testing: form data: ", formData);
      console.log("testing: modified data: ", modifiedData);
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(modifiedData),
      });
    };
  
    return (
      <div className="flex justify-start items-start">
        {jsonData && (
          <div>
            {jsonData.pages.map((page, index) => (
              <div key={index}>
                <h1 className="ml-2 font-bold text-xl mt-2">
                  {page.name.replace(".html", "")} file placeholders
                </h1>
                <form>
                  {Object.keys(page.placeholders).map((placeholderName, key) => (
                    <div
                      key={placeholderName + key}
                      className="flex flex-col p-2 border-black-100 border-b-2"
                    >
                      <label htmlFor={placeholderName}>{placeholderName}</label>
                      {page.placeholders[placeholderName].type === "image" ? (
                        <input
                          type="file"
                          className="border-blue-100 border-2"
                          id={placeholderName}
                          onChange={(e) =>
                            handleChange(
                              page.name,
                              placeholderName,
                              e.target.files[0]
                            )
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          className="border-blue-100 border-2"
                          id={placeholderName}
                          onChange={(e) =>
                            handleChange(
                              page.name,
                              placeholderName,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </form>
              </div>
            ))}
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
