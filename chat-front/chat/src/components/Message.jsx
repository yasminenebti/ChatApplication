import PropTypes from 'prop-types';

const Message = ({isRequestMessage , content}) => {
  return (
    <div className={`py-2 px-2 rounded-md max-w-[50%] ${isRequestMessage ? "self-end  bg-secondary text-white " : "self-start bg-grey"}`}>
        <p>{content}</p>
    </div>
  )
}


Message.propTypes = {
  isRequestMessage: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired
};



export default Message