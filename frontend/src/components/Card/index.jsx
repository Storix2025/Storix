import "./style.css";
import clsx from "clsx";
export default function Card({ style, subtitle, title, status, name, email, warehouse }) {
  return (
    <div className="card" style={style}>
      <div className="card__info">
        <p className="card__subtitle">{subtitle}</p>
        <h3 className="card__title">{title}</h3>
        {status && (
          <div
            className={clsx(
              'card__status',
              status === 'pending' ? "card__status_pending": "card__status_done",
            )}
          >
            {status === "pending" ? "В обработке" : "Завершена"}
          </div>
        )}
      </div>
    </div>
  );
}
