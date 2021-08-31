// import scroll from "../images/svg/subscription-arrow.svg";
import {AiOutlineArrowUp} from "react-icons/ai"

const Scroll = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="scroll" onClick={handleClick}>
     <AiOutlineArrowUp className="scroll__arrow"/>
    </div>
  );
};

export default Scroll;
