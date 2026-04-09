// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, ColumnConfig, Competition, City, CreateCompetitionDto, DeleteCompetitionDto } from '../apiClient';

const Competitions = () => {
  //apiClient\\
  const apiClient = new ApiClient();



  //UseState\\
  const [competition, setCompetition] = useState<Competition[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    id: '',
    competitionName: '',
    competitionDate: '',
    cityId: ''
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: '',
    competitionName: '',
    competitionDate: '',
    cityId: ''
  });
  const [formDataDelete, setFormDataDelete] = useState({ id: '' });



  //Configs\\
  const columns: ColumnConfig<Competition>[] = [
    { key: 'competitionId', title: 'ID', sortable: true, width: '5%' },
    { key: 'competitionName', title: 'Название соревнования', sortable: true, width: '15%' },
    { key: 'dateCompetition', title: 'Дата проведения', sortable: true, width: '15%' },
    { key: 'cityCompetitionId', title: 'Город', sortable: true, width: '15%' }
  ];



  //DTO\\
  const createCompetitionDto = (data: typeof formData): CreateCompetitionDto => {
    return {
      competitionName: String(data.competitionName),
      competitionDate: new Date(data.competitionDate).toISOString().split('T')[0],
      cityId: Number(data.cityId)
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
    if (!formData.competitionName || !formData.competitionDate || !formData.cityId) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const dataToSend: CreateCompetitionDto = createCompetitionDto(formData)
    apiClient.createCompetition(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Соревнование успешно создано! ID: ${response.data?.competitionId}`);
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
  const [cityList, setCityList] = useState<City[]>([]);
  const handleGetCities = () => {
    apiClient.getAllCities().then(response => {
      if (response.success) {
        const data = response.data as City[];
        setCityList(data)
      }
      else {
        alert("Error")
      }
    })
  }


  const handleGet = () => {
    apiClient.getAllCompetitions().then(response => {
      if (response.success) {
        const data = response.data as Competition[];
        data.forEach(el => {
          el.dateCompetition = new Date(el.dateCompetition).toISOString().split('T')[0]
        })
        setCompetition(data)
      }
      else {
        alert("Error")
      }
    })
  }



  // Обновление спортсмена \\
  const handleUpdate = () => {
    if (!formDataUpdate.id) {
      alert("Введите ID соревнования")
      return
    }
    const updateData: any = { competitionId: parseInt(formDataUpdate.id) };
    let hasChanges = false;

    if (formDataUpdate.competitionName !== '') {
      updateData.competitionName = formDataUpdate.competitionName;
      hasChanges = true;
    }

    if (formDataUpdate.competitionDate !== '') {
      updateData.competitionDate = formDataUpdate.competitionDate;
      hasChanges = true;
    }

    if (formDataUpdate.cityId !== '') {
      updateData.cityId = formDataUpdate.cityId;
      hasChanges = true;
    }
    // Проверка наличия хотя бы одного изменения
    if (!hasChanges) {
      alert("Введите хотя бы одно поле для обновления");
      return;
    }
    apiClient.updateCompetition(updateData)
      .then(response => {
        if (response.success) {
          alert("Данные соревнования успешно обновлены");
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
    const sentData: DeleteCompetitionDto = { competitionId: parseInt(formDataDelete.id) };
    apiClient.deleteCompetition(sentData)
      .then(response => {
        if (response.success) {
          alert("Соревнование успешно удалено");
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
      competitionName: '',
      competitionDate: '',
      cityId: ''
    });
  };
  const clearUpdateForm = () => {
    setFormDataUpdate({
      id: '',
      competitionName: '',
      competitionDate: '',
      cityId: ''
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
        <h1>Соревнования</h1>
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
            <h2>Создать новое соревнование</h2>
            <div className="form-group">
              <label>Название Соревнования*</label>
              <input
                type="text"
                name="competitionName"
                value={formData.competitionName}
                onChange={handleInputChange}
                placeholder="Введите название соревнования"
              />
            </div>
            <div className="form-group">
              <label>Дата проведения*</label>
              <input
                type="date"
                name="competitionDate"
                value={formData.competitionDate}
                onChange={handleInputChange}
                placeholder="Введите дату"
              />
            </div>
            <div className="form-group">
              <label>ID города*</label>
              <select
                className="region-select"
                name="cityId"
                value={formData.cityId}
                onFocus={handleGetCities}
                onChange={handleInputChange}>
                <option value="">Выберите город</option>
                {cityList.map(city => (
                  <option
                    key={city.cityId}
                    value={city.cityId}>
                    {`${city.cityId} ${city.cityName}`}
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
              <h2>Просмотр соревнований</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список соревнований"
                data={competition}
                columns={columns}
                defaultSort={{ key: 'competitionName', direction: 'asc' }} />
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
              }}>Обновить данные соревнования</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>можно заполнить только одну строчку*</label>
            </div>
            <div className="form-group">
              <label>ID соревнования*</label>
              <select
                className="region-select"
                name="id"
                value={formDataUpdate.id}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите ID соревнования</option>
                {competition.map(comp => (
                  <option
                    key={comp.competitionId}
                    value={comp.competitionId}>
                    {`${comp.competitionId} ${comp.competitionName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Название соревнования*</label>
              <input
                type="text"
                name="competitionName"
                value={formDataUpdate.competitionName}
                onChange={handleInputUpdateChange}
                placeholder="Введите название соревнования"
              />
            </div>
            <div className="form-group">
              <label>Дата проведения*</label>
              <input
                type="date"
                name="competitionDate"
                value={formDataUpdate.competitionDate}
                onChange={handleInputUpdateChange}
                placeholder="Введите дату"
              />
            </div>
            <div className="form-group">
              <label>ID города*</label>
              <select
                className="region-select"
                name="cityId"
                value={formDataUpdate.cityId}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите город</option>
                {cityList.map(city => (
                  <option
                    key={city.cityId}
                    value={city.cityId}>
                    {`${city.cityId} ${city.cityName}`}
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
            <h2>Удалить соревнование</h2>
              <div className="form-group">
              <label>ID соревнования*</label>
              <select
                className="region-select"
                name="id"
                value={formDataDelete.id}
                onChange={handleInputDeleteChange}>
                <option value="">Выберите ID соревнования</option>
                {competition.map(comp => (
                  <option
                    key={comp.competitionId}
                    value={comp.competitionId}>
                    {`${comp.competitionId} ${comp.competitionName}`}
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


export default Competitions;