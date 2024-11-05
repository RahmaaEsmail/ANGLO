import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../utils/baseUrl";
import { uploadPdf } from "../../../../utils/functions/upload_pdf";
import Loader from "../../../loader";
import Modal from "../../../modal";
import Toast from "../../../toast";
import { useParams } from "react-router-dom";

function EditPdf({ edit, getFunction, openModal, setOpenModal }) {
  const [PdfData, setPdfData] = useState({
    loading: false,
  });

  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (edit) {
      setPdfData({
        ...openModal,

        loading: false,
      });
    } else {
      setPdfData({
        ...{},

        loading: false,
      });
    }
  }, [openModal, edit]);
  const { subject, type } = useParams();

  const AddEditPdf = async () => { 
    let pdf = null;
    if (PdfData?.file) {
      pdf = await uploadPdf(PdfData?.file);
    }
    alert(subject)

    let data_to_send = { 
      pdf_name: PdfData?.pdf_name,
      pdf_link: pdf,
      pdf_sub_id: openModal?.video_id, // Assuming it's the subject id
      type: "general", // Using selectedType state
    };

    console.log(JSON.stringify(data_to_send));

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
        type: resData,
        message: resData,
      });
      getFunction()
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <>
      <Modal
        close={() => setOpenModal(false)}
        footer={false}
        title={edit ? "Edit Pdf" : "Add PDF"}
        visible={openModal}
      >
        <form onSubmit={(e) => e.preventDefault()} className="animated-form">
          
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

export default EditPdf;
