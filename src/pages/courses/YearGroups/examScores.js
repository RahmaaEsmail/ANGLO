import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/table";
import { deleteIcon, editIcon } from "../../../assets/svgIcons";
import AddScore from "../../../components/groups/exams/scores/add";
import { baseUrl } from "../../../utils/baseUrl";
import { useParams } from "react-router-dom";

function ExamGroupsScores() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { yearID, quiz_id } = useParams();
  const [data, setData] = useState(null);
  const [students, setStudents] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(
        baseUrl + "absence/select_quiz_students.php",
        {
          method: "POST",
          header: { "Content-Type": "Application/Json" },
          body: JSON.stringify({ quiz_id: quiz_id }),
        }
      );
      const data = await response.json();
      setStudents(data?.filter((item) => item?.score == "-"));
      setData(data);
    } catch (err) {
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const columns = [
    {
      key: "name",
      title: "Student Name",
      dataIndex: "student_name",
      search: true,
    },
    {
      key: "phone",
      title: "Phone Number",
      dataIndex: "student_phone",
    },
    {
      key: "parent_phone", 
      title: "parent Phone Number",
      dataIndex: "parent_phone",
    },
    {
      key: "score",
      title: "Score",
      dataIndex: "score",
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  ];

  return (
    <div className="exam-scores">
      <div
        className="tablePageHeader scoretablePageHeader"
        style={{ flexDirection: "column", justifyContent: "flex-start" }}
      >
        <b style={{ marginRight: "auto", marginLeft: "20px" }}>Add Score</b>
        <AddScore
        getStudents={getData}
        id={quiz_id}
          openModal={openModal}
          setOpenModal={setOpenModal}
          students={students}
        />
      </div>
      <CustomTable dataSource={data} columns={columns} />
    </div>
  );
}

export default ExamGroupsScores;
