import "./style.css";

const minusButton = ({ onClick }) => {
  return (
    <div className="minusButton" onClick={onClick}>
        -
    </div>
  );
};

export default minusButton;