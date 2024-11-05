import React, { useState } from "react";
import Modal from "../../modal";
import axios from "axios";
import Toast from "../../toast";
import Loader from "../../loader";
import { FaPlus } from "react-icons/fa";
import "./style.css";
import { useParams } from "react-router-dom";
import { baseUrl, secondUrl } from "../../../utils/baseUrl";

function AddSubject({ getFunction, openModal, type,  setOpenModal }) {
  const [subjectData, setSubjectData] = useState({
    subject_name: "",
    subject_description: "", 
    have_image: "0", // By default, assuming no image is uploaded
    type: type,
    loading: false,
  });

  const [toast, setToast] = useState(false);

  const saveNewSubject = async (e) => {
    e.preventDefault();

    const { subject_name, subject_description, have_image } = subjectData;

    if (subject_name.trim() === "") {
      alert("يجب إدخال اسم المادة.");
      return;
    }

    setSubjectData({ ...subjectData, loading: true });

    const formDataObj = new FormData();
    formDataObj.append("subject_name", subject_name);
    formDataObj.append("subject_description", subject_description);
    formDataObj.append("have_image", have_image);
    formDataObj.append("type", type);

    try {
      const response = await axios.post(baseUrl + "insert_subject.php", formDataObj);

      const data = response.data;
      setSubjectData({ ...subjectData, loading: false });
      // setToast(true);
      setOpenModal(false);
      getFunction();
      alert(data);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ ما من فضلك حاول مرة أخرى");
    } finally {
      setSubjectData({ ...subjectData, loading: false });
    }
  };

  return (
    <>
      <Modal
        close={() => setOpenModal(false)}
        footer={false}
        title={"Add Subject"}
        visible={openModal}
      >
        <form onSubmit={saveNewSubject} className="animated-form">
          <div className="form-group">
            <label htmlFor="subjectName" className="form-label">
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              placeholder="Enter Subject Name"
              value={subjectData.subject_name}
              onChange={(e) =>
                setSubjectData({ ...subjectData, subject_name: e.target.value })
              }
              className="form-input"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="type" className="form-label">
              Subject Type
            </label>
            <input
              type="text"
              id="type"
              placeholder="Enter Subject Type"
              value={subjectData.type}
              onChange={(e) =>
                setSubjectData({ ...subjectData, type: e.target.value })
              }
              className="form-input"
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="subjectDescription" className="form-label">
              Subject Description
            </label>
            <input
              type="text"
              id="subjectDescription"
              placeholder="Enter Subject Description"
              value={subjectData.subject_description}
              onChange={(e) =>
                setSubjectData({
                  ...subjectData,
                  subject_description: e.target.value,
                })
              }
              className="form-input"
            />
          </div>
          <div className="form-footer">
            {subjectData.loading ? (
              <Loader />
            ) : (
              <button type="submit" className="form-submit-btn">
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

export default AddSubject;
