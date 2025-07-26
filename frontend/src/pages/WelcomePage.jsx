import "../styles/welcome.css";
import { useEffect } from "react";

export default function WelcomePage() {
  useEffect(() => {
    const starsContainer = document.getElementById("stars");

    function createStar() {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 10 + 5}s`;
      star.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      star.style.filter = `blur(${Math.random() * 2}px)`;
      starsContainer.appendChild(star);

      setTimeout(() => {
        starsContainer.removeChild(star);
      }, 15000);
    }

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="hero">
        <div className="logo-container">
          <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <link rel="stylesheet" href="src/styles/welcome.css" />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ff80ff", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#8000ff", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r="64" fill="url(#grad)" />
            <text
              x="50%"
              y="58%"
              fontFamily="Arial, sans-serif"
              fontSize="70"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              Y
            </text>
          </svg>
          <h1 className="brand-name">Yumi</h1>
          <p className="tagline">
            Место, где контент становится искусством, а автор — королём.
          </p>
        </div>
        <div id="stars"></div>
        <div className="cta-buttons">
          <button onClick={() => (window.location.href = "/signup")}>Зарегистрироваться</button>
          <button onClick={() => (window.location.href = "/guest")}>Войти как гость</button>
          <p className="login-link">
            Уже есть аккаунт? <a href="/login">Войти</a>
          </p>
        </div>
      </header>

      <section className="info">
        <h2>Что такое Yumi?</h2>
        <p>
          Yumi — это мультимедийная платформа нового поколения, где ты управляешь своим контентом. Создавай каналы, загружай видео и стримы, получай донаты, кастомизируй интерфейс и получай прозрачную аналитику.
        </p>
        <p>
          Мы объединили лучшее от YouTube, Twitch, Discord и Telegram. Всё это — с ориентацией на удобство, свободу и реальный доход.
        </p>
      </section>

      <section className="features">
        <h2>Возможности Yumi</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="icon">🎥</span>
            <h3>Видео и стримы</h3>
            <p>Загружай, делись и транслируй что угодно. Без ограничений.</p>
          </div>
          <div className="feature-item">
            <span className="icon">💸</span>
            <h3>Донаты</h3>
            <p>Получай поддержку от зрителей даже под обычными видео.</p>
          </div>
          <div className="feature-item">
            <span className="icon">🎨</span>
            <h3>Полная кастомизация</h3>
            <p>Меняй внешний вид платформы под себя. Это твой стиль.</p>
          </div>
          <div className="feature-item">
            <span className="icon">📊</span>
            <h3>Умная аналитика</h3>
            <p>Смотри рост и доход своего канала в удобных графиках.</p>
          </div>
          <div className="feature-item">
            <span className="icon">🛍️</span>
            <h3>Товары и стикеры</h3>
            <p>Создавай и продавай NFT, мерч и коллекционные вещи.</p>
          </div>
          <div className="feature-item">
            <span className="icon">🛡️</span>
            <h3>Контроль качества</h3>
            <p>Авторов отбираем вручную. Контент — без мусора и копипасты.</p>
          </div>
        </div>
      </section>

      <footer className="final-cta">
        <p>Начни свой путь уже сегодня. В Yumi всё зависит только от тебя.</p>
        <button onClick={() => (window.location.href = "/signup")}>Зарегистрироваться</button>
      </footer>
    </div>
  );
}