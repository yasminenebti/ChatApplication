import {AiOutlineCheck} from "react-icons/ai"
import {FaArrowLeft} from "react-icons/fa"
import PropTypes from 'prop-types';


import {FiEdit} from "react-icons/fi"
import { useState } from "react";
import { updateProfile } from "../redux/auth/Action";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Profile = ({handleProfile}) => {
  const token = localStorage.getItem("token") 
  const authState = useSelector((state) => state.auth);
  const currentUserId = authState.reqUser?.id;
  const dispatch = useDispatch()

  //cloudinary image
  const [picture,setPicture] = useState(null)

  // first name edit 
  const [edit , setEdit] = useState(false)
  const [firstName , setFirstName] = useState(false)
  const handleEdit = () => {
    setEdit(true)
  }
  const confirmEdit = () => {
    setEdit(false)
    const firstNameToUpdate= {firstName:firstName}
    dispatch(updateProfile(currentUserId,firstNameToUpdate,token))
    
  }
  const handleChange = (e) => {
    setFirstName(e.target.value)
  }

  // const handleChangeName = (e) => {
  //     const firstNameToUpdate= {firstName:username}
  //     console.log(e.key)
  //     if(e.key == "Enter") {
  //       console.log("jojo")
  //       dispatch(updateProfile(currentUserId,firstNameToUpdate,token))
  //     }
  // }

  //  last name edit 
  const [editLastName , setEditLastName] = useState(false)
  const [lastName , setLastName] = useState(false)
  const handleEditLastName = () => {
    setEditLastName(true)
  }
  const confirmEditLastName = () => {
    setEditLastName(false)
    const listNameToUpdate= {lastName:lastName}
    dispatch(updateProfile(currentUserId,listNameToUpdate,token))
  }
  const handleChangeLastName = (e) => {
    setLastName(e.target.value)
  }



  //email edit

  const [editEmail , setEditEmail] = useState(false)
  const [email , setEmail] = useState(false)
  const handleEditEmail = () => {
    setEditEmail(true)
  }
  const confirmEditEmail = () => {
    setEditEmail(false)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    const emailToUpdate= {email:email}
    dispatch(updateProfile(currentUserId,emailToUpdate,token))
  }


  



  const uploadImage =(picture) =>{
    const data = new FormData()
    data.append("file",picture)
    data.append("upload_preset","chatApplication")
    data.append("cloud_name","duv3sihve")
    axios.post("https://api.cloudinary.com/v1_1/duv3sihve/image/upload" , data).then((res) => res.data)
    .then((data)=>{
      console.log("imgUrl",data.url.toString())
      setPicture(data.url.toString()) 
      const pictureToUpload = {picture : data.url.toString()}
      console.log("data picture",pictureToUpload)
      dispatch(updateProfile(currentUserId,pictureToUpload,token))
    })
  }

  return (
    <div className="w-full h-full">
        <div className="flex items-center space-x-10 bg-grey pt-16 px-10 pb-5">
          <FaArrowLeft className="cursor-pointer font-bold text-2xl" onClick={handleProfile} />
          <p className="font-semibold"> Profile</p>
        </div>
        <div className="flex flex-col justify-center items-center my-6">
          <label htmlFor="imgInput">
            <img 
            className="rounded-full w-[10vw] h-[10vw] cursor-pointer" 
            src={ authState.reqUser?.picture ||  picture || authState.reqUser?.picture} alt=""></img>
          </label>
          <input onChange={(e)=>uploadImage(e.target.files[0])} type="file" id="imgInput" className="hidden"/>
        </div>
        <div className="px-3">
          
          <p className="pt-9 text-secondary font-medium italic">First Name</p>
          {
            !edit && 
            <div className="w-full flex justify-between items-center border-b">
            <p className="py-2 font-medium">{firstName || authState.reqUser?.firstName || "first name"}</p>
            <FiEdit onClick={handleEdit} className="cursor-pointer"/>
            
          </div>
          }
          {
            edit && 
            <div className="w-full flex justify-between items-center border-b">
            <input onChange={handleChange} className="w-[80%] outline-none border-b-2 bg-silver border-blue p-2" type="text" placeholder="Enter your name"/>
            <AiOutlineCheck onClick={confirmEdit} className=" cursor-pointer"/>
            
          </div>
          }

          <p className="pt-9 text-secondary font-medium italic">Last Name</p>

          {
            !editLastName && 
            <div className="w-full flex justify-between items-center border-b">
            <p className="py-2 font-medium">{lastName || authState.reqUser?.lastName || "last name"}</p>
            <FiEdit onClick={handleEditLastName} className="cursor-pointer"/>
            
          </div>
          }
          {
            editLastName && 
            <div className="w-full flex justify-between items-center border-b">
            <input onChange={handleChangeLastName} className="w-[80%] outline-none border-b-2 bg-silver border-blue p-2" type="text" placeholder="Enter your last name"/>
            <AiOutlineCheck onClick={confirmEditLastName} className=" cursor-pointer"/>
            
          </div>
          }
          
          <p className="pt-9 text-secondary font-medium italic">Email</p>

          {
            !editEmail && 
            <div className="w-full flex justify-between items-center border-b">
            <p className="py-2 font-medium">{email || authState.reqUser?.email || "email"}</p>
            <FiEdit onClick={handleEditEmail} className="cursor-pointer"/>
            
          </div>
          }
          {
            editEmail && 
            <div className="w-full flex justify-between items-center border-b">
            <input onChange={handleChangeEmail} className="w-[80%] outline-none border-b-2 bg-silver border-blue p-2" type="email" placeholder="Enter your email"/>
            <AiOutlineCheck onClick={confirmEditEmail} className=" cursor-pointer"/>
            
          </div>
          }
        </div>
    </div>
  )
}

Profile.propTypes = {
  handleProfile: PropTypes.func.isRequired,
};

export default Profile