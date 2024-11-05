import React, { useState, useEffect } from "react";
import CustomTable from "../../components/table";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  AbsentStudents,
  books,
  closedEye,
  Deploumas,
  deleteIcon,
  editIcon,
  openedEye,
  quiz,
  video,
} from "../../assets/svgIcons";
import AddDeplouma from "../../components/deplouma/add";
import EditDeplouma from "../../components/deplouma/edit";
import DeleteDeplouma from "../../components/deplouma/delete";
import ShowHideDeploumas from "../../components/deplouma/showHide";
import { baseUrl, secondUrl } from "../../utils/baseUrl";
import DropMenu from "../../components/dropmenu";

function Deplouma() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openShowHideModal, setOpenShowHideModal] = useState(false);
  const [initialDeploumaData, setInitialDeploumaData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const columns = [
    {
      key: "name",
      title: "Deplouma Name",
      dataIndex: "subject_name",
      search: true,
    },
    {
      key: "lec_cover_link",
      title: "Image",
      dataIndex: "subject_image",
      render: (row) => {
        console.log(row);
        return <img src={row} style={{ width: "100px" }} alt="" className="" />;
      },
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "subject_description",
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
          </div> */}
          {/* <div
            className="open-btn c-pointer text-primary"
            onClick={() => setOpenEditModal(row)}
          >
            <div className="tooltip">Edit</div>
            {editIcon}
          </div> */}
          <DropMenu child={"Actions"}>
            <div className="actions-btn">
              <div
                className="open-btn c-pointer text-primary"
                onClick={() => navigate(`${row?.subject_id}/groups/Lectures`)}
              >
                <div className="btn btn-primary">Lectures</div>
                
              </div>
              
            </div>
            
          </DropMenu>
          {/* <div
            className="open-btn c-pointer text-danger"
            onClick={() => navigate(`${row?.lec_id}/AbsentStudents`)}
          >
            <div className="tooltip">Absent Students</div>
            {AbsentStudents}
          </div> */}
          
        </div>
      ),
    },
  ];
  const { pack, group, lecture } = useParams();
  const getGroups = async () => {
    try {
      const response = await fetch(
        "https://Camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/select_subjects.php",
        {
          method: "POST",
          header: { "Content-Type": "Application/Json" },
          body: JSON.stringify({ type: "deb" }),
        }
      );
      const data = await response.json();
      setInitialDeploumaData(data);
    } catch (err) {
      setInitialDeploumaData([]);
    }
  };


  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="lectures">
      <div className="tablePageHeader">
        <h1 className="pageTitle">Deploumas</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Deplouma
        </button>
      </div>
      <CustomTable dataSource={initialDeploumaData} columns={columns} />
      <AddDeplouma  getFunction={getGroups} type="deb" openModal={openModal} setOpenModal={setOpenModal} />
      <EditDeplouma openModal={openEditModal} setOpenModal={setOpenEditModal} />
      <DeleteDeplouma
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <ShowHideDeploumas
        openModal={openShowHideModal}
        setOpenModal={setOpenShowHideModal}
      />
    </div>
  );
}

export default Deplouma;
