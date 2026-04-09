// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';
import { ApiClient, Sportsmen, ColumnConfig, CreateSportsmanDto, DeleteSportsmenDto } from '../apiClient';


const Sportsmens = () => {
  //apiClient\\
  const apiClient = new ApiClient();


  //UseState\\
  const [sportsmen, setSportsmen] = useState<Sportsmen[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    birthDate: ''
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    birthDate: ''
  });
  const [formDataDelete, setFormDataDelete] = useState({ id: '' });


  //Configs\\
  const columns: ColumnConfig<Sportsmen>[] = [
    { key: 'sportsmenId', title: 'ID', sortable: true, width: '5%' },
    { key: 'lastName', title: 'Фамилия', sortable: true, width: '15%' },
    { key: 'firstName', title: 'Имя', sortable: true, width: '15%' },
    { key: 'patronymic', title: 'Отчесвто', sortable: true, width: '15%' },
    { key: 'birthDate', title: 'Дата рождения', sortable: true, width: '15%' },
  ];


  //DTO\\
  const createSportsmenDto = (data: typeof formData): CreateSportsmanDto => {
    return {
      firstName: String(data.firstName),
      lastName: String(data.lastName),
      patronymic: data.patronymic ? String(data.patronymic) : null,
      birthDate: new Date(data.birthDate).toISOString().split('T')[0]
    };
  };



  // Обработчики изменения полей формы\\
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.firstName || !formData.lastName || !formData.birthDate) {
      alert("Пожалуйста, заполните обязательные поля (Имя, Фамилия, Дата рождения)");
      return;
    }
    const dataToSend: CreateSportsmanDto = createSportsmenDto(formData)
    apiClient.create(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Спортсмен успешно создан! ID: ${response.data?.sportsmenId}`);
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
    apiClient.getAllSportsmens().then(response => {
      if (response.success) {
        const data = response.data as Sportsmen[];
        data.forEach(el => {
          el.birthDate = new Date(el.birthDate).toISOString().split('T')[0]
        })
        setSportsmen(data)
      }
      else {
        alert("Error")
      }
    })
  }




  // Обновление спортсмена \\
  const handleUpdate = () => {
    if (!formDataUpdate.id) {
      alert("Введите ID спортсмена")
      return
    }
    const updateData: any = { sportsmenId: parseInt(formDataUpdate.id) };
    let hasChanges = false;
    if (formDataUpdate.firstName !== '') {
      updateData.firstName = formDataUpdate.firstName;
      hasChanges = true;
    }

    if (formDataUpdate.lastName !== '') {
      updateData.lastName = formDataUpdate.lastName;
      hasChanges = true;
    }

    if (formDataUpdate.patronymic !== '') {
      updateData.patronymic = formDataUpdate.patronymic || null;
      hasChanges = true;
    }

    if (formDataUpdate.birthDate !== '') {
      updateData.birthDate = formDataUpdate.birthDate;
      hasChanges = true;
    }

    // Проверка наличия хотя бы одного изменения
    if (!hasChanges) {
      alert("Введите хотя бы одно поле для обновления");
      return;
    }
    apiClient.updateSportsmen(updateData)
      .then(response => {
        if (response.success) {
          clearUpdateForm()
          alert("Данные спортсмена успешно обновлены");
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
    const sentData: DeleteSportsmenDto = { sportsmenId: parseInt(formDataDelete.id) };
    apiClient.deleteSportsmen(sentData)
      .then(response => {
        if (response.success) {
          clearDeleteForm()
          alert("Спортсмен успешно удален");
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
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: ''
    });
  };
  const clearUpdateForm = () => {
    setFormDataUpdate({
      id: '',
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: ''
    });
  };
  const clearDeleteForm = () => {
    setFormDataDelete({
      id: '',
    });
  };

  //JSX\\
  return (


    //{ Menu } \\

    <div className="app">
      <header className="app-header">
        <h1>Спортсмены</h1>
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
            }}
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
            }}
          >
            Удалить
          </button>
        </nav>
      </header>

      {/* Create */}

      <main className="content">
        {activeTab === 'create' && (
          <div className="form-container">
            <h2>Создать нового спортсмена</h2>
            <div className="form-group">
              <label>Фамилия*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Введите фамилию"
              />
            </div>
            <div className="form-group">
              <label>Имя*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Введите имя"
              />
            </div>
            <div className="form-group">
              <label>Отчество*</label>
              <input
                type="text"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleInputChange}
                placeholder="Введите отчество (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>Дата рождения*</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
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
              <h2>Просмотр спортсменов</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список спортсменов"
                data={sportsmen}
                columns={columns}
                defaultSort={{ key: 'lastName', direction: 'asc' }} />
            </div>
          </div>
        )}


        {/* Update */}


        {activeTab === 'update' && (
          <div className="form-container">
            <div
              style={{
                margin: '5px'
              }}>
              <h2
                style={{
                  margin: '0px'
                }}>Обновить данные спортсмена</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>можно заполнить только одну строчку*</label>
            </div>
            <div className="form-group">
              <label>ID спортсмена*</label>
              <select
                className="region-select"
                name="id"
                value={formDataUpdate.id}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите ID спортсмена</option>
                {sportsmen.map(sportsman => (
                  <option
                    key={sportsman.sportsmenId}
                    value={sportsman.sportsmenId}>
                    {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Фамилия*</label>
              <input
                type="text"
                name="lastName"
                value={formDataUpdate.lastName}
                onChange={handleInputUpdateChange}
                placeholder="Введите фамилию"
              />
              <div className="form-group">
                <label>Имя*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formDataUpdate.firstName}
                  onChange={handleInputUpdateChange}
                  placeholder="Введите имя"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Отчество*</label>
              <input
                type="text"
                name="patronymic"
                value={formDataUpdate.patronymic}
                onChange={handleInputUpdateChange}
                placeholder="Введите отчество"
              />
            </div>
            <div className="form-group">
              <label>Дата рождения*</label>
              <input
                type="date"
                name="birthDate"
                value={formDataUpdate.birthDate}
                onChange={handleInputUpdateChange}
              />
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
            <h2>Удалить спортсмена</h2>
            <div className="form-group">
              <label>ID спортсмена*</label>
              <select
                className="region-select"
                name="id"
                value={formDataDelete.id}
                onChange={handleInputDeleteChange}>
                <option value="">Выберите ID спортсмена</option>
                {sportsmen.map(sportsman => (
                  <option
                    key={sportsman.sportsmenId}
                    value={sportsman.sportsmenId}>
                    {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName}`}
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


//Interfaces\\





export default Sportsmens;