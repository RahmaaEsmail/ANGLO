import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AddVideo from "../../../components/days/videos/add";
import DeleteVideo from "../../../components/days/videos/delete";
import EditVideo from "../../../components/days/videos/edit";
import PdfOpen from "../../../components/days/videos/pdf";
import ShowHideVideo from "../../../components/days/videos/showHide";
import DropMenu from "../../../components/dropmenu";
import CustomTable from "../../../components/table";
import "./style.css";

function CategoryVideos() {
  const [videos, setVideos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openShowHideModal, setOpenShowHideModal] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { lecture, pack, yearId, group, subject, day } = useParams();
  const location = useLocation();
  const [getNew, setGetNew] = useState(null);
  const [videoData] = useSearchParams();
  useEffect(() => {
    if (
      videoData?.get("lec_videos_ids") &&
      !videoData?.get("lec_videos_ids") != null
    ) {
      setGetNew(videoData?.get("lec_videos_ids"));
    }
  }, [location.pathname, videoData?.get("lec_videos_ids")]);


  useEffect(() => {
    if (lecture) getAllMyVediosFor();
  }, [lecture]);
  const getAllMyVediosFor = async () => {
    setIsPageLoading(true);
    const data_to_send = {
      ids: videoData?.get("lec_videos_ids"),
    };

    try {
      const response = await axios.post(
        "https://camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/select_videos_lec.php",
        data_to_send
      );

      setIsPageLoading(false);
      if (Array.isArray(response?.data) && response?.data.length !== 0) {
        const allData = response?.data.map((item) => ({
          ...item,
          key: item.video_id,
          name: item.video_title,
          image: item.video_image_link,
          description: item.video_description,
          link: item.video_link,
          pdfLink: item.attach_pdf,
          deleteLoading: false,
          editLoading: false,
          hidden: item?.hidden,
        }));
        setVideos(allData);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error(err);
      setIsPageLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      title: "Video Name",
      dataIndex: "name",
      search: true,
    },
    {
      key: "image",
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img src={image} alt="Video" width="50" className="video-image" />
      ),
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (text) => <p className="video-description">{text}</p>,
    },
    {
      key: "actions",
      title: "Actions",
      render: (text, row) => (
        <DropMenu child={"Actions"}>
          <div className="actions-btns">
            <div
              className="open-btn c-pointer text-primary"
              onClick={() => setOpenEditModal(row)}
            >
              <div className="btn btn-warning">Edit</div>
            </div>
            {/* <div
            className="open-btn c-pointer text-primary"
            onClick={() => window.open(row.link, "_blank")}
          >
            <div className="btn btn-primary">Watch</div>
          </div> */}
            <div
              className="open-btn c-pointer text-primary"
              onClick={() => setPdfOpen(row)}
            >
              <div className="btn btn-dark">PDF</div>
            </div>

         
            <div className="rowDiv">
              <button
                className={`btn ${
                  !parseInt(row?.hidden) ? "btn-danger" : "btn-success"
                }`}
                onClick={async () => {
                  alert(row?.hidden)
                  try {
                    const response = await fetch(
                      "https://camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/update_show_video.php",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                           
                          hidden: row?.hidden == "0" ? 1 : "0",
                          video_id: row?.video_id,
                        }),
                      }
                    );
                    const x = await response?.text();
                    getAllMyVediosFor();
                  } catch (err) {}
                }}
              >
                {parseInt(row?.hidden) ? "Show" : " Hide"}
              </button>
            </div>
          </div>
        </DropMenu>
      ),
    },
  ];

  return (
    <div className="videos">
      <div className="tablePageHeader">
        <h1 className="pageTitle">Videos</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Video
        </button>
      </div>
      <CustomTable dataSource={videos} columns={columns} />
      <AddVideo
        getFunction={getAllMyVediosFor}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <EditVideo
        getFunction={getAllMyVediosFor}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
      <DeleteVideo
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <ShowHideVideo
        openModal={openShowHideModal}
        setOpenModal={setOpenShowHideModal}
      />
      <PdfOpen
        getFunction={getAllMyVediosFor}
        openModal={pdfOpen}
        setOpenModal={setPdfOpen}
      />
    </div>
  );
}

export default CategoryVideos;
