import { pdfjs } from 'react-pdf';
import React, { useState, useEffect, useCallback, useRef } from "react";
import { storage } from "../config/config";
import { ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from "../config/config";
import { collection, getDocs, addDoc } from "firebase/firestore"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Addpdft() {
 const [files, setFiles] = useState([]);
 const [percent, setPercent] = useState(0);
 const [pdfData, setPdfData] = useState([]); 
 const [metadataFields, setMetadataFields] = useState({
    researchTitle: "",
    authors: "",
    strands: "",
    publicationDate: "",
 });
 const [searchQuery, setSearchQuery] = useState(""); 

 const fileInputRef = useRef(); 

 const checkForChanges = useCallback(async () => {
    const storageRef = ref(storage, '/files');
    const res = await listAll(storageRef);
    const currentFiles = await Promise.all(res.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return {
        name: item.name,
        author: item.authors, 
        strand: item.strands, 
        publicationDate: item.publicationDate, 
        url: url,
      };
    }));

    const updatedPdfData = currentFiles.map(newFile => {
      const existingPdf = pdfData.find(pdf => pdf.name === newFile.name);
      if (existingPdf) {
        return {
          ...existingPdf,
          ...newFile,
          author: existingPdf.author || newFile.author,
          strand: existingPdf.strand || newFile.strand,
          publicationDate: existingPdf.publicationDate || newFile.publicationDate,
        };
      }
      return newFile;
    });

    setPdfData(updatedPdfData);
    localStorage.setItem("pdfData", JSON.stringify(updatedPdfData));
 }, [pdfData]); 

 useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const fetchPdfData = async () => {
      const pdfsCollection = collection(db, "pdfs");
      const pdfsSnapshot = await getDocs(pdfsCollection);
      const pdfsData = pdfsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPdfData(pdfsData);
      localStorage.setItem("pdfData", JSON.stringify(pdfsData));
    };
    fetchPdfData();
    const intervalId = setInterval(() => {
      checkForChanges();
    }, 5000);
    return () => clearInterval(intervalId);
 }, [checkForChanges]);

 function handleChange(event) {
    setFiles(Array.from(event.target.files));
 }

 function handleMetadataChange(event) {
    setMetadataFields({
      ...metadataFields,
      [event.target.name]: event.target.value,
    });
 }

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
                researchMethod: metadataFields.researchMethod, // Ensure this is set
                name: file.name,
                researchTitle: metadataFields.researchTitle,
                authors: metadataFields.authors,
                strands: metadataFields.strands,
                publicationDate: metadataFields.publicationDate,
                url: url,
               });
              resolve({ url, name: file.name, author: file.authors, strand: file.strands, publicationDate: file.publicationDate, metadata: metadataFields });
            });
          }
        );
      });
    });
    Promise.all(uploadPromises)
      .then((results) => {
        const newPdfData = [...pdfData, ...results];
        setPdfData(newPdfData);
        localStorage.setItem("pdfData", JSON.stringify(newPdfData));
        alert("All files uploaded successfully!");
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      });
 };

 const handleReset = () => {
    setFiles([]);
    setPercent(0);
    setMetadataFields({
       researchTitle: "",
       authors: "",
       strands: "",
       publicationDate: "",
    });
    if (fileInputRef.current) {
       fileInputRef.current.value = null;
    }
 };

 // Filter pdfData based on searchQuery
 const filteredPdfData = pdfData.filter(pdf => {
  const query = searchQuery.toLowerCase();
  const name = pdf.name ? pdf.name.toLowerCase() : '';
  const researchTitle = pdf.researchTitle ? pdf.researchTitle.toLowerCase() : '';
  const authors = pdf.authors ? pdf.authors.toLowerCase() : '';
  const strands = pdf.strands ? pdf.strands.toLowerCase() : '';
  const publicationDate = pdf.publicationDate ? pdf.publicationDate.toLowerCase() : '';
 
  return (
     name.includes(query) ||
     researchTitle.includes(query) ||
     authors.includes(query) ||
     strands.includes(query) ||
     publicationDate.includes(query)
  );
 })

 return (
    <>






<div className="flex items-center  p-4 max-width-full ">

<div className="flex items-center">
  <label htmlFor="search" className="mr-3 text-black">Search:</label>
  <div className="relative">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="   border-2 border-black rounded-md p-2 pr-40 text-black border-slate-900"
      id="search" placeholder=''
    />
    <FontAwesomeIcon
      icon={faMagnifyingGlass}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
    />
  </div>
</div>
</div>






<div className="max-h-96 overflow-y-auto mt-5"> {/* Adjust the maxHeight as needed */}
 <table className="w-full border-collapse border-white">
    <thead>
      <tr className="bg-blue-500 text-white">
        <th className="px-4 py-2 border border-white">RESEARCH METHOD</th>
        <th className="px-4 py-2 border border-white">RESEARCH TITLE</th>
        <th className="px-4 py-2 border border-white">AUTHORS</th>
        <th className="px-4 py-2 border border-white">AREA/SPECIALIZATION</th>
        <th className="px-4 py-2 border border-white">PUBLICATION</th>
        <th className="px-4 py-2 border border-white">VIEW</th>
      </tr>
    </thead>
    <tbody>
      {filteredPdfData.map((pdf, index) => (
        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-100'}`}>
          <td className="px-4 py-2 border border-white">{pdf.researchMethod}</td> {/* Use researchMethod here */}
          <td className="px-4 py-2 border border-white">{pdf.researchTitle}</td>
          <td className="px-4 py-2 border border-white">{pdf.authors}</td>
          <td className="px-4 py-2 border border-white">{pdf.strands}</td>
          <td className="px-4 py-2 border border-white">{pdf.publicationDate}</td>
          <td className="px-4 py-2 border border-white">
            <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">View PDF {index + 1}</a>
          </td>
        </tr>
      ))}
    </tbody>
 </table>
</div>


<br/>
<br/>




      

      

    </>
);

}

export default Addpdft;
