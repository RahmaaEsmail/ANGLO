import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../utils/baseUrl";
import { uploadPdf } from "../../../../utils/functions/upload_pdf";
import Loader from "../../../loader";
import Modal from "../../../modal";
import Toast from "../../../toast";
import CustomTable from "../../../table"; // Assuming you have a CustomTable component for displaying tables.
import { useParams } from "react-router-dom";

function PdfWithType({ edit, getFunction, openModal, setOpenModal }) {
  const [PdfData, setPdfData] = useState({
    pdf_name: "",
    pdf_sub_id: "",
    type: "general",
    file: null,
    loading: false,
  });

  const [selectedType, setSelectedType] = useState("general"); // For filtering by type
  const [pdfs, setPdfs] = useState([]); // To store fetched PDFs
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const { subject, type } = useParams();

  // Add state for opening the modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to fetch PDFs based on the selected type
  const fetchPdfsByType = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + "select_pdf_by_type.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({
          lec_sub_id: subject, // Assuming it's the subject id
          type: type, // Using selectedType state
        }),
      });

      const resData = await response.json();
      if (Array.isArray(resData)) {
        setPdfs(resData);
      } else {
        setPdfs([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfsByType(); // Fetch PDFs whenever selectedType or subject ID changes
  }, [selectedType, PdfData?.pdf_sub_id]);

  const AddEditPdf = async () => {
    let pdf = null;
    if (PdfData?.file) {
      pdf = await uploadPdf(PdfData?.file);
    }
// console.log(openModal)
    let data_to_send = {
      pdf_name: PdfData?.pdf_name,
      pdf_link: pdf,
      pdf_sub_id: openModal?.video_id, // Assuming it's the subject id
      type: type, // Using selectedType state
    };

    try {
      const response = await fetch(baseUrl + "add_pdf_types.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_send),
      });

      const resData = await response.text();
      setToast({
        type: "success",
        message: resData,
      });
      fetchPdfsByType();
      fetchPdfsByType(); 
      setIsAddModalOpen(false); 
    } catch (err) {
      console.log(err);
      setToast({
        type: "error",
        message: "Error occurred while adding PDF.",
      });
    }
  };

  // Define columns for the table
  const columns = [
    {
      key: "pdf_name",
      title: "PDF Name",
      dataIndex: "pdf_name",
    },
    {
      key: "pdf_link",
      title: "PDF Link",
      dataIndex: "pdf_link",
      render: (link) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ),
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
    },
  ];

  return (
    <>
      <div className="tablePageHeader">
        <h1 className="pageTitle">PDF Management</h1>
        <button
          className="btn btn-success"
          onClick={() => setIsAddModalOpen(true)} // Open modal for adding PDF
        >
          Add PDF
        </button>
      </div>

      {/* Modal for adding or editing PDF */}
      <Modal
        close={() => setIsAddModalOpen(false)}
        footer={false}
        title={edit ? "Edit Pdf" : "Add PDF"}
        visible={isAddModalOpen} // Use the state to control visibility
      >
        <form onSubmit={(e) => e.preventDefault()} className="animated-form">
          <div className="form-group">
            <label htmlFor="pdfName" className="animated-label">
              PDF Name
            </label>
            <input
              type="text"
              id="pdfName"
              placeholder="Enter PDF Name"
              value={PdfData?.pdf_name}
              onChange={(e) =>
                setPdfData({ ...PdfData, pdf_name: e.target.value })
              }
              className="animated-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="PdfFile" className="animated-label">
              PDF File
            </label>
            <input
              type="file"
              id="PdfFile"
              placeholder="PDF File"
              onChange={(e) =>
                setPdfData({ ...PdfData, file: e.target.files[0] })
              }
              className="animated-input"
            />
          </div>

          <div className="rowEndDiv">
            {PdfData?.loading ? (
              <Loader />
            ) : (
              <button
                onClick={() => AddEditPdf()}
                type="submit"
                className="btn animated-btn btn-success"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </Modal>


      {/* Table for displaying the PDFs */}
      <div className="pdf-table">
        {isLoading ? (
          <Loader />
        ) : (
          <CustomTable dataSource={pdfs} columns={columns} />
        )}
      </div>

      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(false)}
        />
      )}
    </>
  );
}

export default PdfWithType;
