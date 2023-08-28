import {AiOutlineWechat , AiOutlineSearch } from "react-icons/ai"
import { BiFilter , BiSmile} from "react-icons/bi"
import {BsThreeDots , BsFillMicFill , BsThreeDotsVertical} from "react-icons/bs"
import {GrAttachment} from "react-icons/gr"
import Chat from "../components/Chat"
import { useEffect, useState } from "react"
import Message from "../components/Message"
import "./Home.css"
import Profile from "./Profile"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateGroup from "../components/CreateGroup"
import { useDispatch, useSelector} from "react-redux"
import { currentUser, logoutAccount, searchUser } from "../redux/auth/Action"
import { useNavigate } from "react-router"
import { createChat, getChatsByUser } from "../redux/chat/Actions"
import { createMessage, getAllMessages } from "../redux/message/Action"
import SockJS from "sockjs-client/dist/sockjs"
import {over} from "stompjs"


const Home = () => {
  const [query , setQuery] = useState("")
  const [currentChat , setCurrentChat] = useState("")
  const [openChat , setOpenChat] = useState("")
  const [message , setMessage] = useState("")
  const [messages , setMessages] = useState([])
  const [isProfile , setIsProfile] = useState("")
  const [isGroup , setIsGroup] = useState("")
 const [anchorEl, setAnchorEl] = useState(null);
 const [stompClient, setStompClient] = useState(null);
 const [connection, setConnection] = useState(false);


 const open = Boolean(anchorEl);
 const dispatch = useDispatch()
 const navigate = useNavigate()

 const token = localStorage.getItem("token") 
 const authState = useSelector((state) => state.auth);
 const chatState = useSelector((state) => state.chat);
 const messageState = useSelector((state) => state.message);
 console.log(message)


 const connect=() => {
  const sock= new SockJS("http://localhost:9200/ws")
  const temp = over(sock)
  setStompClient(temp)
  
  const headers={
    Authorization : `Bearer ${token}`,
    "X-XSRF-TOKEN" :  getCookie("XSRF-TOKEN")

  }

  temp.connect(headers,onConnect,onError)
 }

 function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length===2){
      return parts.pop().split(",").shift()
    }
 }

 const onError=(error)=>{
  console.log(error)
 }

 const onConnect=()=>{
  setConnection(true)
 }

 const onMessageReceive=(payload) => {
  console.log("receive message" , JSON.parse(payload.body))
  const receivedMessage= JSON.parse(payload.body)
  setMessages([...messages,receivedMessage])

 }

 

 const handleClick = (e) => {
   setAnchorEl(e.currentTarget);
 };
 const handleClose = () => {
   setAnchorEl(null);
 };



  const handleSearch=(query) => {
    dispatch(searchUser(query,token))
  }
  // const handleCreateChat = (userId) => {

  // }
  const handleCreateGroup = () => {
    setIsGroup(true)
  }

  const handleSearchChatChange = (userIdToChat) => {
    setCurrentChat(true);
    dispatch(createChat(authState.reqUser?.id , userIdToChat))
  };

  const handleChatChange = (chat) => {
    setCurrentChat(true);
    setOpenChat(chat)
  };

  const handleCreateNewMessage = () => {
    dispatch(createMessage({userId:authState.reqUser?.id,chatId:openChat.id,message:message},token))
    
  }
  const handleProfileNavigation=() => {
    setIsProfile(true)
  }
  const handleProfile = () => {
    setIsProfile(false)
  }
  const handleCloseGroup = () => {
    setIsGroup(false)
    setAnchorEl(false)
  }
  const handleLogout = () => {
    dispatch(logoutAccount())
    navigate("/login")
  }
  

  useEffect(() => {
    if(token)
    dispatch(currentUser(token))
    else{
      navigate("/login")
    }
  },[token, dispatch, navigate])

  useEffect(() => {
    authState.reqUser?.id && dispatch(getChatsByUser(authState.reqUser?.id,token))
  },[authState.reqUser?.id, dispatch, token])

  useEffect(() => {
   openChat && dispatch(getAllMessages(openChat.id,token))
  },[openChat, messageState.message, dispatch, token])

  useEffect(()=>{
    if(messageState.message && stompClient){
      setMessages([...messages, messageState.message])
      stompClient?.send("/app/message",{},JSON.stringify(messageState.message))
    }
  },[messageState.message, messages, stompClient])

  useEffect(()=>{
    setMessages(messageState.messages)
    
  },[messageState.messages])

  useEffect(()=>{
    console.log("helllll---------------")
    if(connection && stompClient && authState.reqUser && openChat){
      const subscription = stompClient.subscribe("/group/"+openChat.id.toString(), onMessageReceive)
      console.log("helooooooooooooooo---------------")

    return () => {
      subscription.unsubscribe()
    }
    }
    
  },[])

  useEffect(()=>{
    connect()
    console.log("hello")
    
  },[])
  



  return (
    <div className="relative"> 
      <div className=" flex h-[90vh] absolute top-6 w-full">
        {/* ************* left side **************** */}
        <div className="left w-[30%] bg-silver h-full">
          { isGroup && <div className="w-full h-full"> <CreateGroup setAnchorEl={setAnchorEl} setIsGroup={setIsGroup} handleCloseGroup={handleCloseGroup}/></div>}
          { isProfile && <div className="w-full h-full"> <Profile handleProfile={handleProfile}/></div>}
          { !isProfile && !isGroup &&<div className="w-full">
             
          <div className="flex justify-between items-center p-3">
            <div onClick={handleProfileNavigation} className="flex items-center space-x-3">
              <img className="rounded-full w-14 h-14 cursor-pointer" src={authState.reqUser?.picture} alt=""/>
              <p className="font-medium">{authState.reqUser?.username ? authState.reqUser.firstName + " " +authState.reqUser.lastName  : " "}</p>
            </div>
            
            <div className="space-x-3 text-2xl flex">
              <AiOutlineWechat className="cursor-pointer"/>
              <BsThreeDotsVertical 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} 
                className="cursor-pointer"/>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
              >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            
            </div>
          </div>

          <div className="relative flex justify-center items-center px-3 pb-4">
              <input 
                placeholder="Search or start new chat" 
                type="text" 
                className="border-none outline-none py-2 bg-grey pl-9 rounded-md w-[93%]"
                onChange={(e) => {
                  setQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
                value={query}
                />
                <AiOutlineSearch className="left-7 top-3 absolute cursor-pointer" />
              <div>
                <BiFilter className="ml-4 text-3xl cursor-pointer"/>
              </div>
          </div>

          <div className="bg-white overflow-y-scroll h-[72vh] px-3">


              { query && authState.searchUser?.map((user , index)=>
              
              <div 
              key={index}
              onClick={() => handleSearchChatChange(user.id)}
              > 
                <hr className="text-silver"/> 
                <Chat name={user.firstName + " " + user.lastName} image={user.picture}/>  
              </div>)
              }
              


              { !query && chatState.chats.length > 0 && chatState.chats?.map((chat , index)=>
              <div 
              key={index}
              onClick={() => handleChatChange(chat)}
              > 
                <hr className="text-silver"/> 
                { chat.group ? 
                (<Chat name={chat.name} image={chat.picture} /> ) : 
                (<Chat name={chat.usersChat.filter(user => user !== authState.reqUser?.firstName + " " + authState.reqUser?.lastName)} image={chat.usersChatImages.filter(user => user !== authState.reqUser?.picture)} />)} 
              </div>)}
             

          </div>
          <div>
              hello
          </div>
            

        </div>}
      </div>


        {/* ************* right side **************** */}
      <div className="right bg-white w-[70%]">
          {
            !currentChat && 
            <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <img src="" alt=""/>
              <h1 className="text-4xl font-bold">Chat Application</h1>
              <p className="my-9">Send chat or start new conversation with your friends</p>
            </div>
          </div>
          }

          {
            currentChat && <div className="">
              <div className="bg-white">
                <div className="flex justify-between">
                  <div className="py-3 space-x-3 flex items-center px-3">
                    <img 
                    className="w-10 h-10 rounded-full" 
                    src=
                    { openChat.group 
                      ?  openChat.picture
                      :  openChat.usersChatImages.filter(user => user !== authState.reqUser?.picture 
                      )
                    } alt=" "/>
                    <p>
                    { openChat.group ? 
                      openChat.name
                      : openChat.usersChat.filter(user => user !== authState.reqUser?.firstName + " " + authState.reqUser?.lastName)
                    }
                      </p>
                  </div>
                  <div className="flex py-3 space-x-4 items-center px-3">
                    <AiOutlineSearch />
                    <BsThreeDots/>
                  </div>
                </div>
              </div>
               {/* message section */}
             
              <div className="px-10 h-[74vh] overflow-y-scroll bg-blue">
                <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {  messages.length >0 && messages.map((message , index)=>
                <Message 
                  key={index} 
                  isRequestMessage={message.userSender === authState.reqUser?.id} 
                  content={message.content}/>)}
                </div>
              </div>


              {/* send message section */}
              <div className="bg-grey absolute bottom-0  py-2 w-[70%] text-xl">
                <div className="flex justify-between items-center px-5 relative">
                <div className="flex justify-between space-x-6">
                  <BiSmile className="cursor-pointer"/>
                  <GrAttachment className="cursor-pointer"/> 
                </div>
                <input 
                   type="text" 
                   onChange={(e) => setMessage(e.target.value)} 
                   className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  value={message}
                  placeholder="Type a message"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        e.preventDefault(); 
                        handleCreateNewMessage();
                        setMessage(""); 
                       }
                   }}
                />
                <BsFillMicFill className="cursor-pointer"/>
                </div>
               

              </div>
             

            </div>
          }

        </div>
        
    </div>

    </div>
  )
}

export default Home