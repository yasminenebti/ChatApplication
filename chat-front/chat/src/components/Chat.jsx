import PropTypes from 'prop-types';

const Chat = ({image,name}) => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
        <div className="w-[20%]">
            <img 
            className="rounded-full h-14 w-14" alt="" 
            src={image}
            />
        </div>
        <div className="pl-5 w-[80%]">
            <div className="flex justify-between items-center">
            <p className="text-lg">{name || "error getting name"}</p>
            <p className="text-sm">timestamp</p>
            </div>
            <div className="flex justify-between items-center">
                <p>message ...</p>
                <div className="flex space-x-2 items-center ">
                    <p className="text-xs py-1 px-2 text-white bg-secondary rounded-full">5</p>
                </div>
            </div>
        </div>
    </div>
  )
}

Chat.propTypes = {
    image: PropTypes.any.isRequired,
    name : PropTypes.any.isRequired
  };

export default Chat