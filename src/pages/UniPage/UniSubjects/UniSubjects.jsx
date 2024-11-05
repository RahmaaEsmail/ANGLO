import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomTable from '../../../components/table/index'
import Modal from '../../../components/modal';
import { FaTrash } from 'react-icons/fa';
import Toast from '../../../components/toast';

export default function UniSubjects() {
    const [deleteModal , setDeleteModal] = useState(false);
    const [toast, setToast] = useState(false);
    const navigate = useNavigate();
    const [img , setImg] = useState(null);
    const [imgUrl , setImgUrl] = useState("")
    const [openModal , setOpenModal] = useState(false);
    const {sub_id} = useParams();
    const [allSubjects , setAllSubjects] = useState([]);
    const [imgLoading , setImgLoading] = useState(false);
    const [isLoading  , setIsLoading] = useState(false);
    const [rowData , setRowData] = useState({})
    const [subjectData , setSubjectData] = useState({
        subject_name :"",
        subject_image:"",
    })

    const columns = [
        {
            id:"Subject Id",
            title:"subject_id",
            dataIndex:"subject_id",
        },
        {
            id:"Subject Image",
            title:'subject_image',
            dataIndex:"subject_image",
            render :(text , row) => <img style={{width:"100px",height:"100px" , objectFit:"cover"}} src={row?.subject_image} alt={row?.subject_name}/>
        },
        {
            id:"Subject Name",
            title:"subject_name",
            dataIndex:"subject_name",
        },
        {
            title:"Actions",
            dataIndex:"Actions",
            render : (text , row) => {
                return (
                    <div className='d-flex gap-3'>
                        <button className='btn btn-primary' onClick={() => navigate(`/${sub_id}/${row?.subject_id}/subjects/lectures`)} >Lectures</button>
                        <button className='btn btn-danger' onClick={() => {
                            console.log(row)
                            setRowData(row)
                            setDeleteModal(true)
                        }}>Delete</button>
                     </div>
                )
            }
        }
    ]

    function handleGetAllSubjects() {
        axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/select_subject_for_doctor.php",
          {doctor_id : +sub_id})
        .then(res => {
          console.log(res)
            if(res?.data) {
                console.log(res?.data)
                setAllSubjects(res?.data);
            }
            else {
                setToast({show: true,
                    message: "حدث خطأ ما من فضلك حاول مره اخرى",type:"error"})
            }
        })
    }
    
    const handleImageChange = (e) => {
       setImg(URL.createObjectURL(e.target.files[0]))
       setImgUrl(e.target.files[0])
      };
  
      const removeImage = () => {
        setImgUrl("");
        setImg(null);
      };

    function handleAddSubject(e) {
        e.preventDefault();

        if (!imgUrl) {
            setToast({ show: true, message: "من فضلك قم بتحميل صورة.", type: "error" });
            return;
        }

        setImgLoading(true)
        const formData = new FormData();
        formData.append("image", imgUrl );
        axios.post('https://camp-coding.org/cairo_u_law_acc/doctor/home/image_uplouder.php' ,formData )
        .then(res =>{
            if(res?.data) {
                setIsLoading(true)
                const data_send = {
                    subject_name : subjectData?.subject_name,
                    item_img_url : res?.data,
                    have_image: 1,
                    doctor_id : +sub_id
                }
                console.log(data_send)
                axios.post('https://camp-coding.org/cairo_u_law_acc/doctor/home/insert_subject.php', data_send  
                //     {
                //     headers: {
                //       "Content-Type": "multipart/form-data",
                //     },
                //   }
                )
                .then(res2 => {
                  console.log(res2)
                    if(res2?.status == 200) {
                        handleGetAllSubjects();
                        setToast({type:"success" , message :"تم اضافة ماده بنجاح"});
                        setSubjectData({
                          subject_name : "",
                          item_img_url:"",
                          have_image:0
                        })
                        setImg(null);
                        setImgUrl("")
                        setOpenModal(false)
                    }
                    else {
                        setToast({type:"error", message:"حدث خطأ ما من فضلك حاول مره اخرى"})
                    }
                })
                .catch(e=> console.log(e))
                .finally(() => {
                    setIsLoading(false);
                })
            }
        }).catch(e => console.log(e))
        .finally(() => {
            setImgLoading(false)
            setOpenModal(false);
        })
    }

    function handleDeleteModal() {
        const data_send = {
            subject_id : rowData?.subject_id
        }
        console.log(data_send)
      axios.post(`https://camp-coding.org/cairo_u_law_acc/doctor/home/delete_subject.php`,data_send)
      .then(res => {
        console.log(res)
        if(res?.data?.status == "success") {
          setToast({type:"success" , message:res?.data?.message})
          handleGetAllSubjects();
        }else {
           setToast({type:"error",message:"There is an issue during deletion."})
        }
      }).catch(e => console.log(e))
      .finally(() => setDeleteModal(false))
    }
     
    useEffect(() => {
        handleGetAllSubjects();
    } ,[])


  return (
    <div>
        <div className="tablePageHeader">
        <h1 className="pageTitle">المواد</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Subject
        </button>
      </div>

      <Modal close={setDeleteModal} footer={false} visible={deleteModal}>
        <h5>Do You Want to delete this subject?</h5>
        <div className='d-flex gap-2'>
            <button onClick={handleDeleteModal} className='btn btn-danger'>Confirm</button>
            <button onClick={() => setDeleteModal(false)} className='btn btn-primary'>Cancel</button>
        </div>
      </Modal>

      <Modal close={setOpenModal}
      footer={false}
      title={"إضافة ماده"}
      visible={openModal}>
       <form onSubmit={handleAddSubject}>
       <div className="form-group">
          <label htmlFor="year" className="animated-label">
            ادخل اسم الماده
          </label>
          <input
            type="text"
            id="year"
            placeholder="Subject Name"
            onChange={(e) => {
              setSubjectData({ ...subjectData, subject_name: e.target.value });
            }}
            className="animated-input"
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="image" className="animated-label">
            ادخل صوره الماده
          </label>
          <input
            type="file"
            id="lectureImage"
            onChange={handleImageChange}
            className="form-input"
            
          />
          {imgUrl && (
            <div className="image-preview">
              <img
                src={img}
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
        <button className='btn btn-primary'>{imgLoading || isLoading?"Loading..." : "Add"}</button>
       </form>
      </Modal>

      <CustomTable columns={columns} dataSource={allSubjects}/>

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
