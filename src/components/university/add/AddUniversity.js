import React, { useState } from 'react'
import Modal from '../../modal'
import { FaTrash } from 'react-icons/fa';

export default function AddUniversity({openModal , setOpenModal}) {
    const [img , setImg] = useState(null);
    const [imgUrl , setImgUrl] = useState("");
    const [universityData , setUniversityData] = useState({
        name :"",
        image:null
    }); 

    const handleImageChange = (e) => {
      setUniversityData({ ...universityData, image: e.target.files[0] });
    };

    const removeImage = () => {
      setUniversityData({ ...universityData, image: null });
    };

    function handleSubmit(e) {
      e.preventDefault();
      console.log(universityData);
    }


  return (
    <div>
        <Modal 
      close={setOpenModal}
      footer={false}
      title={"إضافة جامعه"}
      visible={openModal}>

        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year" className="animated-label">
            ادخل اسم الجامعه
          </label>
          <input
            type="text"
            id="year"
            placeholder="University Name"
            onChange={(e) => {
              setUniversityData({ ...universityData, name: e.target.value });
            }}
            className="animated-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="animated-label">
            ادخل صوره الجامعه
          </label>
          <input
            type="file"
            id="lectureImage"
            onChange={handleImageChange}
            className="form-input"
          />
          {universityData.image && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(universityData.image)}
                alt="Lecture Preview"
              />
              <button
                type="button"
                onClick={removeImage}
                className="remove-image-btn"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <button className='btn btn-primary'>إضافة جامعه</button>
        </form>
      </Modal>
    </div>
  )
}
