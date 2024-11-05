import { useEffect, useState } from "react";
import AddUniversity from "../../components/university/add/AddUniversity";
import axios from "axios";
import CustomTable from '../../components/table/index'
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";
// import {subjectsIcon} from '../../assets/svgIcons'

export default function UniPage() {
  const [toast, setToast] = useState(false);
    const [openModal , setOpenModal] = useState(false)
    const [allUniversity , setAllUniversity] = useState([]);
    const navigate = useNavigate();

    // const columns = [
    //   {
    //     id :"id",
    //     title:"generation_id",
    //     dataIndex:"generation_id"
    //   },
    //   {
    //     id:"Name",
    //     title:"generation_name",
    //     dataIndex:"generation_name"
    //   },
    //   {
    //     id:"",
    //     title:"Actions",
    //     dataIndex:"Actions",
    //     render :(text , row) => {
    //       return (
    //         <div>
    //           <button className="btn btn-primary" onClick={() => navigate(`${row?.generation_id}/subjects`)}>Subjects</button>
    //         </div>
    //       )
    //     }
    //   }
    // ]

    // function handleGetAllUni() {
    //   axios.get(`https://camp-coding.org/cairo_u_law_acc/doctor/home/select_generations.php`)
    //   .then(res => {
    //     console.log(res)
    //     if(res.data.status =="success") {
    //       setAllUniversity(res.data.message) 
    //     }
    //     else {
    //       setToast({
    //         show: true,
    //         type:"error",
    //         message: "حدث خطأ ما من فضلك حاول مره اخرى",
    //       });
    //     }
    //   })
    // }

    const years = [
      {generation_name: 'الفرقة الاولى', generation_id: '1'},
      {generation_name: 'الفرقة الثانية', generation_id: '2'},
      {generation_name: 'الفرقة الثالثة', generation_id: '3'},
      {generation_name: 'الفرقة الرابعة', generation_id: '4'},
     ]
    
      const columns = [
        {
          key: "#",
          title: "#",
          dataIndex: "generation_id",
          search: true,
        },
        {
          key: "type",
          title: "generation name",
          dataIndex: "generation_name",
          search: true,
        },
    
        {
          key: "actions",
          title: "actions",
          dataIndex: "actions",
          render: (text, row) => {
            return (
              <div className='actions-btns' style={{direction:"ltr"}}>
                 {/* <div
                  className='open-btn c-pointer text-primary'
                  onClick={() => {
                    setOpenEditModal(row);
                  }}
                >
                  <div className='tooltip'>Edit</div>
                  {editIcon}
                </div> */}
                {/* <div
                  className='delete-btn c-pointer text-danger'
                  onClick={() => setOpenDeleteModal(row)}
                >
                  <div className='tooltip'>Delete</div>
                  {deleteIcon}
                </div>
    
               
    
                <div
                  className={
                    row?.hidden
                      ? "showhide-btn c-pointer text-success"
                      : "showhide-btn c-pointer text-danger"
                  }
                  onClick={() => setOpenShowHideModal(row)}
                >
                  <div className='tooltip'>{row?.hidden ? "Show" : "Hide"}</div>
                  {row?.hidden ? closedEye : openedEye}
                </div> */}
    
                {/* <div
                  className='open-btn c-pointer text-success'
                  onClick={() => navigate(`${row?.key}/lectures`)}
                >
                  <div className='tooltip'>Lectures</div>
                  {lectures}
                </div> */}
    
                {/*
                 */}
                {/* <div
                  className='open-btn c-pointer text-success'
                  onClick={() =>
                    navigate(`${row?.gen_id}/${row?.doctor_name}/students`)
                  }
                >
                  <div className='tooltip'>الطلاب</div>
                  {students}
                </div> */}
    
                {/* <div
                  className='open-btn c-pointer text-success'
                  onClick={() => navigate(`/${row?.gen_id}/Subscriptions/years`)}
                >
                  <div className='tooltip'>الاشتراكات</div>
                  <FaRegNewspaper />
                </div> */}
                {/* <div
                  className='open-btn c-pointer text-success'
                  onClick={() => navigate(`/${row?.gen_id}/units`)}؛
                >
                  <div className='tooltip'>الوحدات</div>
                  <FaBookOpen />
                </div> */}
                <div
                  className='open-btn c-pointer text-success'
                  // onClick={() => navigate(`${row?.generation_id}/groups`)}
                >
                  <button onClick={() => navigate(`${row?.generation_id}/subjects`)} className="btn btn-primary">Subjects</button>
                  {/* <div className='tooltip'>Subjects</div>
                  {subjectIcons} */}
                </div>
              </div>
            );
          },
        },
      ];

    // useEffect(() => {
    //   handleGetAllUni()
    // } , [])
  return (
    <div className="uni_page">
        <div className="tablePageHeader">
        <h1 className="pageTitle">الفرق</h1>
        {/* <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add University
        </button> */}
      </div>
      <CustomTable dataSource={years} columns={columns} />
      {/* <AddUniversity openModal={openModal}  setOpenModal={setOpenModal}/> */}

      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(false)}
        />
      )} 
    </div>
  )
}
