import React, { useState } from "react";
import Modal from "../../../modal";
import axios from "axios";
import "./style.css";
import Toast from "../../../toast";
import Loader from "../../../loader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

function AddVideo({ getFunction, openModal, setOpenModal }) {
  const { day, lecture } = useParams();
  const [search] = useSearchParams()
  const [videoData, setVideoData] = useState({
    video_title: "",
    viemo_id: "",
    video_description: "",
    video_image_link:
      "https://res.cloudinary.com/duovxefh6/image/upload/v1727257549/WhatsApp_Image_2024-09-25_at_12.35.51_f6bf2992_yagbkw.jpg", 
    lec_id: lecture, 
    loading: false,
  });

  const [toast, setToast] = useState({ show: false, message: "" });
const navigate = useNavigate()
  const saveNewVideo = async (e) => {
    e.preventDefault();

    
    if (videoData.video_title.trim() === "") {
      setToast({ show: true, message: "الرجاء كتابة عنوان للفيديو" });
      return;
    }

    if (videoData.viemo_id.trim() === "") {
      setToast({ show: true, message: "الرجاء كتابة ال ID الخاص بالفيديو" });
      return;
    }

    setVideoData({ ...videoData, loading: true });

    const dataToSend = {
      video_title: videoData.video_title,
      lec_id: videoData.lec_id,
      video_description: videoData.video_description || " ", 
      viemo_id: videoData.viemo_id,
      generation_id: videoData.generation_id,
      video_image_link: videoData.video_image_link,
    type:"laptop"
  };

    try {
      const response = await axios.post(
        "https://camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/upload_video_data.php",
        dataToSend
      );

      if (response.data != 'error') {
        setToast({type:"success", show: true, message: "تمت الإضافة بنجاح" });
        setOpenModal(false);
        navigate("?lec_videos_ids="+response.data)
        window.location.reload()
        getFunction(); 
      } else {
        setToast({ show: true, message: "حدث خطأ ما من فضلك حاول مره اخرى" });
      }
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "حدث خطأ ما من فضلك حاول مره اخرى" });
    } finally {
      setVideoData({ ...videoData, loading: false });
    }
  };

  return (
    <>
    <Modal
      close={() => setOpenModal(false)}
      footer={false}
      title={"Add Video"}
      visible={openModal}
    >
      <form onSubmit={saveNewVideo} className="animated-form">
        <div className="form-group">
          <label htmlFor="videoTitle" className="animated-label">
            Enter Video Title
          </label>
          <input
            type="text"
            id="videoTitle"
            placeholder="Video Title"
            value={videoData.video_title}
            onChange={(e) =>
              setVideoData({ ...videoData, video_title: e.target.value })
            }
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="viemoId" className="animated-label">
            Enter Video ID (Vimeo ID)
          </label>
          <input
            type="text"
            id="viemoId"
            placeholder="Vimeo ID"
            value={videoData.viemo_id}
            onChange={(e) =>
              setVideoData({ ...videoData, viemo_id: e.target.value })
            }
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoDescription" className="animated-label">
            Enter Description
          </label>
          <textarea
            id="videoDescription"
            placeholder="Description"
            value={videoData.video_description}
            onChange={(e) =>
              setVideoData({ ...videoData, video_description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="videoImage" className="animated-label">
            Enter Image URL
          </label>
          <input
            type="text"
            id="videoImage"
            placeholder="Image URL"
            value={videoData.video_image_link}
            onChange={(e) =>
              setVideoData({ ...videoData, video_image_link: e.target.value })
            }
            className="animated-input"
          />
        </div>
        <div className="rowEndDiv">
          {videoData.loading ? (
            <Loader />
          ) : (
            <button type="submit" className="btn animated-btn btn-success">
              Save
            </button>
          )}
        </div>
       
      </form>
    </Modal>
    <>
    {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: "" })}
          />
        )}</>
    </>
  );
}

export default AddVideo;
