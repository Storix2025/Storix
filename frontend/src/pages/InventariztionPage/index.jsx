import { useState, useRef } from "react";
import "./style.css";
import Logo from "../../components/Logo";

export default function InventariztionPage() {
  const baseUrl = "https://backend-storix.store/api";
  
  const [resultPairs, setResultPairs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const fileInputRef = useRef(null);

  const [jsonFile, setJsonFile] = useState(null);
  const jsonInputRef = useRef(null);

  const handleJsonClick = () => {
    jsonInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleJsonDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      setJsonFile(file);
    }
  };
  
  const handleJsonDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const renderStatusRow = (pair) => {
    const status = pair.current_location === pair.rack ? "OK" : "Расхождение";
    // const statusClass = status === "OK" ? "status-ok" : "status-error";
  
    return (
      <tr key={pair.box}>
        <td>{pair.box}</td>
        <td>{pair.current_location || "-"}</td>
        <td>{pair.rack}</td>
        <td>
          <div className="status-wrapper">
            <span className={`status-${status === "OK" ? "ok" : "error"}`}>
              {status}
            </span>
          </div>
        </td>
      </tr>
    );
  };

  const handleJsonFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      setJsonFile(file);
    } else {
      alert("Пожалуйста, выберите корректный JSON-файл");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) return alert("Выберите видео");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('video', videoFile);

    if (jsonFile) {
      const jsonText = await jsonFile.text();
      formData.append('config', jsonText);
    } else {
      console.log("JSON не был загружен");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/inventory/reports/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const created = await res.json();
      console.log("Успешно отправлено");

      if (!created.id) {
        return;
      }

      const res2 = await fetch(`${baseUrl}/inventory/reports/${created.id}/run/`,  {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const done = await res2.json();
      if (done?.result?.пары) {
        setResultPairs(done.result.пары);
        setModalVisible(true);
      }
      console.log("Анализ завершён");

    } catch (err) {
      console.error("Ошибка загрузки:", err);
    }
  };

  return (
    <div className="store-container">
      <div className="sidebar">
        <div className="sidebar-logo">
          <Logo />
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link">История проверок</a>
          <a href="/inventarization" className="sidebar-link active">Инвентаризация</a>
        </nav>
      </div>

      <div className="main-content">
        <header className="store-header">
          <p className="store-header-logo">Инвентаризация</p>
          <div className="store-header-user">
            <div className="store-header-sobLogo">Пользователь</div>
            <div className="circle">П</div>
          </div>
        </header>

        <div className="store-video-container">
          <p className="store-video-text">Загрузить видео</p>

          <form onSubmit={handleSubmit} className="store-video-form">
            <div
              className="drop-zone"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <p className="drop-zone-text">
                {videoFile ? (
                  videoFile.name
                ) : (
                  <>
                    Перетащите видео сюда<br />
                    Или нажмите кнопку ниже
                  </>
                )}
              </p>

              <input
                className="hidden-file-input"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />

              <div className="upload-button">
                Выбрать видео
              </div>

              
            </div>

            <div
              className="drop-zone"
              onClick={handleJsonClick}
              onDrop={handleJsonDrop}
              onDragOver={handleJsonDragOver}
            >
              <p className="drop-zone-text">
                {jsonFile ? (
                  jsonFile.name
                ) : (
                  <>
                    Перетащите JSON-файл сюда<br />
                    Или нажмите кнопку ниже
                  </>
                )}
              </p>

              <input
                className="hidden-file-input"
                type="file"
                accept=".json"
                onChange={handleJsonFileChange}
                ref={jsonInputRef}
              />

              <div className="upload-button">
                Выбрать JSON
              </div>
            </div>

            <button className="upload-button" type="submit">
              Отправить
            </button>
          </form>
        </div>
        
        <p className="store-invenariaztion-text">Расхождение в товарах</p>
        {videoURL && (
          <video className="store-video-preview" src={videoURL} controls />
        )}

         {modalVisible && (
        <div className="modal-backdrop">
          <div className="modal">
            {/* <span className="close" onClick={() => setModalVisible(false)}>&times;</span> */}
            <h2>Результаты инвентаризации</h2>
            <table>
              <thead>
                <tr>
                  <th>ID товара</th>
                  <th>Текущее местоположение</th>
                  <th>Ожидаемое местоположение</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {resultPairs.map(renderStatusRow)}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}