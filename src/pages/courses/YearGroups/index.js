import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  students,
  examIcon,
  GroupsIcon,
  closedEye,
  deleteIcon,
  editIcon,
  lectures,
  openedEye,
} from "../../../assets/svgIcons";
import AddGroupModal from "../../../components/groups/add";
import AssignToGroup from "../../../components/groups/assign";
import DeleteGroupModal from "../../../components/groups/delete";
import EditGroupModal from "../../../components/groups/edit";
import ShowHideGroupModal from "../../../components/groups/show-hide";
import CustomTable from "../../../components/table";
import DropMenu from "../../../components/dropmenu";
import AddSubject from "../../../components/deplouma/add";

function Groups() {
  const [groups, setGroups] = useState([]);
  const [studentsData, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const navigate = useNavigate();

  const getGroups = async () => {
    try {
      const response = await fetch(
        "https://Camp-coding.tech/teachersApp2024/Ezz_Zatona/doctor/home/select_subjects.php",
        {
          method: "POST",
          header: { "Content-Type": "Application/Json" },
          body: JSON.stringify({ type: "cou" }),
        }
      );
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setGroups([]);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const columns = [
    {
      key: "CourseName",
      title: "Course Name",
      dataIndex: "subject_name",
      search: true,
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (text, row) => {
        return (
          <DropMenu child={"Actions"}>
            <div className="actions-btn">
              {/* <div
                onClick={() => navigate(`${row.group_id}/groupStudents`)}
                className="open-btn c-pointer btn btn-primary"
              >
               Students
              </div> */}
              {/* {row?.gen?.type == "سنتر" ? (
                <div
                  onClick={() => navigate(`${row.group_id}/exams`)}
                  className="open-btn c-pointer btn btn-primary"
                >
                  Exams
                </div>
              ) : null} */}

              <div
                className="open-btn c-pointer btn btn-primary"
                onClick={() => navigate(`${row?.subject_id}/groups`)}
              >
                Content
              </div>
            </div>
          </DropMenu>
        );
      },
    },
  ];

  return (
    <div className="groups">
      <div className="tablePageHeader">
        <h1 className="pageTitle">Courses</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setAddModal(true);
          }}
        >
          Add Course
        </button>
      </div>
      <CustomTable dataSource={groups} columns={columns} />
      <AddSubject  getFunction={getGroups} type="cou" openModal={addModal} setOpenModal={setAddModal} />
 
      <AssignToGroup openModal={assignModal} setOpenModal={setAssignModal} />
      {/* <AddGroupModal openModal={addModal} setOpenModal={setAddModal} /> */}
      <DeleteGroupModal openModal={deleteModal} setOpenModal={setDeleteModal} />
      <ShowHideGroupModal
        openModal={showHideModal}
        setOpenModal={setShowHideModal}
      />
      <EditGroupModal openModal={editModal} setOpenModal={setEditModal} />
    </div>
  );
}

export default Groups;
