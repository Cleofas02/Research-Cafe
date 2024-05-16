import React, { useState, useRef, useEffect } from 'react';
import { storage } from "../config/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../config/config";
import { collection, addDoc } from "firebase/firestore";
import { Navbar } from './Navbar';

const UploadPdft = () => {


  









 const [files, setFiles] = useState([]);
 const [metadataFields, setMetadataFields] = useState({
     researchMethod: "",
     researchTitle: "",
    authors: "",
    strands: "",
    citation: "",
    publicationDate: "",
 });
 const [percent, setPercent] = useState(0);
 const [pdfData, setPdfData] = useState([]); // Manage pdfData state here
 const fileInputRef = useRef();

 const handleMetadataChange = (e) => {
    setMetadataFields({
      ...metadataFields,
      [e.target.name]: e.target.value,
    });
 };

 const handleChange = (e) => {
    setFiles([...e.target.files]);
 };

 const handleReset = () => {
    setFiles([]);
    setMetadataFields({
      researchMethod: "",
      researchTitle: "",
      authors: "",
      strands: "",
      citation: "",
      publicationDate: "",
    });
    setPercent(0);
 };

 const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select files to upload!");
      return;
    }

    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPercent(progress);
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
              const docRef = await addDoc(collection(db, "pdfs"), {

                researchMethod: metadataFields.researchMethod,
                researchTitle: metadataFields.researchTitle,
                authors: metadataFields.authors,
                strands: metadataFields.strands,
                citation: metadataFields.citation,
                publicationDate: metadataFields.publicationDate,
                url: url,
              });
              resolve({ url, name: file.name, author: metadataFields.authors, citation: metadataFields.citation,  strand: metadataFields.strands, publicationDate: metadataFields.publicationDate, metadata: metadataFields });
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((results) => {
        setPdfData(prevPdfData => [...prevPdfData, ...results]);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      });
 };

 // Show alert after pdfData state has been updated
 useEffect(() => {
    if (pdfData.length > 0) {
      alert("All files uploaded successfully!");
    }
 }, [pdfData]);



return (


    <>
    <Navbar/>
    <br/>
    

    <div className='flex flex-col space-y-4 w-96 mx-auto bg-white p-4 rounded-lg border border-solid border-slate-900 mt-18'>
      <h1 className='text-center text-2xl font-bold '>Upload Research</h1>
 <div className="flex flex-col">
    <label htmlFor="researchMethod" className="text-sm font-medium text-gray-700">Research Method:</label>
     <select name="researchMethod" value={metadataFields.researchMethod} onChange={handleMetadataChange} className="border border-solid border-slate-900 mt-1 block w-full py-2 px-3 border-black border-solid bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="">--Select Research --</option>
        <option value="Qualitative">Qualitative</option>
        <option value="Quantitative">Quantitative</option>
        <option value="Mixed Method">Mixed Method</option>
    </select> 
 </div>
 <div className="flex flex-col">
    <label htmlFor="researchTitle" className="text-sm font-medium text-gray-700">Research Title:</label>
    <input type="text" name="researchTitle" value={metadataFields.researchTitle} onChange={handleMetadataChange} className="border border-solid border-slate-900 mt-1 block w-full p-2 rounded-md border-black border-solid focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
 </div>
 <div className="flex flex-col">
    <label htmlFor="authors" className="text-sm font-medium text-gray-700">Authors:</label>
    <input type="text" name="authors" value={metadataFields.authors} onChange={handleMetadataChange} className="border border-solid border-slate-900 mt-1 block w-full p-2 rounded-md border-black border-solid focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
 </div>
 <div className="flex flex-col">
    <label htmlFor="authors" className="text-sm font-medium text-gray-700">Citation:</label>
    <input type="text" name="citation" value={metadataFields.citation} onChange={handleMetadataChange} className="border border-solid border-slate-900 mt-1 block w-full p-2 rounded-md border-black border-solid focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
 </div>
 <div className="flex flex-col">
    <label htmlFor="strands" className="text-sm font-medium text-gray-700">Area/Specialization:</label>
    <select name="strands" value={metadataFields.strands} onChange={handleMetadataChange} className="border border-solid border-slate-900 mt-1 block w-full py-2 px-3 border-black border-solid bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option value="">--Select Area/Specialization--</option>
      <option value="Arts">Fine and Applied Arts</option>
<option value="Behavioral Science">Social and Behavioral Science</option>
<option value="Business">Business Administration</option>
<option value="Communication">Mass Communication and Documentation</option>
<option value="Computer Science">Mathematics and Computer Science</option>
<option value="Craft and Industry">Trade, Craft and Industry</option>
<option value="Documentation">Mass Communication and Documentation</option>
<option value="Education and Teacher Training">General Education and Teacher Training</option>
<option value="Engineering">Engineering</option>
<option value="English and Languages">English and Languages</option>
<option value="Forestry, Fisheries and Veterinary Medicine">Agriculture, Forestry, Fisheries and Veterinary Medicine</option>
<option value="General">General</option>
<option value="Humanities">Humanities</option>
<option value="Industry">Trade, Craft and Industry</option>
<option value="Jurisprudence">Law and Jurisprudence</option>
<option value="Languages">English and Languages</option>
<option value="Law">Law and Jurisprudence</option>
<option value="MAPEH">P.E/MAPEH</option>
<option value="Mathematics">Mathematics</option>
<option value="Medicine">Medicine</option>
<option value="Natural Science">Natural Science</option>
<option value="Panlipunan">Filipino and Araling Panlipunan</option>
<option value="Planning">Architecture and Town Planning</option>
<option value="Religion">Religion and Theology</option>
<option value="Science">Science</option>
<option value="Service Trades">Service Trades</option>
<option value="Social Science">Social Science</option>
<option value="Theology">Religion and Theology</option>
<option value="Veterinary Medicine">Agriculture, Forestry, Fisheries and Veterinary Medicine</option>

    </select>
 </div>
 <div className="flex flex-col">
    <label htmlFor="publicationDate" className="text-sm font-medium text-gray-700 ">Publication Date:</label>
    <input type="date" name="publicationDate" value={metadataFields.publicationDate} onChange={handleMetadataChange} className="border border-solid border-slate-900 p-2 mt-1 block w-full rounded-md border-black border-solid focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
 </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center ">
          <input type="file" ref={fileInputRef} onChange={handleChange} accept="application/pdf" multiple className="text-black" />
        </div>
        <div className="flex space-x-2">
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Upload Research</button>
          <button onClick={handleReset} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Reset</button>
        </div>
        <p className="text-black">{percent}% done</p>
      </div>
    </div>

    </>
 );

 
};

export default UploadPdft;

