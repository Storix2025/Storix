import styles from './Home.module.css';
import logoIcon from '../../assets/image/logo-icon.png';
import alarmClock from '../../assets/image/alarm-clock.png';
import bell from '../../assets/image/bell.png';
import checkMark from '../../assets/image/grayCheckMark.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <div className={styles.container} >
        <header className={styles.header}>
          <div className={styles.logoBox}>
            <img src={logoIcon} alt="Storix" />
            <span className={styles.logoText}>Storix</span>
          </div>
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>Войти</button>
        </header>

        <main className={styles.main}>
          <h1>Умная инвентаризация склада с AI</h1>
          <p className={styles.subtext}>Автоматический учет товаров по видео.<br />Быстро, точно.</p>
          <button className={styles.ctaBtn} onClick={() => navigate('/pricing')}>Узнать больше</button>

          <div className={styles.features}>
            <div className={styles.feature}>
              <img src={alarmClock} alt="alarmClock" />
              <p>Анализ за 5 минут</p>
            </div>
            <div className={styles.feature}>
              <img src={checkMark} alt="checkMark" />
              <p>Точность 99.9%</p>
            </div>
            <div className={styles.feature}>
              <img src={bell} alt="bell" /> 
              <p>Уведомления о<br />расхождениях</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
