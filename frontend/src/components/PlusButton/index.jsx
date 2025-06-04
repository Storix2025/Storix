import { Link } from 'react-router-dom';
import "./style.css";

const PlusButton = ({ to }) => {
  return (
    <Link 
      to={ to } 
      className="plusButton">
        +
    </Link>
  );
};

export default PlusButton;