import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, SportsmenCompetitionDto, Sportsmen, SportType, Competition, ColumnConfig,CreateSportsmenCompetitionDto, DeleteSportsmenCompetitionDto } from '../apiClient';

const SportsmenCompetition = () => {
  //apiClient\\
  const apiClient = new ApiClient();



  //UseState\\
  const [spComp, setSpComp] = useState<SportsmenCompetitionDto[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    sportsmenId: '',
    competitionId: '',
    sportTypeId: '',
    place: '',
    result: '',
    ageGroup: ''
  });

  const [formDataUpdate, setFormDataUpdate] = useState({
    sportsmenId: '',
    competitionId: '',
    sportTypeId: '',
    place: '',
    result: '',
    ageGroup: ''
  });

  const [formDataDelete, setFormDataDelete] = useState({
    sportsmenId: '',
    competitionId: '',
    sportTypeId: '',
  });



  //Configs\\
  const columns: ColumnConfig<SportsmenCompetitionDto>[] = [
    { key: 'sportsmenId', title: 'ID спортсмена', sortable: true, width: '5%' },
    { key: 'competitionId', title: 'ID соревнования', sortable: true, width: '5%' },
    { key: 'sportTypeId', title: 'ID вида', sortable: true, width: '5%' },
    { key: 'place', title: 'Место', sortable: true, width: '5%' },
    { key: 'result', title: 'Результат', sortable: true, width: '5%' },
    { key: 'ageGroup', title: 'Возрастная группа', sortable: true, width: '5%' },

  ];


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




  // Создание нового спортсмена\\
  const handleCreate = () => {
    if (!formData.competitionId || !formData.sportTypeId || !formData.sportsmenId || !formData.ageGroup) {
      alert("Пожалуйста, заполните все поля");
      return;
    }


    const dataToSend: CreateSportsmenCompetitionDto = {
      sportsmenId: parseInt(formData.sportsmenId),
      competitionId: parseInt(formData.competitionId),
      sportTypeId: parseInt(formData.sportTypeId),
      place: formData.place ? Number(formData.place) : null,
      result: formData.result ? Number(formData.result) : null,
      ageGroup: formData.ageGroup
    }
    apiClient.createSportsmenCompetition(dataToSend).then(response => {
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
    apiClient.getAllSportsmenCompetitions().then(response => {
      if (response.success) {
        const data = response.data as SportsmenCompetitionDto[];
        setSpComp(data)
      }
      else {
        alert("Error")
      }
    })
  }



  const handleUpdate = () => {
    if (!formDataUpdate.sportsmenId || !formDataUpdate.competitionId || !formDataUpdate.sportTypeId) {
      alert("Введите ID")
      return
    }
    const updateData: any = {
      sportsmenId: parseInt(formDataUpdate.sportsmenId),
      sportTypeId: parseInt(formDataUpdate.sportTypeId),
      competitionId: parseInt(formDataUpdate.competitionId)
    };
    let hasChanges = false;
    if (formDataUpdate.place !== '') {
      updateData.place = formDataUpdate.place;
      hasChanges = true;
    }

    if (formDataUpdate.result !== '') {
      updateData.result = formDataUpdate.result;
      hasChanges = true;
    }

    if (formDataUpdate.ageGroup !== '') {
      updateData.ageGroup = formDataUpdate.ageGroup;
      hasChanges = true;
    }
    // Проверка наличия хотя бы одного изменения
    if (!hasChanges) {
      alert("Введите хотя бы одно поле для обновления");
      return;
    }
    apiClient.updateSportsmenCompetition(updateData)
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
    if (!formDataDelete.competitionId || !formDataDelete.sportTypeId || !formDataDelete.sportsmenId) {
      alert("Введите ID")
      return
    }
    const dataToSend: DeleteSportsmenCompetitionDto = {
      sportsmenId: parseInt(formDataDelete.sportsmenId),
      competitionId: parseInt(formDataDelete.competitionId),
      sportTypeId: parseInt(formDataDelete.sportTypeId)
    }
    apiClient.deleteSportsmenCompetition(dataToSend)
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
  const [sportsmensList, setSportsmensList] = useState<Sportsmen[]>([]);
  const handleGetSportsmen = () => {
    apiClient.getAllSportsmens().then(response => {
      if (response.success) {
        const data = response.data as Sportsmen[];
        setSportsmensList(data)
      }
      else {
        alert("Error")
      }
    })
  }


  //Список соревнований\\
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
      sportsmenId: '',
      competitionId: '',
      sportTypeId: '',
      place: '',
      result: '',
      ageGroup: ''
    });
  };

  const clearUpdateForm = () => {
    setFormData({
      sportsmenId: '',
      competitionId: '',
      sportTypeId: '',
      place: '',
      result: '',
      ageGroup: ''
    });
  };

  const clearDeleteForm = () => {
    setFormDataDelete({
      sportsmenId: '',
      competitionId: '',
      sportTypeId: '',
    });
  };






  //JSX\\
  return (

    // { Menu } \\

    <div className="app">
      <header className="app-header">
        <h1>Спортсмен на соревновании</h1>
        <nav className="navigation">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              handleGetCompetition()
              handleGetType()
              handleGetSportsmen()
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
            className={`nav-btn ${activeTab === 'update' ? 'active' : ''}`}
            onClick={() => {
              handleGet()
              handleGetCompetition()
              handleGetSportsmen()
              handleGetType()
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
              handleGetSportsmen()
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
            <h2>Создать спортсмена на соревнование</h2>
            <div className="form-group">
              <label>ID спортсмена*</label>
              <select
                className="region-select"
                name="sportsmenId"
                value={formData.sportsmenId}
                onFocus={handleGetSportsmen}
                onChange={handleInputChange}>
                <option value="">Выберите ID спортсмена</option>
                {sportsmensList.map(sportsman => (
                  <option
                    key={sportsman.sportsmenId}
                    value={sportsman.sportsmenId}>
                    {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>ID соревнования*</label>
              <select
                className="region-select"
                name="competitionId"
                value={formData.competitionId}
                onFocus={handleGetCompetition}
                onChange={handleInputChange}>
                <option value="">Выберите ID соревнования</option>
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
            <div className="form-group">
              <label>Место*</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                placeholder="Введите место (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>Результат*</label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleInputChange}
                placeholder="Введите результат (опцианально)"
              />
            </div>
            <div className="form-group">
              <label>Возрастная группа*</label>
              <input
                type="text"
                name="ageGroup"
                value={formData.ageGroup}
                onChange={handleInputChange}
                placeholder="Введите возрастную группу"
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
              <h2>Просмотр спортсменов на соревновании</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список спортсменов на соревновании"
                data={spComp}
                columns={columns}
                defaultSort={{ key: 'sportsmenId', direction: 'asc' }} />
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
                }}>Обновить данные спортсмена на соревновании</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>можно заполнить только одну строчку*</label>
            </div>
            <div className="form-group">
              <label>Связка (Спортсмен - Соревнование - Вид)*</label>
              <select
                className="region-select"
                name="combinedSportsmenCompType"
                value={`${formDataUpdate.sportsmenId}_${formDataUpdate.competitionId}_${formDataUpdate.sportTypeId}`}
                onChange={(e) => {
                  const [sportsmenId, competitionId, sportTypeId] = e.target.value.split('_');
                  setFormDataUpdate(prev => ({
                    ...prev,
                    sportsmenId: sportsmenId || '',
                    competitionId: competitionId || '',
                    sportTypeId: sportTypeId || ''
                  }));
                }}
              >
                <option value="__">Выберите связку (Спортсмен - Соревнование - Вид)</option>
                {spComp.map(sc => {
                  const sportsman = sportsmensList.find(s => s.sportsmenId === sc.sportsmenId);
                  const competition = competitionList.find(c => c.competitionId === sc.competitionId);
                  const sportType = typeList.find(t => t.typeId === sc.sportTypeId);

                  if (!sportsman || !competition || !sportType) return null;

                  return (
                    <option
                      key={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                      value={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                    >
                      {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName} - ${competition.competitionId} ${competition.competitionName} - ${sportType.typeId} ${sportType.typeName}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Место*</label>
              <input
                type="text"
                name="place"
                value={formDataUpdate.place}
                onChange={handleInputUpdateChange}
                placeholder="Введите место"
              />
            </div>
            <div className="form-group">
              <label>Результат*</label>
              <input
                type="text"
                name="result"
                value={formDataUpdate.result}
                onChange={handleInputUpdateChange}
                placeholder="Введите результат"
              />
            </div>
            <div className="form-group">
              <label>Возрастная группа*</label>
              <input
                type="text"
                name="ageGroup"
                value={formDataUpdate.ageGroup}
                onChange={handleInputUpdateChange}
                placeholder="Введите возрастную группу"
              />
            </div>
            <div className="form-actions">
              <button className="action-btn create" onClick={handleUpdate}>
                Создать
              </button>
              <button className="action-btn clear" onClick={clearForm}>
                Очистить
              </button>
            </div>
          </div>
        )}

        {/* Delete */}

        {activeTab === 'delete' && (
          <div className="form-container">
            <h2>Удалить спортсмнеа с соревнования</h2>
            <div className="form-group">
              <label>Связка (Спортсмен - Соревнование - Вид)*</label>
              <select
                className="region-select"
                name="combinedSportsmenCompType"
                value={`${formDataDelete.sportsmenId}_${formDataDelete.competitionId}_${formDataDelete.sportTypeId}`}
                onChange={(e) => {
                  const [sportsmenId, competitionId, sportTypeId] = e.target.value.split('_');
                  setFormDataDelete(prev => ({
                    ...prev,
                    sportsmenId: sportsmenId || '',
                    competitionId: competitionId || '',
                    sportTypeId: sportTypeId || ''
                  }));
                }}
              >
                <option value="__">Выберите связку (Спортсмен - Соревнование - Вид)</option>
                {spComp.map(sc => {
                  const sportsman = sportsmensList.find(s => s.sportsmenId === sc.sportsmenId);
                  const competition = competitionList.find(c => c.competitionId === sc.competitionId);
                  const sportType = typeList.find(t => t.typeId === sc.sportTypeId);

                  if (!sportsman || !competition || !sportType) return null;

                  return (
                    <option
                      key={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                      value={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                    >
                      {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName} - ${competition.competitionId} ${competition.competitionName} - ${sportType.typeId} ${sportType.typeName}`}
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



export default SportsmenCompetition;