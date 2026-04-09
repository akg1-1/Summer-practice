
// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, ColumnConfig, CompetitionTypeDto, Competition, SportType } from '../apiClient';

const CompetitionType = () => {
  //apiClient\\
  const apiClient = new ApiClient();



  //UseState\\
  const [competitionType, setCompetitionType] = useState<CompetitionTypeDto[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    competitionId: '',
    sportTypeId: ''
  });

  const [formDataDelete, setFormDataDelete] = useState({
    competitionId: '',
    sportTypeId: ''
  });



  //Configs\\
  const columns: ColumnConfig<CompetitionTypeDto>[] = [
    { key: 'competitionId', title: 'ID соревнования', sortable: true, width: '5%' },
    { key: 'sportTypeId', title: 'ID города', sortable: true, width: '15%' },

  ];


  // Обработчики изменения полей формы\\
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Создание нового спортсмена\\
  const handleCreate = () => {
    if (!formData.competitionId || !formData.sportTypeId) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const dataToSend: CompetitionTypeDto = {
      competitionId: parseInt(formData.competitionId),
      sportTypeId: parseInt(formData.sportTypeId)
    }
    apiClient.createCompetitionType(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Вид на соревновании успешно создан!`);
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
    apiClient.getAllCompetitionTypies().then(response => {
      if (response.success) {
        const data = response.data as CompetitionTypeDto[];
        setCompetitionType(data)
      }
      else {
        alert("Error")
      }
    })
  }


  // Удаление спортсмена \\
  const handleDelete = () => {
    if (!formDataDelete.competitionId || !formDataDelete.sportTypeId) {
      alert("Введите ID")
      return
    }
    const dataToSend: CompetitionTypeDto = {
      competitionId: parseInt(formDataDelete.competitionId),
      sportTypeId: parseInt(formDataDelete.sportTypeId)
    }
    apiClient.deleteCompetitionType(dataToSend)
      .then(response => {
        if (response.success) {
          alert("Вид на соревновании успешно удален");
        } else {
          alert(`Ошибка при удалении: ${response.error}`);
        }
      })
      .catch(error => {
        console.error("Ошибка сети:", error);
        alert("Сетевая ошибка при выполнении запроса");
      });
  }



  //Список спортсменов\\
  const [competitionList, setCompetitionList] = useState<Competition[]>([]);
  const handleGetCompetition = () => {
    apiClient.getAllCompetitions().then(response => {
      if (response.success) {
        const data = response.data as Competition[];
        setCompetitionList(data)
      }
      else {
        alert("Error")
      }
    })
  }


  //Список видов\\
  const [typeList, setTypeList] = useState<SportType[]>([]);
  const handleGetType = () => {
    apiClient.getAllTypies().then(response => {
      if (response.success) {
        const data = response.data as SportType[];
        setTypeList(data)
      }
      else {
        alert("Error")
      }
    })
  }



  // Очистка формы \\
  const clearForm = () => {
    setFormData({
      competitionId: '',
      sportTypeId: ''
    });
  };

  const clearDeleteForm = () => {
    setFormDataDelete({
      competitionId: '',
      sportTypeId: ''
    });
  };






  //JSX\\
  return (

    // { Menu } \\

    <div className="app">
      <header className="app-header">
        <h1>Виды спорта на соревновании</h1>
        <nav className="navigation">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              handleGetCompetition()
              handleGetType()
              setActiveTab('create')
            }
            }
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
            className={`nav-btn ${activeTab === 'delete' ? 'active' : ''}`}
            onClick={() => {

              handleGet()
              handleGetCompetition()
              handleGetType()
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
            <h2>Создать новый вид для соревнования</h2>
            <div className="form-group">
              <label>ID соревнования*</label>
              <select
                className="region-select"
                name="competitionId"
                value={formData.competitionId}
                onFocus={handleGetCompetition}
                onChange={handleInputChange}>
                <option value="">Выберите ID</option>
                {competitionList.map(comp => (
                  <option
                    key={comp.competitionId}
                    value={comp.competitionId}>
                    {`${comp.competitionId} ${comp.competitionName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ID вида*</label>
              <select
                className="region-select"
                name="sportTypeId"
                value={formData.sportTypeId}
                onFocus={handleGetType}
                onChange={handleInputChange}>
                <option value="">Выберите ID вида</option>
                {typeList.map(type => (
                  <option
                    key={type.typeId}
                    value={type.typeId}>
                    {`${type.typeId} ${type.typeName}`}
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
              <h2>Просмотр видов на соревновании</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список видов на соревновании"
                data={competitionType}
                columns={columns}
                defaultSort={{ key: 'competitionId', direction: 'asc' }} />
            </div>
          </div>
        )}

        {/* Delete */}

        {activeTab === 'delete' && (
          <div className="form-container">
              <h2>Удалить вид на соревновании</h2>
              <div className="form-group">
                <label>Связка (Соревнование - Вид)*</label>
                <select
                  className="region-select"
                  name="competitionTypePair"
                  value={`${formDataDelete.competitionId}_${formDataDelete.sportTypeId}`}
                  onChange={(e) => {
                    const [competitionId, sportTypeId] = e.target.value.split('_');
                    setFormDataDelete(prev => ({
                      ...prev,
                      competitionId: competitionId || '',
                      sportTypeId: sportTypeId || ''
                    }));
                  }}
                >
                  <option value="_">Выберите связку</option>
                  {competitionType.map(ct => {
                    const competition = competitionList.find(c => c.competitionId === ct.competitionId);
                    const sportType = typeList.find(t => t.typeId === ct.sportTypeId);

                    if (!competition || !sportType) return null;

                    return (
                      <option
                        key={`${ct.competitionId}_${ct.sportTypeId}`}
                        value={`${ct.competitionId}_${ct.sportTypeId}`}
                      >
                        {`${competition.competitionId} ${competition.competitionName} - ${sportType.typeId} ${sportType.typeName}`}
                      </option>
                    );
                  })}
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













  

  

export default CompetitionType;