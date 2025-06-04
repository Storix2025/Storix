import styles from './Pricing.module.css';
import logoIcon from '../../assets/image/logo-icon.png';
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  function sayPaymentMade() {
    alert("Оплата произведена");
  }

  return (
    <div className={styles.storixContainer}>
      <div className={styles.logoSection}>
        <div className={styles.loginBtnWrapper}>
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/")}
          >
            Вернуться
          </button>
        </div>
        <div className={styles.logo}>
          <img src={logoIcon} alt="Storix Logo" />
          <h4>Storix</h4>
        </div>


        <h1 className={styles.logo}>Анализ складских видео</h1>
        <p className={styles.subtitle}>
          Просто снимите видео на телефон, загрузите в сервис и <br />получите автоматический учет товаров
        </p>
      </div>

      <div className={styles.accessCard}>
        <h2>Полный доступ к сервису</h2>
        <p className={styles.price}>19 900₽</p>
        <p className={styles.paymentInfo}>
          Единоразовый платеж. Без подписок и скрытых платежей. <br />
          Доступ навсегда с бесплатными обновлениями
        </p>

        <div className={styles.howItWorks}>
          <h3>Как это работает</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.circle}>1</div>
              <p>Снимаете видео товаров на складе</p>
            </div>
            <div className={styles.step}>
              <div className={styles.circle}>2</div>
              <p>Загружаете в личный кабинет</p>
            </div>
            <div className={styles.step}>
              <div className={styles.circle}>3</div>
              <p>Получаете отчет за <strong>5 минут</strong></p>
            </div>
          </div>
        </div>

        <ul className={styles.features}>
          <li>Не требуется установка камер — используйте обычный смартфон</li>
          <li>Мгновенное уведомление о расходованиях</li>
          <li>Безлимитное количество видео и отчетов</li>
          <li>Поддержка 24/7</li>
        </ul>

        <button className={styles.accessButton} onClick={sayPaymentMade}>Получить доступ</button>
      </div>
    </div>
  );
}
