import React ,{useState,useRef}from 'react'
// import "./Document.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicationForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [applications, setApplications] = useState([]);
    const [docName,setDocName] = useState("");
    const [document,setDocument] = useState([]);
    const [activeButton, setActiveButton] = useState("choose");
    const [selectedDocument, setSelectedDocument] = useState(0);
    const [file,setFile]=useState();
    const fileInputRef = useRef(null); 
    const [uploadStatus, setUploadStatus] = useState("pending");
    const handleFile=(e)=>{
      setFile(e.target.files[0]);
    }

    
    const handleSave = () => {
        setApplications([...applications,inputValue]);
        setShowModal(false);
        setInputValue(""); 
      };

      const handleDelete = (index) => {
        const updatedApplication = applications.filter((_, i) => i !== index);
        setApplications(updatedApplication);
      };
      const handleAddDocument = () => {
        setDocument([...document,docName]);
        setDocModal(false);
        setDocName("");
      };
    
      const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
        if (buttonType === "choose" && fileInputRef.current) {
            setUploadStatus("pending");
            fileInputRef.current.click(); // Step 2: Trigger file input on "Choose" click
        }
        if(buttonType === "cancel"){
            setFile(null);
            setActiveButton("choose");
            setUploadStatus("");
        }
       
        
    }
    const handleUpload = () => {
        if (file) {
        
          setActiveButton("choose");
          setTimeout(() => {
            setUploadStatus("completed");
          }, 1000);
        }
      };

    const handleDocumentClick = (index) => {
        setSelectedDocument(index);
    };

  return (
    <div>
        <div className="d-flex justify-content-between my-5 mx-4 ">
        <h1 className="text-muted"><b>Document Upload</b></h1>
        <button className="btn btn-primary btn-lg " onClick={()=>setShowModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Add Application
            </button>
        </div>
        {applications.length > 0 && (
        <div className="d-flex flex-row flex-wrap mx-3">
          {applications.map((app, index) => (
            <div className="d-flex align-items-center me-3 mb-3 " key={index}>
              <p className="text-primary me-3 mb-0" ><b>{app}</b></p>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => handleDelete(index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
        
        <div className="card " >
            {applications.length > 0 && document == 0 ? (
                <div className="d-flex flex-column align-items-start mt-5 mx-5">
                <h6 className="text-muted me-3  mb-4">No documents available</h6>
                <button className="btn btn-primary btn-lg  " onClick={()=>setDocModal(true)}>
                    <i className="bi bi-plus-lg me-4"></i>Add
                </button>
                </div>
             ): applications.length > 0 ? (
        <div className="d-flex flex-row flex-wrap mx-3">
            <div className="mt-4">
            {document.map((doc, index) => (
             <div 
             className={`d-flex align-items-center me-3 mb-3 p-2 rounded ${selectedDocument === index ? "bg-primary text-light" : "bg-light"}`} 
             key={index} 
             onClick={() => handleDocumentClick(index)}
             style={{ cursor: "pointer" }}
         >
             <p className="me-3 mb-0 ps-4"><b>{doc}</b></p>
         </div>
          ))}
           <div>
                <button className='btn btn-primary btn-lg' onClick={()=>setDocModal(true)}>
                    <i className="bi bi-plus-lg me-4"></i>Add
                </button>
            </div>
            </div>
           

            <div class="card mt-4 w-75" style={{marginLeft:"50px",marginRight:"50px"}}>
             <div class="card-header">
             <button
                className={`  btn btn-primary btn-lg me-4 ${activeButton === "choose" ? "active" : ""}`}
                onClick={() => handleButtonClick("choose")}
              >
                <i className="bi bi-plus-lg me-2"></i><b>Choose</b>
              </button>
              <button
                className={`btn btn-primary btn-lg me-4 ${file ? "active" : "disabled"}`}
                // onClick={() => handleButtonClick("upload")}
                onClick={handleUpload}
              >
                <i className="bi bi-upload me-2"></i><b>Upload</b>
              </button>
              <button
                className={ `  btn btn-primary btn-lg me-4 ${file ? "active" : "disabled"}`}
                onClick={() => handleButtonClick("cancel")}
              >
                <i className="bi bi-x-lg me-2"></i><b>Cancel</b>
              </button>
             </div>
             
             <div className="card-body d-flex flex-column align-items-start ">
             <input
                        type="file"
                        className="d-none"
                        ref={fileInputRef} 
                        onChange={handleFile}
                    />
                    {file ? (
                        <p className="my-5">{file.name} {uploadStatus === "pending" && (
                            <span className="badge rounded-pill bg-warning">Pending</span>
                          )}
                          {uploadStatus === "completed" && (
                            <span className="badge rounded-pill bg-success">Completed</span>
                          )}</p>
                    ) : (
                        <p className="my-5">Drag and Drop files here</p>
                    )}
             
             </div>
           </div>
        </div>
      
           ):null }
               
            <div class="card-body d-flex justify-content-between my-5 mx-4">
               <button className="btn btn-primary btn-lg"><i className="bi bi-arrow-left me-2"></i>Back</button>
               <button className="btn btn-primary btn-lg">Next<i className="bi bi-arrow-right ms-2"></i></button>
            </div>
        </div>
        {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Application</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body ">
              <form className=''>
                  <div className="mb-3 ">
                    <label htmlFor="applicationName" className="fs-6 text-start w-100 mb-1 ms-1">Name</label>
                    <input type="text" 
                    name="applicationName" 
                    className="form-control"  
                    value={inputValue} 
                    onChange={(e) =>setInputValue(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
            
                <button type="button" className="btn btn-primary btn-lg" onClick={handleSave}><i className="bi bi-check-lg me-2"></i>Save </button>
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setShowModal(false)}>
                <i className="bi bi-x-lg me-2"></i>Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    {docModal && (
            <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add Document</h5>
                    <button type="button" className="btn-close" onClick={() => setDocModal(false)}></button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="documentName" className="fs-6 text-start w-100 mb-1 ms-1">Document Name</label>
                        <input
                        type="text"
                        name="documentName"
                        className="form-control"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        />
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleAddDocument}>
                    <i className="bi bi-check-lg me-2"></i>Upload
                    </button>
                    <button type="button" className="btn btn-secondary btn-lg" onClick={() => setDocModal(false)}>
                    <i className="bi bi-x-lg me-2"></i>Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}

      {/* Overlay to Close Modal */}
      {(showModal || docModal) && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
    </div>
  )
}

export default ApplicationForm
