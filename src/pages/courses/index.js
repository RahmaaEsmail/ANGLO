import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../../components/table";
import AddYears from "../../components/years/add";
import DeleteYears from "../../components/years/delete";
import EditYears from "../../components/years/edit";
import ShowHideYears from "../../components/years/showHide";
import "./style.css";


function SubjectYears() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShowHideModal, setOpenShowHideModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navigate = useNavigate();
  const [years, setYears] = useState(null);
  const { subject } = useParams();
  useEffect(() => {
    getYears();
  }, []);
  const getYears = async () => {
    setYears([
      {
        id: 1,
        doctor_name: "الفيديوهات",
        doctor_name_en: "Lectures",
      },
      {
        id: 2,
        doctor_name: "الشيتات",
        doctor_name_en: "sheet",
      },
      {
        id: 3,
        doctor_name: "الامتحانات",
        doctor_name_en: "exam",
      },
    ]);
  };
  const columns = [
    {
      key: "Category",
      title: "Category",
      dataIndex: "doctor_name",
      search: true,
    },
 

    {
      key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (text, row) => {
        return (
          <div className="actions-btns">
           
            <div
              className="open-btn c-pointer text-success"
              onClick={() =>
                navigate(`${row?.doctor_name_en}`)
              }
            >
              <div className="btn btn-success">إدارة</div>
            </div>

          </div>
        );
      },
    },
  ];
  return (
    <div className="years">
      <div className="tablePageHeader">
        <h1 className="pageTitle">Content</h1>
        {/* <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Year
        </button> */}
      </div>
      <CustomTable dataSource={years} columns={columns} />

      <AddYears openModal={openModal} setOpenModal={setOpenModal} />
      <EditYears openModal={openEditModal} setOpenModal={setOpenEditModal} />
      <DeleteYears
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />

      <ShowHideYears
        openModal={openShowHideModal}
        setOpenModal={setOpenShowHideModal}
      />
    </div>
  );
}

export default SubjectYears;
