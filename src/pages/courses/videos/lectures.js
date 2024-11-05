import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  days
} from "../../../assets/svgIcons";
import AddLecture from "../../../components/Lectures/add";
import DeleteLecture from "../../../components/Lectures/delete";
import EditLecture from "../../../components/Lectures/edit";
import ShowHideLectures from "../../../components/Lectures/showHide";
import CustomTable from "../../../components/table";
import { secondUrl } from "../../../utils/baseUrl";
import "./style.css";

function Lectures() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openShowHideModal, setOpenShowHideModal] = useState(false);
  const [initialLectureData, setInitialLectureData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const columns = [
    {
      key: "name",
      title: "Lecture Name",
      dataIndex: "lec_title",
      search: true,
    },
    {
      key: "lec_cover_link",
      title: "Image",
      dataIndex: "lec_cover_link",
      render: (row) => {
        console.log(row);
        return (
          <img
            src={row}
            style={{ width: "100px" }}
            alt=""
            className=""
          />
        );
      },
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "lec_descriprion",
      render: (text) => <p className="lecture-description">{text}</p>,
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (text, row) => (
        <div className="actions-btns">
          {/* <div
            className="delete-btn c-pointer text-danger"
            onClick={() => setOpenDeleteModal(row)}
          >
            <div className="tooltip">Delete</div>
            {deleteIcon}
          </div>
          <div
            onClick={() => setOpenShowHideModal(row)}
            className={
              row?.hidden
                ? "showhide-btn c-pointer text-success"
                : "showhide-btn c-pointer text-danger"
            }
          >
            <div className="tooltip">{row?.hidden ? "Show" : "Hide"}</div>
            {row?.hidden ? closedEye : openedEye}
          </div>
          <div
            className="open-btn c-pointer text-primary"
            onClick={() => setOpenEditModal(row)}
          >
            <div className="tooltip">Edit</div>
            {editIcon}
          </div> */}
          <div
            className="open-btn c-pointer text-primary"
            onClick={() => navigate(`${row?.lec_id}/videos?lec_videos_ids=${row?.lec_videos_ids}`)}
          >
            <div className="tooltip">Videos</div>
            {days}
          </div>
        </div>
      ),
    },
  ];
  const { subject, group } = useParams();
  const getAllMyVediosFor = async () => {
    setIsPageLoading(true);

    let data_to_send = {
      lec_sub_id: subject,
    };


    try {
      const response = await fetch(secondUrl + "select_lectures.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_send),
      });

      const resData = await response.json();
      console.log(resData);

      if (Array.isArray(resData) && resData.length !== 0) {
        const allData = resData.map((item) => ({
          ...item,
          deleteLoading: false,
          editLoading: false, 
        }));
console.log(allData)
        setInitialLectureData(allData);
      } else {
        setInitialLectureData([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    getAllMyVediosFor();
  }, []); 

  return (
    <div className="lectures">
      <div className="tablePageHeader">
        <h1 className="pageTitle">Lectures</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Lecture
        </button>
      </div>
      <CustomTable dataSource={initialLectureData} columns={columns} />
      <AddLecture getFunction={getAllMyVediosFor} openModal={openModal} setOpenModal={setOpenModal} />
      <EditLecture openModal={openEditModal} setOpenModal={setOpenEditModal} />
      <DeleteLecture
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <ShowHideLectures
        openModal={openShowHideModal}
        setOpenModal={setOpenShowHideModal}
      />
    </div>
  );
}

export default Lectures;
