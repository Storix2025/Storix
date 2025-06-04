import { useState, useRef, useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../api/axiosClient";
import {
  setVideoFile as setVideoFileRedux,
  setJsonFile as setJsonFileRedux,
} from "../../redux/reducers/fileSlice";

export default function InventariztionPage() {
  const dispatch = useDispatch();

  const [resultPairs, setResultPairs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  const videoFile = useSelector((state) => state.files.videoFile);
  const videoURL = useSelector((state) => state.files.videoURL);
  const jsonFile = useSelector((state) => state.files.jsonFile);

  const handleJsonClick = () => {
    jsonInputRef.current.click();
  };

  useEffect(() => {
    const res = axiosClient.get(`/warehouses/`);
    console.log("res", res);
  }, []);

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  function base64ToFile(base64String, filename, mimeType) {
    const byteString = atob(base64String.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], filename, { type: mimeType });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch(setVideoFileRedux({ file, url }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      dispatch(setVideoFileRedux({ file, url }));
    }
  };

  const handleJsonFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      dispatch(setJsonFileRedux(file));
    } else {
      alert("Пожалуйста, выберите корректный JSON-файл");
    }
  };

  const handleJsonDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      dispatch(setJsonFileRedux(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleJsonDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const renderStatusRow = (pair) => {
    const status = pair.current_location === pair.rack ? "OK" : "Расхождение";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) return alert("Выберите видео");

    const formData = new FormData();
    formData.append("video", videoFile);

    if (jsonFile) {
      const jsonText = await jsonFile.text();
      formData.append("config", jsonText);
    } else {
      console.log("JSON не был загружен");
      return;
    }

    try {
      const res = await axiosClient.post(`/inventory/reports/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const created = res.data;
      console.log("Успешно отправлено");

      if (!created.id) {
        return;
      }

      const res2 = await axiosClient.post(
        `/inventory/reports/${created.id}/run/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const done = res2.data;
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
    <div className="invenariaztion-page">
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
                  Перетащите видео сюда
                  <br />
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

            <div className="upload-button">Выбрать видео</div>
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
                  Перетащите JSON-файл сюда
                  <br />
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

            <div className="upload-button">Выбрать JSON</div>
          </div>

          <button
            className="upload-button"
            type="submit"
          >
            Отправить
          </button>
        </form>
      </div>

      
      {videoURL && (
        <video className="store-video-preview" src={videoURL} controls />
      )}
        
      {modalVisible && (
        <div>
          <p className="store-invenariaztion-text">Расхождение в товарах</p>
        
          <div className="modal-backdrop">
            <div className="modal">
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
                <tbody>{resultPairs.map(renderStatusRow)}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
