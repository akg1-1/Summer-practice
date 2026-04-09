// src/App.js
import React, { useState, ChangeEvent } from 'react';
import './pagesStyled.css';
import { Report } from './report';

import { ApiClient, ColumnConfig, SportRank, CreateRankDto, DeleteRankDto, Sportsmen, SportType } from '../apiClient';

const SporRanks = () => {
  //apiClient\\
  const apiClient = new ApiClient();

  enum RankValues {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
    THIRD = 'THIRD',
    KMS = 'KMS',
    MS = 'MS'
  }
  type RankValue = keyof typeof RankValues;

  //UseState\\
  const [rank, setRank] = useState<SportRank[]>([]);
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    sportsmenId: '',
    typeId: '',
    rank: '' as RankValue | '',
    rankDate: ''
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    sportsmenId: '',
    typeId: '',
    rank: '' as RankValue | '',
    rankDate: ''
  });
  const [formDataDelete, setFormDataDelete] = useState({
    sportsmenId: '',
    typeId: ''
  });



  //Configs\\
  const columns: ColumnConfig<SportRank>[] = [
    { key: 'sportsmenId', title: 'ID спортсмена', sortable: true, width: '5%' },
    { key: 'sportTypeId', title: 'ID вида', sortable: true, width: '15%' },
    { key: 'sportsmenRank', title: 'Разряд', sortable: true, width: '15%' },
    { key: 'rankDate', title: 'Дата присвоения', sortable: true, width: '15%' },
  ];



  //DTO\\
  const createRankDto = (data: typeof formData): CreateRankDto => {
    return {
      sportsmenId: Number(data.sportsmenId), // Простое преобразование
      typeId: Number(data.typeId),
      rank: data.rank?.trim() || null, // Проверка на пустую строку
      rankDate: data.rankDate
        ? new Date(data.rankDate).toISOString().split('T')[0]
        : null
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


  // Создание нового спортсмена\\
  const handleCreate = () => {
    if (!formData.sportsmenId || !formData.typeId) {
      alert("Пожалуйста, заполните обязательные поля (Спортсмен и вид)");
      return;
    }
    const dataToSend = createRankDto(formData)
    apiClient.createRank(dataToSend).then(response => {
      if (response.success) {
        clearForm();
        alert(`Разряд успешно создан!`);
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
    apiClient.getAllRanks().then(response => {
      if (response.success) {
        const data = response.data as SportRank[];
        data.forEach(el => {
          if (el.rankDate !== null) {
            el.rankDate = new Date(el.rankDate).toISOString().split('T')[0]
          }
        })
        setRank(data)
      }
      else {
        alert("Error")
      }
    })
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




  // Обновление спортсмена \\
  const handleUpdate = () => {
    if (!formDataUpdate.sportsmenId || !formDataUpdate.typeId) {
      alert("Введите ID вида")
      return
    }
    if (!formDataUpdate.rank || !formDataUpdate.rankDate) {
      alert("Введите хотя поля для обновления");
      return;
    }
    const updateData: any = {
      sportsmenId: formDataUpdate.sportsmenId,
      typeId: formDataUpdate.typeId,
      rank: formDataUpdate.rank,
      rankDate: formDataUpdate.rankDate
    };
    apiClient.updateRank(updateData)
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
    if (!formDataDelete.sportsmenId || !formDataDelete.typeId) {
      alert("Введите ID")
      return
    }
    const sentData: DeleteRankDto = {
      sportsmenId: parseInt(formDataDelete.sportsmenId),
      typeId: parseInt(formDataDelete.typeId)
    };

    apiClient.deleteRank(sentData)
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
      sportsmenId: '',
      typeId: '',
      rank: '',
      rankDate: ''
    });
  };
  const clearUpdateForm = () => {
    setFormDataUpdate({
      sportsmenId: '',
      typeId: '',
      rank: '',
      rankDate: ''
    });
  };
  const clearDeleteForm = () => {
    setFormDataDelete({
      sportsmenId: '',
      typeId: '',
    });
  };



  //JSX\\
  return (

    //Menu\\
    <div className="app">
      <header className="app-header">
        <h1>Разряды спортсмена</h1>
        <nav className="navigation">
          <button
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('create')
            }}
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
              handleGetSportsmen()
              handleGetType()
              setActiveTab('update')
            }}
          >
            Обновить
          </button>
          <button
            className={`nav-btn ${activeTab === 'delete' ? 'active' : ''}`}
            onClick={() => {
              handleGet()
              handleGetSportsmen()
              handleGetType()
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
            <h2>Создать новый разряд</h2>
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
              <label>ID вида*</label>
              <select
                className="region-select"
                name="typeId"
                value={formData.typeId}
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
              <label>Разряд*</label>
              <select
                className="region-select"
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}>
                <option value="">Выберите разряд (опцианально)</option>
                {Object.keys(RankValues).map(rank => (
                  <option key={rank} value={rank}>
                    {RankValues[rank as RankValues]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Дата присвоения*</label>
              <input
                type="date"
                name="rankDate"
                value={formData.rankDate}
                onChange={handleInputChange}
                placeholder="Введите дату (опцианально)"
              />
            </div>
            <div className="form-actions">
              <button className="action-btn create" onClick={handleCreate}>
                Создать
              </button>
              <button className="action-btn clear" onClick={() => {
                clearForm()
              }}>
                Очистить
              </button>
            </div>
          </div>
        )}


        {/* Read */}

        {activeTab === 'read' && (
          <div className="read-container">
            <div className="read-header">
              <h2>Просмотр разрядов</h2>
              <button
                className="refresh-btn"
                onClick={handleGet}
              >
                Обновить данные
              </button>
            </div>
            <div className="table-container">
              <Report
                title="Список разрядов"
                data={rank}
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
                margin: '10px'
              }}>
              <h2
                style={{
                  margin: '0px'
                }}>Обновить данные о разряде</h2>
              <label
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.85rem',
                  display: 'block',
                  marginTop: '2px'
                }}>заполните все строчки*</label>
            </div>
            <div className="form-group">
              <label>Спортсмен и вид*</label>
              <select
                className="region-select"
                name="combinedId"
                value={`${formDataUpdate.sportsmenId}_${formDataUpdate.typeId}`}
                onChange={(e) => {
                  const [sportsmenId, typeId] = e.target.value.split('_');
                  setFormDataUpdate(prev => ({
                    ...prev,
                    sportsmenId: sportsmenId || '',
                    typeId: typeId || ''
                  }));
                }}
              >
                <option value="_">Выберите связку (Спортсмен - Вид)</option>
                {Array.from(
                  new Map(
                    rank.map(rank => [`${rank.sportsmenId}_${rank.sportTypeId}`, rank])
                  ).values()
                ).map(rank => {
                  const sportsman = sportsmensList.find(s => s.sportsmenId === rank.sportsmenId);
                  const type = typeList.find(t => t.typeId === rank.sportTypeId);

                  if (!sportsman || !type) return null;

                  return (
                    <option
                      key={`${rank.sportsmenId}_${rank.sportTypeId}`}
                      value={`${rank.sportsmenId}_${rank.sportTypeId}`}
                    >
                      {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName} - ${type.typeId} ${type.typeName}`}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Разряд*</label>
              <select
                className="region-select"
                name="rank"
                value={formDataUpdate.rank}
                onChange={handleInputUpdateChange}>
                <option value="">Выберите разряд</option>
                {Object.keys(RankValues).map(rank => (
                  <option key={rank} value={rank}>
                    {RankValues[rank as RankValues]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Дата присвоения*</label>
              <input
                type="date"
                name="rankDate"
                value={formDataUpdate.rankDate}
                onChange={handleInputUpdateChange}
                placeholder="Введите дату"
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
            <h2>Удалить разряд</h2>
            <div className="form-group">
              <label>Спортсмен и вид*</label>
              <select
                className="region-select"
                name="combinedId"
                value={`${formDataDelete.sportsmenId}_${formDataDelete.typeId}`}
                onChange={(e) => {
                  const [sportsmenId, typeId] = e.target.value.split('_');
                  setFormDataDelete(prev => ({
                    ...prev,
                    sportsmenId: sportsmenId || '',
                    typeId: typeId || ''
                  }));
                }}
              >
                <option value="_">Выберите связку (Спортсмен - Вид)</option>
                {Array.from(
                  new Map(
                    rank.map(rank => [`${rank.sportsmenId}_${rank.sportTypeId}`, rank])
                  ).values()
                ).map(rank => {
                  const sportsman = sportsmensList.find(s => s.sportsmenId === rank.sportsmenId);
                  const type = typeList.find(t => t.typeId === rank.sportTypeId);

                  if (!sportsman || !type) return null;

                  return (
                    <option
                      key={`${rank.sportsmenId}_${rank.sportTypeId}`}
                      value={`${rank.sportsmenId}_${rank.sportTypeId}`}
                    >
                      {`${sportsman.sportsmenId} ${sportsman.lastName} ${sportsman.firstName} - ${type.typeId} ${type.typeName}`}
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




export default SporRanks;