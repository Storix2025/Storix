import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo />
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Войти
          </button>
        </header>

        <main className={styles.main}>
          <h1>Умная инвентаризация склада с AI</h1>
          <p className={styles.subtext}>
            Автоматический учет товаров по видео.
            <br />
            Быстро, точно.
          </p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate("/pricing")}
          >
            Узнать больше
          </button>
        </main>
      </div>
    </div>
  );
}
