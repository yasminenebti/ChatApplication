import { useState } from "react"
import {FaArrowLeft} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { createGroup } from "../redux/chat/Actions"
import axios from "axios"
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



const NewGroup = ({group,setIsGroup , setAnchorEl}) => {
  
  const [upload, setIsUpload] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [groupImage, setGroupImage] = useState("")

  const authState = useSelector((state) => state.auth);
  const currentUserId = authState.reqUser?.id;


  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  
  const handleCreateGroup = () => {
    let usersId = []
    usersId.push(currentUserId)
    for (let user of group) {usersId.push(user.id)}

  
    const data = {
      usersId,
      name : groupName,
      picture : groupImage
    }
    console.log(data)



    dispatch(createGroup(data,token,currentUserId))
    setIsGroup(false)
    setAnchorEl(false)
  }

  const uploadImage =(picture) =>{
    setIsUpload(true)
    const data = new FormData()
    data.append("file",picture)
    data.append("upload_preset","chatApplication")
    data.append("cloud_name","duv3sihve")
    axios.post("https://api.cloudinary.com/v1_1/duv3sihve/image/upload" , data).then((res) => res.data)
    .then((data)=>{
      setGroupImage(data.url.toString()) 
      setIsUpload(false)
      
    })
  }

  

  return (
    <div className="w-full h-full">
        <div className="cursor-pointer text-2xl font-bold">
        <FaArrowLeft className="cursor-pointer font-bold text-2xl"/>
        <p className="text-xl font-semibold">New Group</p> 
        </div>

        <div className="flex flex-col justify-center items-center my-12">
            <label htmlFor="imgInput" className="relative">
                <img
                className="rounded-full w-[10vw] h-[10vw] cursor-pointer"
                 src={groupImage || "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"} alt=""/>
                {upload && 
                    <Box className="pt-4 text-primary" sx={{ width: '100%' }}>
                      <LinearProgress  color="inherit" />
                    </Box>}
            </label>
            <input
            type="file"
            id="imgInput"
            className="hidden"
            onChange={(e)=> uploadImage(e.target.files[0])}/>

            <div className="w-full flex space-x-8 items-center py-8 px-6">
                <input 
                type="text" 
                value={groupName}
                onChange={(e) => {setGroupName(e.target.value)}}
                placeholder="Group Name"
                className="w-full outline-none border-b-2 bg-silver border-blue  p-2"/>
                

            </div>

            {
              groupName && (
                <div className="py-10flex items-center justify-center">
                  <button onClick={handleCreateGroup}>
                    <div className="rounded-full p-4">
                    <p className=" hover:bg-sky font-medium bg-grey rounded-full p-3">Start your group</p>
                    </div>
                  </button>
                </div>
              )
            }
        </div>
    </div>
  )
}

NewGroup.propTypes = {
  group: PropTypes.any.isRequired,
  setIsGroup: PropTypes.any.isRequired,
  setAnchorEl : PropTypes.any.isRequired

};

export default NewGroup