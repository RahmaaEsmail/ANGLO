import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { days, pdfIcon } from '../../../assets/svgIcons';
import Toast from '../../../components/toast';
import CustomTable from '../../../components/table/index'
import Modal from '../../../components/modal';
import { FaTrash } from 'react-icons/fa';

export default function UniVideos() {
  const [toast , setToast] = useState(false)
  const {lec_id , videos_id , generation_id} = useParams();
  const [allLectures , setAllLectures] = useState([]);
  const [selectedLecture , setSelectedLecture] = useState("")
  const [allVideos , setAllVideos] = useState([]);
  const [showDeleteModal ,setShowDeleteModal ] = useState(false);
  const [showEditModal , setShowEditModal] = useState(false);
  const [rowData , setRowData] = useState({});
  const [pdfFile , setPdfFile] = useState(null)
  const [deletePdfModal, setDeletePdfModal] = useState(false)
  const navigate = useNavigate();
  const [showPdfModal , setShowPdfModal] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [img , setImg] = useState(null);
  const [imgUrl , setImgUrl] = useState("");
  const [videoData , setVideoData] = useState({
    video_title: "",
              lec_id: "",
              video_description: " ",
              viemo_id: "",
              generation_id: "",
              video_image_link: ""
  })
   
  console.log(lec_id , videos_id)

  const columns = [
    {
      id:"id" ,
      title:"video_id",
      dataIndex:"video_id"
    },
    {
      id:"Video Player Id",
      title:"video_player_id",
      dataIndex:"video_player_id"
    },
    {
      id:"Video Title",
      title:"video_title",
      dataIndex:"video_title"
    },
    {
      id:"video_price",
      title:"video_price",
      dataIndex:"video_price"
    },
    {
      id:"Video Image",
      title:"video_image_link",
      dataIndex:"video_image_link",
      render :(text , row) => <img src={row?.video_image_link} style={{width:"100px",height:"1 00px",objectFit:"cover"}}/>
    },
    {
      id:"Video Description",
      title:"video_description",
      dataIndex:"video_description",
      render:(text , row) => row?.attach_pdf && <div className="actions-btns"><a href={row?.attach_pdf} style={{margin:'auto'}} target='_blank'>{pdfIcon}</a></div>
    },
    {
      id:"Video Link",
      title:"video_link",
      dataIndex:"video_link",
      render : (text , row) => 
      <div className="actions-btns">

      <a  href={row?.video_link} target='_blank' className="open-btn c-pointer text-primary">
        <div className="tooltip">Videos</div>
        {days}
        </a>
      </div>
    },
    {
      id:"Actions",
      title:"Actions",
      render:(text , row) => <div className='d-flex gap-2'>
        <button className='btn btn-danger' onClick={() => {
          setShowDeleteModal(true);
          setRowData(row)
        }}>Delete</button>
        <button className='btn btn-primary' onClick={() => {
          setRowData(row)
          setShowEditModal(true)
        }}>Edit</button>
        <button className='btn btn-success' onClick={() => {
          setShowPdfModal(true)
          setRowData(row)
        }}>PDF</button>
        <button className='btn btn-danger' onClick={() => {
          console.log(row)
          setDeletePdfModal(true)
          setRowData(row)
        }}>Delete PDF</button>
        <button className='btn btn-secondary' onClick={() => navigate(`/${row?.video_id}/videos/questions/`)}>Video Questions</button>
      </div>
    }
  ]

  function handleGetAllLectures() {
    const data_send = {
      lec_sub_id : +lec_id
    }
    console.log(data_send)
      axios.post(`https://camp-coding.org/cairo_u_law_acc/doctor/home/select_lectures.php`,data_send)
      .then(res => {
        if(res?.data) {
          console.log(res?.data)
          // console.log(res?.data?.map(item => item?.lec_id)?.join("//CAMP//"))
          setSelectedLecture(res?.data?.find(item => item?.lec_id == videos_id)?.lec_videos_ids)
          setAllLectures(res?.data);
        }
      }).catch(e => console.log(e))
  }

  useEffect(() => {
    handleGetAllLectures();
  } , [])

  function handleDeleteVideo() {
    const data_send = {
      video_id :  rowData?.video_id
    }

    axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/delete_video.php", data_send)
    .then(res => {
      if(res?.data == "success") {
        setToast({type:"success",message:"The video was successfully deleted!"})
        handleGetAllVideos();
        setShowDeleteModal(false)
      }
    }).catch(e => console.log(e))
    .finally(() => setShowDeleteModal(false))
  }

  function handleEditVideo(e) {
    e.preventDefault();
    const data_send = {
      viemo_id : rowData?.viemo_id,
      video_title : rowData?.video_title,
      video_description:"",
      video_id:rowData?.video_id,
    }

    axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/edit_video_data.php",data_send)
    .then(res=> {
      if(res?.data == "success") {
        setToast({type:"success",message:"The video was successfully updates!"})
        handleGetAllVideos();
        setRowData({})
        setShowEditModal(false)
      }
    }).catch(e => console.log(e))
    .finally(() => setShowEditModal(false))
  }

  useEffect(() => {
    console.log(selectedLecture)
  } , [selectedLecture])

  function handleGetAllVideos() {
    const data_send = {
      // ids:
      ids : selectedLecture
    }
    console.log(data_send)
    axios.post('https://camp-coding.org/cairo_u_law_acc/doctor/home/select_videos_lec.php',data_send)
    .then(res => {
      console.log(res)
      if(res?.data) {
        console.log(res?.data)
        setAllVideos(res?.data)
      }
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    handleGetAllVideos();
  } ,[selectedLecture])

  function handleAddPdf(e) {
    e.preventDefault();
    
    if(!pdfFile) {
      setToast({type:"error",message: "Please select a PDF file to upload"})
      return;
    }

    const formData = new FormData();
    formData.append("file_attachment",pdfFile)
    formData.append("video_id",rowData?.video_id)

    axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/upload_file.php" , formData)
    .then(res => {
      if(res?.data == "success") {
        setToast({type:"success",message:"The PDF was uploaded successfully!"})
        handleGetAllVideos();
        setPdfFile(null);
        setShowPdfModal(false);
      }
    }).catch(e => console.log(e))
    .finally(() => setShowPdfModal(false))
  }

  function handleImageChange(e) {
    setImg(URL.createObjectURL(e.target.files[0])) 
    setImgUrl(e.target.files[0])
  }

  const removeImage = () => {
    setImgUrl("");
    setImg(null);
  };



  function handleSubmit(e) {
    e.preventDefault();
    if(!imgUrl) {
      setToast({type:"error",message:"Enter image first!"})
      return 
    }

    const formData = new FormData();
    formData.append("image",imgUrl)
    axios.post('https://camp-coding.org/cairo_u_law_acc/doctor/home/image_uplouder.php',formData)
    .then(res => {
      if(res?.data) {
        const  data_send = {
          lec_id : +videos_id,
          video_title:videoData?.video_title,
          video_description:"",
          viemo_id : videoData?.viemo_id,
          video_image_link : res?.data,
          generation_id: +generation_id
        }

        axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/upload_video_data.php",data_send)
        .then(res2 => {
          if(res2?.data == "success") {
            location.reload()
            setToast({type:"success",message:"Video added successfully."})
            handleGetAllVideos();
            setVideoData({
              lec_id : +lec_id,
          video_title:videoData?.video_title,
          video_description:"",
          viemo_id : videoData?.viemo_id,
          video_image_link:res?.data,
          generation_id: +generation_id
            })
            setOpenModal(false);
          }else {
             setToast({type:"error",message:"There is a problem"})
          }
        })
      }
    }).catch(e => console.log(e))
    .finally(() => setOpenModal(false))
  }

  function handleDeletePdf() {
    const data_send = {
      summary_id : ''
    }
    axios.post("https://camp-coding.org/cairo_u_law_acc/doctor/home/delete_summary.php",data_send)
    .then(res => {
      if(res?.data == 'success') {

      }else {

      }
    }).catch(e => console.log(e))
    .finally(() => setDeletePdfModal(false))
  }

  return (
    <div>
        <div className="tablePageHeader">
        <h1 className="pageTitle">الفيديوهات</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Video
        </button>
        </div>

        <Modal visible={showDeleteModal}  close={setShowDeleteModal} title={"Delete Video"} footer={null}>
           <h5>Do you want to delete this video?</h5>
           <div className='d-flex gap-2'>
            <button className='btn btn-danger' onClick={handleDeleteVideo}>Confirm</button>
            <button className='btn btn-primary' onClick={() => setShowDeleteModal(false)}>Cancel</button>
           </div>
        </Modal>

        <Modal visible={deletePdfModal}  close={setDeletePdfModal} title={"Delete PDF"} footer={null}>
           <h5>Do you want to delete this pdf?</h5>
           <div className='d-flex gap-2'>
            <button className='btn btn-danger' onClick={handleDeletePdf}>Confirm</button>
            <button className='btn btn-primary' onClick={() => setDeletePdfModal(false)}>Cancel</button>
           </div>
        </Modal>

        <Modal visible={showEditModal} close={setShowEditModal} title={"Edit Video"} footer={null}>
          <form onSubmit={handleEditVideo}>
             <div className='form-group'>
               <label>Video Name</label>
               <input className='form-input' type='text' placeholder='Video Name' value={rowData?.video_title} onChange={(e) => setRowData({...rowData , video_title :e.target.value})}/>
             </div>

             <div className='form-group'>
              <label className='form-label'>Video Link Id</label>
              <input type="number" className='form-input' placeholder='Video Link ID' value={rowData?.viemo_id} onChange={(e) => setRowData({...rowData , viemo_id:e.target.value})}/>
             </div>

        <button className='btn btn-primary'>Edit</button>
          </form>
       </Modal>

       <Modal visible={openModal} close={setOpenModal} title={"Add Video"} footer={null}>
          <form onSubmit={handleSubmit}>
             <div className='form-group'>
               <label>Video Name</label>
               <input className='form-input' type='text' placeholder='Video Name' value={videoData?.video_title} onChange={(e) => setVideoData({...videoData , video_title :e.target.value})}/>
             </div>

             <div className='form-group'>
              <label className='form-label'>Video Link Id</label>
              <input type="number" className='form-input' placeholder='Video Link ID' value={videoData?.viemo_id} onChange={(e) => setVideoData({...videoData , viemo_id:e.target.value})}/>
             </div>

             <div className="form-group">
          <label htmlFor="image" className="animated-label">
            ادخل صوره الفيديو
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

        <button className='btn btn-primary'>Add</button>
          </form>
       </Modal>

        <Modal visible={showPdfModal} close={setShowPdfModal} title="Add Pdf">
          <form onSubmit={handleAddPdf}>
            <div className='form-group'>
              <label className='form-label'>Pdf</label>
              <input onChange={(e) =>setPdfFile(e.target.files[0])} className='form-input' type="file"/>
            </div>

            <button className='btn btn-primary'>Add</button>
          </form>
        </Modal>
        
        <CustomTable columns={columns} dataSource={allVideos}/>
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
