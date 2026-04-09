// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, City, CreateCityDto, DeleteCityDto, ColumnConfig } from '../apiClient';

const Cities = () => {
  //apiClient\\
  const apiClient = new ApiClient();


  enum Regions {
    SFO = 'SFO',
    DFO = 'DFO',
    UFO = 'UFO',
    SZFO = 'SZFO',
    PFO = 'PFO',
    CFO = 'CFO'
  }
  type Region = keyof typeof Regions;

  //UseState\\
  const [city, setCity] = useState<City[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    id: '',
    cityName: '',
    region: '' as Region | '',
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: '',
    cityName: '',
    region: '' as Region | ''
  });
  const [formDataDelete, setFormDataDelete] = useState({ id: '' });



  //Configs\\
  const columns: ColumnConfig<City>[] = [
    { key: 'cityId', title: 'ID', sortable: true, width: '5%' },
    { key: 'cityName', title: 'Название города', sortable: true, width: '15%' },
    { key: 'region', title: 'Округ', sortable: true, width: '15%' }
  ];



  //DTO\\
  const createCityDto = (data: typeof formData): CreateCityDto => {
    return {
      cityName: String(data.cityName),
      region: String(data.region),
    };
  };



  // Обработчики изменения полей формы\\
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleInputUpdateChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataUpdate(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleInputDeleteChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataDelete(prev => ({
      ...prev,
      [name]: value
    }));
  };






  // Создание нового спортсмена\\
  const handleCreate = () => {
    if (!formData.cityName || !formData.region) {
      alert("Пожалуйста, заполните обязательные поля (Название и регион)");
      return;
    }

    const dataToSend: CreateCityDto = createCityDto(formData)
    apiClient.createCity(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Город успешно создан! ID: ${response.data?.cityId}`);
      } else {
        alert(`Ошибка: ${response.error || "Неизвестная ошибка"}`);
        console.error("Ошибка создания:", response.error);
        console.log("Отправленные данные:", dataToSend);
      }
    }).catch(error => {
      alert("Сетевая ошибка: " + error.message);
      console.error("Ошибка сети:", error);
    });
  };



  // Получение всех спортсменов\\
  const handleGet = () => {
    apiClient.getAllCities().then(response => {
      if (response.success) {
        const data = response.data as City[];
        setCity(data)
      }
      else {
        alert("Error")
      }
    })
  }




  // Обновление спортсмена \\
  const handleUpdate = () => {
    if (!formDataUpdate.id) {
      alert("Введите ID города")
      return
    }
    const updateData: any = { cityId: parseInt(formDataUpdate.id) };
    let hasChanges = false;
    if (formDataUpdate.cityName !== '') {
      updateData.cityName = formDataUpdate.cityName;
      hasChanges = true;
    }

    if (formDataUpdate.region !== '') {
      updateData.region = formDataUpdate.region;
      hasChanges = true;
    }

    // Проверка наличия хотя бы одного изменения
    if (!hasChanges) {
      alert("Введите хотя бы одно поле для обновления");
      return;
    }
    apiClient.updateCity(updateData)
      .then(response => {
        if (response.success) {
          alert("Данные города успешно обновлены");
        } else {
          alert(`Ошибка при обновлении: ${response.error}`);
        }
      })
      .catch(error => {
        console.error("Ошибка сети:", error);
        alert("Сетевая ошибка при выполнении запроса");
      });


  }




  // Удаление спортсмена \\
  const handleDelete = () => {
    if (!formDataDelete.id) {
      alert("Введите ID")
      return
    }
    const sentData: DeleteCityDto = { cityId: parseInt(formDataDelete.id) };
    apiClient.deleteCity(sentData)
      .then(response => {
        if (response.success) {
          alert("Город успешно удален");
        } else {
          alert(`Ошибка при удалении: ${response.error}`);
        }
      })
      .catch(error => {
        console.error("Ошибка сети:", error);
        alert("Сетевая ошибка при выполнении запроса");
      });
  }




  // Очистка формы \\
  const clearForm = () => {
    setFormData({
      id: '',
      cityName: '',
      region: '',
    });
  };
  const clearUpdateForm = () => {
    setFormDataUpdate({
      id: '',
      cityName: '',
      region: '',
    });
  };
  const clearDeleteForm = () => {
    setFormDataDelete({
      id: '',
    });
  };






  //JSX\\
  return (
    //Menu\\
    <div className="app">
      <header className="app-header">
        <h1>Города</h1>
        <nav className="navigation">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Создать
          </button>
          <button
            className={`nav-btn ${activeTab === 'read' ? 'active' : ''}`}
            onClick={() => {
              handleGet()
              setActiveTab('read')
            }
            }
          >
            Просмотр
          </button>
          <button
            className={`nav-btn ${activeTab === 'update' ? 'active' : ''}`}
            onClick={() => {
              handleGet()
              setActiveTab('update')
            }
            }
          >
            Обновить
          </button>
          <button
            className={`nav-btn ${activeTab === 'delete' ? 'active' : ''}`}
            onClick={() => {
              handleGet()
              setActiveTab('delete')
            }
            }
          >
            Удалить
          </button>
        </nav>
      </header>

      {/* Create */}

      <main className="content">
        {activeTab === 'create' && (
          <div className="form-container">
            <h2>Создать новый город</h2>
            <div className="form-group">
              <label>Название*</label>
              <input
                type="text"
                name="cityName"
                value={formData.cityName}
                onChange={handleInputChange}
                placeholder="Введите название города"
              />
            </div>
            <div className="form-group">
              <label>Округ*</label>
              <select
                className="region-select"
                name="region"
                value={formData.region}
                onChange={handleInputChange}>
                <option value="">Выберите округ</option>
                {Object.keys(Regions).map(region => (
                  <option key={region} value={region}>
                    {Regions[region as Region]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button className="action-btn create" onClick={handleCreate}>
                Создать
              </button>
              <button className="action-btn clear" onClick={clearForm}>
                Очистить
              </button>
            </div>
          </div>
        )}


        {/* Read */}

        {activeTab === 'read' && (
          <div className="read-container">
            <div className="read-header">
              <h2>Просмотр городов</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список городов"
                data={city}
                columns={columns}
                defaultSort={{ key: 'cityName', direction: 'asc' }} />
            </div>
          </div>
        )}


        {/* Update */}


        {activeTab === 'update' && (
          <div className="form-container">
             <div
            style={{
              margin:'5px'
            }}>
              <h2
              style={{
                margin:'0px'
              }}>Обновить данные города</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>можно заполнить только одну строчку*</label>
            </div>
            <div className="form-group">
              <label>ID города*</label>
              <select
                className="region-select"
                name="id"
                value={formDataUpdate.id}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите ID города</option>
                {city.map(city => (
                  <option
                    key={city.cityId}
                    value={city.cityId}>
                    {`${city.cityId} ${city.cityName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Название*</label>
              <input
                type="text"
                name="cityName"
                value={formDataUpdate.cityName}
                onChange={handleInputUpdateChange}
                placeholder="Введите новое название"
              />
            </div>
            <div className="form-group">
              <label>Округ*</label>
              <select
                className="region-select"
                name="region"
                value={formDataUpdate.region}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите округ</option>
                {Object.keys(Regions).map(region => (
                  <option key={region} value={region}>
                    {Regions[region as Region]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button className="action-btn update" onClick={handleUpdate}>
                Обновить
              </button>
              <button className="action-btn clear" onClick={clearUpdateForm}>
                Очистить
              </button>
            </div>
          </div>
        )}


        {/* Delete */}

        {activeTab === 'delete' && (
          <div className="form-container">
            <h2>Удалить город</h2>
            <div className="form-group">
              <label>ID города*</label>
              <select
                className="region-select"
                name="id"
                value={formDataDelete.id}
                onChange={handleInputDeleteChange}>
                <option value="">Выберите ID города</option>
                {city.map(city => (
                  <option
                    key={city.cityId}
                    value={city.cityId}>
                    {`${city.cityId} ${city.cityName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button className="action-btn delete" onClick={handleDelete}>
                Удалить
              </button>
              <button className="action-btn clear" onClick={clearDeleteForm}>
                Очистить
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};


export default Cities;