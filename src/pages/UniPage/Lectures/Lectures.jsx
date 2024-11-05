import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Toast from '../../../components/toast';
import CustomTable from '../../../components/table/index';
import Modal from '../../../components/modal';

export default function Lectures() {
    const [toast , setToast] = useState(false)
    const navigate = useNavigate();
    const {lect_id , generation_id} = useParams();
    const [openModal , setOpenModal] = useState(false);
    const [rowData , setRowData] = useState({});
    const [editModal , setEditModal] = useState(false);
    const [deleteModal , setDeleteModal] = useState(false);
    const [lecData , setLecData] = useState({
      lec_arrangement :null,
      lec_descriprion:"",
      lec_title:"",
      lecture_price:"",
      lec_sub_id:""
    })
    const [allLectures , setAllLectures] = useState([]);
    const columns = [
      {
        id :"Lecture Id",
        title:"lec_id",
        dataIndex:"lec_id"
      },
      {
        id:"Lecture Title",
        title:"lec_title",
        dataIndex:"lec_title"
      },
      {
        id:"Lecture Description",
        title:"lec_descriprion",
        dataIndex:"lec_descriprion"
      },
      {
        id:"Lecture Price",
        title:"lecture_price",
        dataIndex:"lecture_price"
      },
      {
        id:"Lecture Cover Link",
        title:"lec_cover_link",
        dataIndex:"lec_cover_link",
        render : (text , row) => <img src={row?.lec_cover_link} style={{width:"100px",height:"100px",objectFit:"cover"}}/>
      },
      {
        title:"Actions",
        dataIndex:"Actions",
        render : (text , row) => {
          console.log(row)
          return (
            <div className='d-flex gap-2'>
              <button className='btn btn-success' onClick={() => {
                setRowData(row)
                setEditModal(true)
              }}>Edit</button>
              {/* <button className='btn btn-danger' onClick={() => {
                setRowData(row)
                setDeleteModal(true)
              }}>Delete</button> */}
              {/* <button className='btn btn-success' onClick={() => navigate(`/${row?.lec_id}/lectures/questions/`)}>Lecture Questions</button> */}
              <button className='btn btn-primary' onClick={() => navigate(`/${generation_id}/${lect_id}/${row?.lec_id}/videos/`)}>Videos</button>
            </div>
          )
        }
      }
    ]

    // function handleGetAllLectures() {
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    
    //   const raw = JSON.stringify({
    //     lec_sub_id: 239
    //   });
    
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow"
    //   };
    
    //   fetch("https://camp-coding.org/cairo_u_law_acc/doctor/home/select_lectures.php", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //       console.log('Result:', result);
    //       // يمكنك هنا معالجة البيانات أو استدعاء دالة أخرى لعرض النتيجة
    //     })
    //     .catch((error) => console.error('Error:', error));
    // }
    
    

    
    // const response = await axios.post('https://your-api-url.com/path-to-your-endpoint', {
    //   lec_sub_id: lecSubId,
    // });

    // if (response.data) {
    //   console.log('Data:', response.data);
    //   return response.data;
    // } else {
    //   console.log('No data returned from API');
    //   return null;
    // }

    function  handleGetAllLectures() {
      const data_send = {
        lec_sub_id : lect_id,
      }
      axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/select_lectures.php" , data_send)
      .then(res => {
        console.log(res?.data)
        if(res?.data?.length >0) {
          setAllLectures(res?.data)
        }
      }).catch(e => console.log(e))
    }

    function handleAddLecture(e) {
      e.preventDefault()
      const data_send = {
        ...lecData,
        lec_sub_id :lect_id,
      }
      console.log(data_send)
      axios.post(`https://camp-coding.org/cairo_u_law_acc/doctor/home/add_leceture.php`,data_send)
      .then(res=> {
        if(res?.data == "success") {
          setToast({type:"success",message :"Lecture added successfully."})
          handleGetAllLectures();
          setLecData({
            lec_arrangement :null,
            lec_descriprion:"",
            lec_title:"",
            lecture_price:"",
            lec_sub_id:""
          })
          setOpenModal(false);
        }else {
          setToast({type:"error",message:"There is a problem"})
        }
      }).catch(e => console.log(e))
      .finally(() => setOpenModal(false))
    }

    function handleEditLecture(e){
      e.preventDefault()
      console.log(rowData)
      const data_send = {
        ...rowData,
      }
      axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/edit_lec.php" ,
        data_send
      ).then(res => {
        if(res?.data == "success") {
          setToast({type:"success",message:"Lecture Updated successfully."})
          handleGetAllLectures();
          setRowData({});
          setEditModal(false);
        }
      }).catch(e => console.log(e))
      .finally(() => setEditModal(false))
    }

    function handleDeleteLecture() {
      const data_send= {
        lec_id : rowData?.lec_id
      }

      axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/delete_lec.php",data_send)
    }

    useEffect(() => {
        handleGetAllLectures()
    } ,[])

  return (
    <div>
       <div className="tablePageHeader">
        <h1 className="pageTitle">المحاضرات</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Lecture
        </button>
      </div>

      <Modal visible={deleteModal} close={setDeleteModal} title={"Delete Lecture"} footer={null}>
        <h5>Do you want to delete this lecture?</h5>
        <div className='d-flex gap-2'>
          <button className='btn btn-danger' onClick={handleDeleteLecture}>Confirm</button>
          <button className='btn btn-primary' onClick={() => setDeleteModal(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal visible={editModal} close={setEditModal} title={"Edit Lecture"} footer={null}>
        <form onSubmit={handleEditLecture}>
           <div className='form-group'>
            <label className='form-label'>Lecture Number</label>
            <input className='form-input' type='number' placeholder='Lecture Number' value={rowData?.lec_arrangement} onChange={(e) => setRowData({...rowData,lec_arrangement :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Name</label>
            <input className='form-input' type='text' placeholder='Lecture Name' value={rowData?.lec_title} onChange={(e) => setRowData({...rowData,lec_title :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Description</label>
            <textarea className='form-input'  placeholder='Lecture Description' value={rowData?.lec_descriprion} onChange={(e) => setRowData({...rowData,lec_descriprion :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Price</label>
            <input className='form-input' type='number' placeholder='Lecture Price' value={rowData?.lecture_price} onChange={(e) => setRowData({...rowData,lecture_price :e.target.value})}/>
           </div>

           <button className='btn btn-primary'>Edit</button>
        </form>
      </Modal>

      <Modal visible={openModal} close={setOpenModal} title={"Add Lecture"} footer={null}>
        <form onSubmit={handleAddLecture}>
           <div className='form-group'>
            <label className='form-label'>Lecture Number</label>
            <input className='form-input' type='number' placeholder='Lecture Number' onChange={(e) => setLecData({...lecData,lec_arrangement :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Name</label>
            <input className='form-input' type='text' placeholder='Lecture Name' onChange={(e) => setLecData({...lecData,lec_title :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Description</label>
            <textarea className='form-input'  placeholder='Lecture Description' onChange={(e) => setLecData({...lecData,lec_descriprion :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Price</label>
            <input className='form-input' type='number' placeholder='Lecture Price' onChange={(e) => setLecData({...lecData,lecture_price :e.target.value})}/>
           </div>

           <button className='btn btn-primary'>Add</button>
        </form>
      </Modal>

      
      <CustomTable columns={columns} dataSource={allLectures}/>
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
