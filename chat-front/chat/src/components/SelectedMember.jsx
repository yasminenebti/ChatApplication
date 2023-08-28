import PropTypes from 'prop-types';

import {AiOutlineClose} from "react-icons/ai"
const SelectedMember = ({handleRemoveMember , member}) => {
  return (
    <div className="flex items-center bg-white rounded-full">
        <img
        className="w-7 h-7 rounded-full"
        src={member.picture}
        alt=""
        />
        <p className="px-2">{member.firstName}</p>
        <AiOutlineClose
        onClick={handleRemoveMember}
        className="pr-1 cursor-pointer"/>
        
    </div>
  )
}

SelectedMember.propTypes = {
    handleRemoveMember: PropTypes.func.isRequired,
    member: PropTypes.any.isRequired
  };

export default SelectedMember