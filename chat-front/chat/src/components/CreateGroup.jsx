import { useState } from "react"
import {FaArrowLeft} from "react-icons/fa"
import {AiFillCaretRight} from "react-icons/ai"
import SelectedMember from "./SelectedMember"
import Chat from "./Chat"
import NewGroup from "./NewGroup"
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux"
import { searchUser } from "../redux/auth/Action"



const CreateGroup = ({handleCloseGroup , setIsGroup , setAnchorEl}) => {
    const [newGroup, setNewGroup] = useState(false)
    const [groupMember, setGroupMember] = useState(new Set())
    const [query , setQuery] = useState("")


    const authState = useSelector((state) => state.auth);
    console.log(authState.searchUser)


    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
 

    const handleRemoveMember = (item) => {
      console.log(item)
      groupMember.delete(item)
      setGroupMember(groupMember)
    }
    const handleSearch = (search) => {
      search && dispatch(searchUser(search,token))
     }
    const handleNewGroup = () => {
      setNewGroup(true)
    }

  return (
    <div className="w-full h-full">
        {
            !newGroup && (
            <div>
              <div className="flex items-center space-x-10 bg-grey pt-16 px-10 pb-5">
              <FaArrowLeft className="cursor-pointer font-bold text-2xl" onClick={handleCloseGroup} />

              <p className="font-semibold"> Add New members</p>
              </div>
              <div className="relative py-4 px-3">
                <div className="flex space-x-2 flex-wrap space-y-1">
                  {groupMember.size > 0 && 
                  Array.from(groupMember).map((userToAdd,index)=>
                  <SelectedMember key={index} handleRemoveMember={() => handleRemoveMember(userToAdd)} member={userToAdd}/>
                  )}

                </div>
                
                <input type="text"  
                onChange={(e) => {
                  handleSearch(e.target.value)
                  setQuery(e.target.value)
                }}
                className="w-full  outline-none border-b-2 bg-silver border-grey p-2"
                placeholder="Search"
                value={query}
                />
              </div>

              <div className="bg-white overflow-y-scroll h-[50.2vh]">
                {
                  query && authState.searchUser?.map((user) => 
                  <div
                  onClick={() => {
                    groupMember.add(user)
                    setGroupMember(groupMember)
                    setQuery("")

                  }} 
                  key={user?.id}>
                    <hr/>
                    <Chat image={user.picture} name={user.firstName +" " + user.lastName}/>

                  </div>
                  )
                }
              </div>

              <div className="bottom-10 py-5 flex items-center justify-center">
                <div className="bg-blue rounded-full p-4 cursor-pointer" onClick={handleNewGroup}>
        
                  <AiFillCaretRight className="font-bold text-3xl" />
                </div>
              </div>


              
            </div>
            
        )}
        {newGroup && <NewGroup setAnchorEl={setAnchorEl} setIsGroup={setIsGroup} group={groupMember}/>}
    </div>
  )
}

CreateGroup.propTypes = {
  handleCloseGroup: PropTypes.func.isRequired,
  setIsGroup : PropTypes.any.isRequired,
  setAnchorEl : PropTypes.any.isRequired
};

export default CreateGroup