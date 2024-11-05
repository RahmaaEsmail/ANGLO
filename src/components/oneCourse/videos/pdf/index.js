import React, { useEffect, useState } from "react";
import Modal from "../../../modal";
import {
  addNew,
  deleteIcon,
  editIcon,
  pdfIcon,
} from "../../../../assets/svgIcons";
import "./style.css";
import DeletePdf from "./deletePDf";
import EditPdf from "./editVideo";
import axios from "axios";
function PdfOpen({ openModal, setOpenModal, getFunction }) {
  const [openDelete, setOpenDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [PDFs, setPDFs] = useState([]);
  useEffect(() => {
    if (openModal) getAllMyVediosFor();
  }, [openModal]);
  const getAllMyVediosFor = async () => {
    const data_to_send = {
      lec_sub_id: openModal?.video_id ? openModal?.video_id : 0,
      type: "general",
    };

    try {
      const response = await axios.post(
        "https://Camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/lecture_pdfs.php",
        data_to_send
      );

      console.log(response.data);

      if (Array.isArray(response.data) && response.data.length !== 0) {
        setPDFs(response.data);
      } else {
        setPDFs([]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Modal
        close={() => setOpenModal(false)}
        footer={false}
        title={"PDF"}
        visible={openModal}
      >
        {PDFs && PDFs?.length ? (
          PDFs?.map(item=>{
            return <div className="pdfView">
            <span>{pdfIcon}</span>
            <a href={item?.pdf_link} target="_blanck">
              Attachment
            </a>

            <pre>
              <p onClick={() => setOpenDelete(item?.pdf_id)}>{deleteIcon}</p>
             
            </pre>
          </div>
          })
          
        ) : null}
        <p
          className="createnew"
          onClick={() => {
            setOpenEdit(openModal);
            setIsEdit(false);
          }}
        >
          <span>{addNew}</span> <span>Add / Edit PDF</span>
        </p>
      </Modal>
      <EditPdf
        getFunction={getFunction}
        openModal={openEdit}
        setOpenModal={setOpenEdit}
        edit={isEdit}
      />{" "}
      <DeletePdf
        getFunction={getFunction}
        openModal={openDelete}
        setOpenModal={setOpenDelete}
      />
    </>
  );
}

export default PdfOpen;
