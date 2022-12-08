import React, { useEffect } from "react";
import { useState, useRef } from "react";

const hostUrl = "http://localhost:4000/posts";
const defaultImage = "https://png.pngtree.com/element_our/20190604/ourmid/pngtree-office-preview-file-illustration-image_1468631.jpg"

const UploadFile = () => {

  const filePicker = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploaded, setUploaded] = useState();

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }, [selectedFile])
  

  const handleChange = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  console.log(uploaded);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("img", selectedFile);

    const res = await fetch(hostUrl, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setUploaded(data);
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <>
      <button onClick={handlePick}>Pick file</button>
      <input
        className="hidden"
        hidden={true}
        type="file"
        ref={filePicker}
        onChange={handleChange}
        accept="image/*, .png, .jpg, .gif, .web,"
      />
      <button onClick={handleUpload}>Upload now!</button>
      {/* {selectedFile && (
        // <ul>
        //   <li>Name: {selectedFile.name}</li>
        //   <li>Type: {selectedFile.type}</li>
        //   <li>Size: {selectedFile.size}</li>
        //   <li>
        //     lastModifiedDate:{" "}
        //     {selectedFile.lastModifiedDate.toLocalDateString()}
        //   </li>
        // </ul>
      )} */}
      <img src={preview ? preview : defaultImage} alt="" />
    </>
  );
};

export default UploadFile;
