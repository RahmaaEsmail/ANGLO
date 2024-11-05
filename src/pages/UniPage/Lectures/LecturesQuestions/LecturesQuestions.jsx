import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTable from '../../../../components/table/index'
import Modal from "../../../../components/modal";
import { deleteIcon } from "../../../../assets/svgIcons";
import { FaTrash } from "react-icons/fa";
import Toast from "../../../../components/toast";

export default function LectureQuestions() {
    const [toast , setToast] = useState(false);
    const {lect_questions} = useParams();
    const [allQuestions , setAllQuestions] = useState([]);
    const [img , setImg] = useState(null);
    const [imgUrl , setImgUrl] = useState("")
    const [openModal , setOpenModal] = useState(false);
    const [questionData , setQuestionsData] = useState({
        question_text:"",
        question_valid_answer:""
    })
    const [answers , setAnswers] = useState([{
        answer_text:"",
        id: 0,
        answer_check : false
    }])
    const [imgLoading , setImgLoading] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [deleteModal , setDeleteModal] = useState(false);
    const [rowData , setRowData] = useState({})
    const [editModal , setEditModal] = useState(false)
    console.log(lect_questions)


    const columns = [
        {
            id:"id",
            title:"question_lec_id",
            dataIndex:"question_lec_id"
        },
        {
            id:"Question Text",
            title:"question_text",
            dataIndex:"question_text"
        },
        {
            id:"Question Answers",
            dataIndex:"question_answers",
            title:"question_answers",
            render:(text , row) => <ul>
                {row?.question_answers?.map(ans => <li className={ans?.answer_check ? "text-success" : "text-danger"}>{ans?.answer_text}</li>)}
            </ul>
        },
        {
            id:"Question Valid Answer",
            dataIndex:"question_valid_answer",
            title:"question_valid_answer"
        },
        {
            id:"Question Image",
            dataIndex:"question_image",
            title:"question_image",
            render :(text , row) => row?.question_image &&  <img style={{width:"100px",height:"100px",objectFit:"cover"}} src={row?.question_image}/> 
        },
        {
            id:"Actions",
            title:"Actions",
            dataIndex:"Actions",
            render:(text , row) => 
            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={()=> {
                setRowData(row)
                setDeleteModal(true)
              }}>Delete</button>

              <button className="btn btn-primary" onClick={() => {
                console.log(row)
                setRowData(row)
                setEditModal(true)
              }}>Edit</button>
            </div>
        }
    ]

    function handleGetAllQuestions() {
        const data_send = {
            question_video_id : 0,
            question_lec_id : +lect_questions,
        }
        console.log(data_send)
        axios.post('https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/select_video_questions.php',data_send)
        .then(res => {
            if(res?.data?.questions) {
                console.log(res?.data?.questions)
                // console.log(res?.data?.questions)
                setAllQuestions(res?.data?.questions);
            }
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        console.log(allQuestions)
    } , [allQuestions])

    useEffect(() => {
        handleGetAllQuestions()
    } ,[lect_questions])

    function handleAddAnswer() {
        setAnswers([...answers , {id : answers?.length , answer_text : "" , answer_check :false}])
    }

    function handleDeleteAnswer(id) {
        if(answers?.length >1) {
            setAnswers(answers.filter(ans =>ans?.id !== id))
        }
    }

    function handleAddQuestion(e) {
        e.preventDefault();

        const isAnswerSelected = answers.some(answer => answer.answer_check);
    if (!isAnswerSelected) {
        setToast({message : "Please select at least one valid answer.", type:"error"});
        return; // Stop the form submission if no answer is selected
    }


        if(imgUrl) {
            setImgLoading(true);
            const formData = new FormData();
            formData.append("image",imgUrl);
            console.log(JSON.stringify(formData))
            axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/img_uploader.php" ,formData)
            .then(res => {
                if(res?.data) {
                    setIsLoading(true);
                   
                    const data_send = {
                        question_text : questionData?.question_text,
                        question_valid_answer : answers?.filter(ans => ans?.answer_check == true)?.[0]?.answer_text,
                        question_answers : answers?.map(answer => answer?.answer_text)?.join("//CAMP//"),
                        question_video_id : 0,
                        question_image: 1,
                        item_img_url: res?.data,
                        question_lec_id : +lect_questions,
                    }
                    console.log(data_send)
                    axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/add_question_videos.php" , data_send)
                    .then(dataRes => {
                        if(dataRes?.data == "success") {
                            setToast({message :"تم اضافه سؤال بنجاح" ,
                                type:"success"
                            })
                            handleGetAllQuestions();
                            setOpenModal(false);
                            setAnswers([{id : 0 , answer_check :false , answer_text:""}])
                            setQuestionsData({
                                question_text:"",
                                question_valid_answer:"",
                            })
                            setImg(null);
                            setImgUrl("")
                        }
                    }).catch(e => console.log(e))
                    .finally(() => {
                        setIsLoading(false)
                        setOpenModal(false)
                    })
                }
            })
            .catch(e => console.log(e)) 
            .finally(() => setImgLoading(false))
        }else {
            const data_send = {
                question_text : questionData?.question_text,
                question_valid_answer : answers?.filter(ans => ans?.answer_check == true)?.[0]?.answer_text,
                question_answers : answers?.map(answer => answer?.answer_text)?.join("//CAMP//"),
                question_video_id :0 ,
                question_image: 0,
                item_img_url:null,
                question_lec_id: +lect_questions,
            }
             console.log(data_send)
            axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/add_question_videos.php" , data_send)
            .then(dataRes => {
                if(dataRes?.data == "success") {
                    setToast({message :"تم اضافه سؤال بنجاح" ,
                        type:"success"
                    })
                    handleGetAllQuestions();
                    setOpenModal(false);
                    setAnswers([{id : 0 , answer_check :false , answer_text:""}])
                    setQuestionsData({
                        question_text:"",
                        question_valid_answer:"",
                    })
                    setImg(null);
                    setImgUrl("")
                }
            }).catch(e => console.log(e))
            .finally(() => {
                setIsLoading(false)
                setOpenModal(false)
            })
        }
    }

   function handleSelectAnswer(id) {
    setAnswers(answers.map(answer => ({
        ...answer ,
        answer_check :  answer?.id == id,
    })))
   }

    function removeImage() {
        setImg(null);
        setImgUrl("")

    }function handleDeleteQuestion() {
        const data_send = {
            question_id : +rowData?.question_id
        }
        axios.post('https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/delete_question.php',data_send)
        .then(res => {
            if(res?.data == "success") {
                setToast({type:"success" , message:"Question was deleted successfully"})
                handleGetAllQuestions();
            }else {
                setToast({type:"error" , message:"There's a problem"})
            }
        }).catch(e => console.log(e))
        .finally(() => setDeleteModal(false))
    }

    function handleEditQuestion(e) {
        e.preventDefault();
        console.log(rowData);
        if (imgUrl) {    
            // If there is an image to upload, upload it first
            const formData = new FormData();
            formData.append("image", imgUrl);
    
            axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/img_uploader.php", formData)
                .then(res => {
                    if (res?.data) {
                        // Update `data_send` with the image URL from the response
                        const data_send = {
                            
                            question_id: +rowData?.question_id,
                            question_valid_answer: rowData?.question_answers?.find(item => item?.answer_check == true)?.answer_text,
                            question_video_id:0,
                            question_text:rowData?.question_text,
                            question_answers : rowData?.question_answers?.map(answer => answer?.answer_text)?.join("//CAMP//"),
                            item_img_url: res.data,
                            question_image:1,
                            question_lec_id: +rowData?.question_lec_id,
                        };
                        console.log(data_send)
    
                        // Send the updated question data with the image URL
                        return axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/edit_video_question.php", data_send);
                    }
                })
                .then(ress =>{
                    if(ress?.data) {
                        setToast({type:"success",message:"The modification was successful."})
                        handleGetAllQuestions();
                        setRowData({})
                        setEditModal(false);
                    }else {
                        setToast({type:"error",message:"There is an issue during the modification."})
                    }
                }
                )
                .catch(error => console.error("Error uploading image or editing question:", error))
                .finally(() => setEditModal(false))
        } else {
            // If there's no image to upload, send data directly
            const data_send = {
                question_id: +rowData?.question_id,
                question_valid_answer: rowData?.question_answers?.find(item => item?.answer_check == true)?.answer_text,
                question_video_id:0,
                question_text:rowData?.question_text,
                question_answers : rowData?.question_answers?.map(answer => answer?.answer_text)?.join("//CAMP//"),
                item_img_url: null,
                question_image:0,
                question_lec_id: rowData?.question_lec_id,
            };
            console.log(data_send)
    
            axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/edit_video_question.php", data_send)
            .then(ress =>{
                if(ress?.data) {
                    setToast({type:"success",message:"The modification was successful."})
                    handleGetAllQuestions();
                    setRowData({})
                    setEditModal(false);
                }else {
                    setToast({type:"error",message:"There is an issue during the modification."})
                }
            }
            )
                .catch(error => console.error("Error editing question:", error))
                .finally(() => setEditModal(false))
        }
    }
  return (
    <div>
        <div className="tablePageHeader">
        <h1 className="pageTitle">بنك الأسئلة</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Questions
        </button>
      </div>

      <Modal close={setDeleteModal} visible={deleteModal} footer={null} title={"Delete Question"}>
        <h5>Do you want to delete this question?</h5>
        <div className="d-flex gap-2">
            <button className="btn btn-danger" onClick={handleDeleteQuestion}>Confirm</button>
            <button className="btn btn-primary" onClick={() => setDeleteModal(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal close={setEditModal} visible={editModal} footer={null} title={"Edit Question"}>
      <form onSubmit={handleEditQuestion}>
            <div className="form-group">
                <label  htmlFor="question_text" className="form-label">Questions Text</label>
                <input value={rowData?.question_text} onChange={(e) => setRowData({...rowData , question_text :e.target.value})} id="question_text" placeholder="Enter Question Text"  className="form-input" type="text"/>
            </div>

            <div className="form-group">
                <label className="form-label">Question Answers</label>
                {rowData?.question_answers?.map((item , idx) => 
                <div className="d-flex gap-2">
                    <input
                type="checkbox"
                checked={item?.answer_check}
                onChange={() => {
                    const updatedAnswers = rowData.question_answers.map((answer, answerIdx) => ({
                        ...answer,
                        answer_check: answerIdx === idx
                    }));
                    console.log(updatedAnswers)
                    setRowData({ ...rowData, question_answers: updatedAnswers });
                }}
            />
                    <input style={{width:"100%"}} className="form-input" value={item?.answer_text}  onChange={(e) => {
              const updatedAnswers = [...rowData.question_answers];
              updatedAnswers[idx].answer_text = e.target.value;
              setRowData({ ...rowData, question_answers: updatedAnswers });
            }}/>
                    {idx !== 0 && <button  className="btn btn-danger" onClick={() => {
                        const updatedAnswers = rowData.question_answers.filter((_, answerIdx) => answerIdx !== idx);
                        setRowData({ ...rowData, question_answers: updatedAnswers });
                    }}>{deleteIcon}</button>}
                </div>)}

            </div>

            <div className="form-group">
                <label  htmlFor="question_img" className="form-label">Questions Image</label>
                <input  type="file"  onChange={(e) => {
                    setImg(URL.createObjectURL(e.target.files[0]));
                    setImgUrl(e.target.files[0])
                }} id="question_img"  className="form-input"/>

                {rowData?.question_image &&  <div className="image-preview">
              <img
                src={rowData?.question_image}
                alt="Lecture Preview"
              />
              <button
                type="button"
                onClick={removeImage}
                className="remove-image-btn"
              >
                <FaTrash />
              </button>
            </div>}
            </div>

            <button className="btn btn-primary">{"Edit"}</button>
        </form>
      </Modal>

      <Modal close={setOpenModal} visible={openModal} footer={null} title={"Add Questions"}>
        <form onSubmit={handleAddQuestion}>
            <div className="form-group">
                <label  htmlFor="question_text" className="form-label">Questions Text</label>
                <input value={questionData?.question_text} onChange={(e) => setQuestionsData({...questionData , question_text :e.target.value})} id="question_text" placeholder="Enter Question Text"  className="form-input" type="text"/>
            </div>

            <div className="form-group">
                <label className="form-label">Question Answers</label>
                {answers.map((ans , index) => (
                    <div className="d-flex justify-content-between gap-2">
                        <input style={{width:"20px"}} type="checkbox" onChange={() => handleSelectAnswer(ans?.id)} checked={ans?.answer_check}/>
                        <input value={ans?.answer_text} className="form-input" style={{width:"100%"}} type="text" onChange={(e) => setAnswers(answers.map(answer => answer?.id == ans?.id ? {...answer , answer_text:e.target.value} : answer))} placeholder="Enter Question Answer"/>
                        {index == 0 && <button className="btn btn-primary" onClick={handleAddAnswer}>+</button>}
                        {index !== 0 && <button  className="btn btn-danger" onClick={()=> handleDeleteAnswer(ans?.id)}>{deleteIcon}</button>}
                    </div>
                ))}
            </div>

            {/* <div className="form-group">
                <label  htmlFor="question_valid_answer" className="form-label">Questions Valid Answer</label>
                <input value={questionData?.question_valid_answer}  onChange={(e) => setQuestionsData({...questionData, question_valid_answer : e.target.value})} id="question_valid_answer" placeholder="Enter Question Valid Answer"  className="form-input" type="text"/>
            </div> */}

            <div className="form-group">
                <label  htmlFor="question_img" className="form-label">Questions Image</label>
                <input  type="file"  onChange={(e) => {
                    setImg(URL.createObjectURL(e.target.files[0]));
                    setImgUrl(e.target.files[0])
                }} id="question_img"  className="form-input"/>

                {imgUrl &&  <div className="image-preview">
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
            </div>}
            </div>

            <button className="btn btn-primary">{"Add"}</button>
        </form>
      </Modal>

      <CustomTable columns={columns} dataSource={allQuestions}/>

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

