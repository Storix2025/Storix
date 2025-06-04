import "./style.css";
export default function Card({ style, name, email, warehouse }) {
  return (
    <div className="card__user" style={style}>
      <div className="card__info">
          <p>
            <strong>Имя:</strong> {name}
          </p>
          {email ? (
            <p>
              <strong>Email:</strong> {email}
            </p>
          ) : (
            <p>
              <strong>Email:</strong> email не указан
            </p>
          )}
          {warehouse && (
            <p>
              <strong>Склад:</strong> {warehouse}
            </p>
          )}
        </div>
    </div>
  );
}
