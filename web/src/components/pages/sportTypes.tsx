// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, SportType, CreateTypeDto, DeleteTypeDto, ColumnConfig } from '../apiClient';

const SporTypes = () => {
  //apiClient\\
  const apiClient = new ApiClient();


  enum Measures {
    METER = 'METER',
    SECOND = 'SECOND',
    KILOGRAM = 'KILOGRAM',
    POINTS = 'POINTS',
    MINUTES = 'MINUTES',
    HOURS = 'HOURS'
  }
  type Measure = keyof typeof Measures;

  //UseState\\
  const [type, setType] = useState<SportType[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    id: '',
    typeName: '',
    measure: '' as Measure | '',
    thirdSportCategory: '',
    secondSportCategory: '',
    firstSportCategory: '',
    kms: '',
    ms: ''
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: '',
    typeName: '',
    measure: '' as Measure | '',
    thirdSportCategory: '',
    secondSportCategory: '',
    firstSportCategory: '',
    kms: '',
    ms: ''
  });
  const [formDataDelete, setFormDataDelete] = useState({ id: '' });



  //Configs\\
  const columns: ColumnConfig<SportType>[] = [
    { key: 'typeId', title: 'ID', sortable: true, width: '5%' },
    { key: 'typeName', title: 'Название вида', sortable: true, width: '15%' },
    { key: 'measure', title: 'Мера измерения', sortable: true, width: '15%' },
    { key: 'thirdSportCategory', title: '3-й разряд', sortable: true, width: '15%' },
    { key: 'secondSportCategory', title: '2-й разряд', sortable: true, width: '15%' },
    { key: 'firstSportCategory', title: '1-й разряд', sortable: true, width: '15%' },
    { key: 'kms', title: 'Кандидат в МС', sortable: true, width: '15%' },
    { key: 'ms', title: 'Мастер спорта', sortable: true, width: '15%' }
  ];



  //DTO\\
  const createTypeDto = (data: typeof formData): CreateTypeDto => {
    return {
      typeName: String(data.typeName),
      measure: String(data.measure),
      thirdSportCategory: String(data.thirdSportCategory),
      secondSportCategory: String(data.thirdSportCategory),
      firstSportCategory: String(data.thirdSportCategory),
      kms: String(data.kms),
      ms: String(data.ms)
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
    if (!formData.typeName || !formData.measure) {
      alert("Пожалуйста, заполните обязательные поля (Вид и мера)");
      return;
    }

    const dataToSend: CreateTypeDto = createTypeDto(formData)
    apiClient.createType(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Вид успешно создан! ID: ${response.data?.typeId}`);
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
    apiClient.getAllTypies().then(response => {
      if (response.success) {
        const data = response.data as SportType[];
        setType(data)
      }
      else {
        alert("Error")
      }
    })
  }




  // Обновление спортсмена \\
  const handleUpdate = () => {
    if (!formDataUpdate.id) {
      alert("Введите ID вида")
      return
    }
    const updateData: any = { typeId: parseInt(formDataUpdate.id) };
    let hasChanges = false;

    if (formDataUpdate.typeName !== '') {
      updateData.typeName = formDataUpdate.typeName;
      hasChanges = true;
    }

    if (formDataUpdate.measure !== '') {
      updateData.measure = formDataUpdate.measure;
      hasChanges = true;
    }

    if (formDataUpdate.thirdSportCategory !== '') {
      updateData.thirdSportCategory = formDataUpdate.thirdSportCategory;
      hasChanges = true;
    }

    if (formDataUpdate.secondSportCategory !== '') {
      updateData.secondSportCategory = formDataUpdate.secondSportCategory;
      hasChanges = true;
    }

    if (formDataUpdate.firstSportCategory !== '') {
      updateData.firstSportCategory = formDataUpdate.firstSportCategory;
      hasChanges = true;
    }

    if (formDataUpdate.kms !== '') {
      updateData.kms = formDataUpdate.kms;
      hasChanges = true;
    }

    if (formDataUpdate.ms !== '') {
      updateData.ms = formDataUpdate.ms;
      hasChanges = true;
    }

    // Проверка наличия хотя бы одного изменения
    if (!hasChanges) {
      alert("Введите хотя бы одно поле для обновления");
      return;
    }
    apiClient.updateType(updateData)
      .then(response => {
        if (response.success) {
          alert("Данные вида успешно обновлены");
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
    const sentData: DeleteTypeDto = { typeId: parseInt(formDataDelete.id) };
    apiClient.deleteType(sentData)
      .then(response => {
        if (response.success) {
          alert("Вид успешно удален");
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
      typeName: '',
      measure: '',
      thirdSportCategory: '',
      secondSportCategory: '',
      firstSportCategory: '',
      kms: '',
      ms: ''
    });
  };
  const clearUpdateForm = () => {
    setFormDataUpdate({
      id: '',
      typeName: '',
      measure: '',
      thirdSportCategory: '',
      secondSportCategory: '',
      firstSportCategory: '',
      kms: '',
      ms: ''
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
        <h1>Виды спорта</h1>
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
            <h2>Создать новый вид</h2>
            <div className="form-group">
              <label>Название вида*</label>
              <input
                type="text"
                name="typeName"
                value={formData.typeName}
                onChange={handleInputChange}
                placeholder="Введите название вида"
              />
            </div>
            <div className="form-group">
              <label>Мера изменения*</label>
              <select
                className="region-select"
                name="measure"
                value={formData.measure}
                onChange={handleInputChange}>
                <option value="">Выберите меру измерения</option>
                {Object.keys(Measures).map(measure => (
                  <option key={measure} value={measure}>
                    {Measures[measure as Measures]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>3-й разряд*</label>
              <input
                type="text"
                name="thirdSportCategory"
                value={formData.thirdSportCategory}
                onChange={handleInputChange}
                placeholder="Введите 3-й разряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>2-й разряд*</label>
              <input
                type="text"
                name="secondSportCategory"
                value={formData.secondSportCategory}
                onChange={handleInputChange}
                placeholder="Введите 2-й разряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>1-й разряд*</label>
              <input
                type="text"
                name="firstSportCategory"
                value={formData.firstSportCategory}
                onChange={handleInputChange}
                placeholder="Введите 1-й раязряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>КМС*</label>
              <input
                type="text"
                name="kms"
                value={formData.kms}
                onChange={handleInputChange}
                placeholder="Введите КМС (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>МС*</label>
              <input
                type="text"
                name="ms"
                value={formData.ms}
                onChange={handleInputChange}
                placeholder="Введите МС (опцианально)"
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
              <h2>Просмотр видов</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список видов"
                data={type}
                columns={columns}
                defaultSort={{ key: 'typeName', direction: 'asc' }} />
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
              }}>Обновить данные вида</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>можно заполнить только одну строчку*</label>
            </div>
            <div className="form-group">
              <label>ID вида*</label>
              <select
                className="region-select"
                name="id"
                value={formDataUpdate.id}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите ID вида</option>
                {type.map(type => (
                  <option
                    key={type.typeId}
                    value={type.typeId}>
                    {`${type.typeId} ${type.typeName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Название вида*</label>
              <input
                type="text"
                name="typeName"
                value={formDataUpdate.typeName}
                onChange={handleInputUpdateChange}
                placeholder="Введите название вида"
              />
            </div>
            <div className="form-group">
              <label>Мера изменения*</label>
              <select
                className="region-select"
                name="measure"
                value={formDataUpdate.measure}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите меру измерения</option>
                {Object.keys(Measures).map(measure => (
                  <option key={measure} value={measure}>
                    {Measures[measure as Measures]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>3-й разряд*</label>
              <input
                type="text"
                name="thirdSportCategory"
                value={formDataUpdate.thirdSportCategory}
                onChange={handleInputUpdateChange}
                placeholder="Введите 3-й разряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>2-й разряд*</label>
              <input
                type="text"
                name="secondSportCategory"
                value={formDataUpdate.secondSportCategory}
                onChange={handleInputUpdateChange}
                placeholder="Введите 2-й разряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>1-й разряд*</label>
              <input
                type="text"
                name="firstSportCategory"
                value={formDataUpdate.firstSportCategory}
                onChange={handleInputUpdateChange}
                placeholder="Введите 1-й раязряд (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>КМС*</label>
              <input
                type="text"
                name="kms"
                value={formDataUpdate.kms}
                onChange={handleInputUpdateChange}
                placeholder="Введите КМС (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>МС*</label>
              <input
                type="text"
                name="ms"
                value={formDataUpdate.ms}
                onChange={handleInputUpdateChange}
                placeholder="Введите МС (опцианально)"
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
            <h2>Удалить вид</h2>
            <div className="form-group">
              <label>ID вида*</label>
              <select
                className="region-select"
                name="id"
                value={formDataDelete.id}
                onChange={handleInputDeleteChange}>
                <option value="">Выберите ID вида</option>
                {type.map(type => (
                  <option
                    key={type.typeId}
                    value={type.typeId}>
                    {`${type.typeId} ${type.typeName}`}
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




export default SporTypes;