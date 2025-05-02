import styles from './Login.module.css';
import logoIcon from '../../assets/image/logo-icon.png';

export default function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={logoIcon} alt="Storix Logo" />
          <h1>Storix</h1>
        </div>
        <form>
          <input className={styles.inputTitle} type="email" placeholder="Эл. почта" required />
          <input className={styles.inputTitle} type="password" placeholder="Пароль" required />
          <button className={styles.buttonTitle} type="submit">Войти</button>
        </form>
        <a href="#" className={styles.forgotPassword}>Забыли пароль?</a>
      </div>
    </div>
  );
}
