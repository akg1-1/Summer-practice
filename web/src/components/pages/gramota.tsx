import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import './pagesStyled.css';
import { ApiClient, SportsmenCompetitionDto, Sportsmen, Competition, SportType, DiplomaData, DiplomaDto } from '../apiClient';
import jsPDF from 'jspdf';
import './Diploma.css'
const DiplomaGenerator = () => {
    const apiClient = new ApiClient();

    // Состояния
    const [diplomaData, setDiplomaData] = useState<DiplomaData | null>(null);
    const [spCompList, setSpCompList] = useState<SportsmenCompetitionDto[]>([]);
    const [sportsmenList, setSportsmenList] = useState<Sportsmen[]>([]);
    const [competitionList, setCompetitionList] = useState<Competition[]>([]);
    const [sportTypeList, setSportTypeList] = useState<SportType[]>([]);
    const [selectedDiploma, setSelectedDiploma] = useState<DiplomaDto>({
        sportsmenId: '',
        competitionId: '',
        sportTypeId: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const diplomaRef = useRef<HTMLDivElement>(null);

    // Загрузка данных при монтировании
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Загрузка связок спортсмен-соревнование-вид
                const spCompResponse = await apiClient.getAllSportsmenCompetitions();
                if (spCompResponse.success && spCompResponse.data) {
                    setSpCompList(spCompResponse.data);
                }

                // Загрузка спортсменов
                const sportsmenResponse = await apiClient.getAllSportsmens();
                if (sportsmenResponse.success && sportsmenResponse.data) {
                    setSportsmenList(sportsmenResponse.data);
                }

                // Загрузка соревнований
                const competitionResponse = await apiClient.getAllCompetitions();
                if (competitionResponse.success && competitionResponse.data) {
                    setCompetitionList(competitionResponse.data);
                }

                // Загрузка видов спорта
                const sportTypeResponse = await apiClient.getAllTypies();
                if (sportTypeResponse.success && sportTypeResponse.data) {
                    setSportTypeList(sportTypeResponse.data);
                }
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                alert("Произошла ошибка при загрузке данных");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Автоматическая загрузка данных диплома при изменении связки
    useEffect(() => {
        const fetchDiploma = async () => {
            if (selectedDiploma.sportsmenId &&
                selectedDiploma.competitionId &&
                selectedDiploma.sportTypeId) {

                try {
                    setIsLoading(true);
                    const response = await apiClient.getDiploma(selectedDiploma);

                    if (response.success && response.data) {
                        setDiplomaData(response.data);
                    } else {
                        alert(`Ошибка: ${response.error || "Неизвестная ошибка"}`);
                        setDiplomaData(null);
                    }
                } catch (error) {
                    alert("Сетевая ошибка");
                    console.error("Ошибка:", error);
                    setDiplomaData(null);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchDiploma();
    }, [selectedDiploma]); // Зависимость от selectedDiploma

    // Обработчик выбора связки
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "") {
            setSelectedDiploma({
                sportsmenId: '',
                competitionId: '',
                sportTypeId: ''
            });
            setDiplomaData(null);
        } else {
            const [sportsmenId, competitionId, sportTypeId] = value.split('_');
            setSelectedDiploma({
                sportsmenId,
                competitionId,
                sportTypeId
            });
        }
    };

    // Генерация PDF
    const generatePDF = () => {
        if (!diplomaRef.current || !diplomaData) return;

        const pdf = new jsPDF('p', 'mm', 'a4');

        // Основные цвета
        const primaryColor = '#1a73e8';
        const secondaryColor = '#4285f4';
        const textColor = '#202124';
        const lightBlue = '#e8f0fe';

        // Установка шрифтов
        pdf.addFont('fonts/Roboto-Regular.ttf', 'Roboto', 'normal');
        pdf.addFont('fonts/Roboto-Bold.ttf', 'Roboto', 'bold');
        pdf.setFont('Roboto', 'normal');

        // Фон документа
        pdf.setFillColor(lightBlue);
        pdf.rect(0, 0, 210, 297, 'F');

        // Шапка диплома
        const headerHeight = 75;
        pdf.setFillColor(primaryColor);
        pdf.rect(0, 0, 210, headerHeight, 'F');

        // Добавление локального изображения
        const img = new Image();
        img.src = '/gerb.png'; // Путь к локальному изображению

        const imgWidth = 50;
        const imgHeight = 50;
        const logoX = (210 - imgWidth) / 2; // Центрирование по горизонтали
        pdf.addImage(img, 'PNG', logoX, 7, imgWidth, imgHeight);

        // Заголовок
        pdf.setFontSize(24);
        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text('ДИПЛОМ', 105, 65, { align: 'center' });

        // Основное содержимое с улучшенными отступами
        let currentY = headerHeight + 15;

        // Декоративный элемент
        pdf.setDrawColor(secondaryColor);
        pdf.setLineWidth(1);
        pdf.line(20, currentY, 190, currentY);
        currentY += 15;

        // Информация о спортсмене с увеличенными отступами
        const lineHeight = 18;

        pdf.setFontSize(14);
        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text('СПОРТСМЕН:', 20, currentY);
        pdf.setFont('Roboto', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(diplomaData.fullName, 65, currentY);
        currentY += lineHeight;

        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text('СОРЕВНОВАНИЕ:', 20, currentY);
        pdf.setFont('Roboto', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(diplomaData.competitionName, 70, currentY);
        currentY += lineHeight;

        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text('ВИД СПОРТА:', 20, currentY);
        pdf.setFont('Roboto', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(diplomaData.sportType, 65, currentY);
        currentY += 25;

        // Блок с результатом
        const resultBoxHeight = 50;
        pdf.setFillColor(secondaryColor);
        pdf.rect(50, currentY, 110, resultBoxHeight, 'F');

        pdf.setFontSize(18);
        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text('ЗАНЯТОЕ МЕСТО', 105, currentY + 20, { align: 'center' });

        pdf.setFontSize(36);
        pdf.text(diplomaData.place?.toString() || '—', 105, currentY + 40, { align: 'center' });
        currentY += resultBoxHeight + 20;

        // Дополнительная информация
        pdf.setFontSize(12);
        pdf.setFont('Roboto', 'bold');
        pdf.setTextColor(primaryColor);
        pdf.text('Результат:', 20, currentY);
        pdf.setFont('Roboto', 'normal');
        pdf.setTextColor(textColor);
        pdf.text(diplomaData.result?.toString() || 'не указан',65, currentY);
        currentY += 25;

        pdf.text(`Дата: ${convertDate(diplomaData.date)}`, 20, currentY + 10);
        currentY += 30;

        // Подпись
        const signatureY = 250;
        pdf.setFontSize(12);
        pdf.text('Председатель оргкомитета:', 140, signatureY);
        pdf.setDrawColor(textColor);
        pdf.setLineWidth(0.5);
        pdf.line(140, signatureY + 20, 190, signatureY + 20);
        // Декоративный элемент внизу
        pdf.setDrawColor(secondaryColor);
        pdf.setLineWidth(1);
        pdf.line(20, 280, 190, 280);

        // Сохранение PDF
        pdf.save(`диплом_${diplomaData.fullName.replace(/\s+/g, '_')}.pdf`);
    };

    // Функция для форматирования даты (добавьте в компонент)
    const convertDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    // Форматирование даты
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Дипломы спортсменов</h1>
            </header>

            <main className="content">
                <div className="form-container">
                    <h2>Получение данных диплома</h2>

                    <div className="form-group">
                        <label>Связка (Спортсмен - Соревнование - Вид)*</label>
                        <select
                            className="region-select"
                            value={
                                selectedDiploma.sportsmenId && selectedDiploma.competitionId && selectedDiploma.sportTypeId
                                    ? `${selectedDiploma.sportsmenId}_${selectedDiploma.competitionId}_${selectedDiploma.sportTypeId}`
                                    : ""
                            }
                            onChange={handleSelectChange}
                            disabled={isLoading}
                        >
                            <option value="">Выберите связку</option>
                            {spCompList.map((sc) => {
                                const sportsman = sportsmenList.find(s => s.sportsmenId === sc.sportsmenId);
                                const competition = competitionList.find(c => c.competitionId === sc.competitionId);
                                const sportType = sportTypeList.find(t => t.typeId === sc.sportTypeId);

                                if (!sportsman || !competition || !sportType) return null;

                                return (
                                    <option
                                        key={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                                        value={`${sc.sportsmenId}_${sc.competitionId}_${sc.sportTypeId}`}
                                    >
                                        {`${sportsman.lastName} ${sportsman.firstName} - ${competition.competitionName} - ${sportType.typeName}`}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {isLoading && (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                            <p>Загрузка данных...</p>
                        </div>
                    )}

                    {diplomaData && !isLoading && (
                        <div className="diploma-container">
                            <div className="diploma-card" ref={diplomaRef}>
                                <h2>Диплом</h2>
                                <div className="diploma-details">
                                    <p><strong>Спортсмен:</strong> {diplomaData.fullName}</p>
                                    <p><strong>Соревнование:</strong> {diplomaData.competitionName}</p>
                                    <p><strong>Вид спорта:</strong> {diplomaData.sportType}</p>
                                    <p><strong>Место:</strong> {diplomaData.place ?? 'не указано'}</p>
                                    <p><strong>Результат:</strong> {diplomaData.result ?? 'не указан'}</p>
                                    <p><strong>Дата:</strong> {formatDate(diplomaData.date)}</p>
                                </div>
                            </div>

                            <button
                                className="action-btn pdf"
                                onClick={generatePDF}
                                style={{ marginTop: '20px' }}
                            >
                                Скачать PDF
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DiplomaGenerator;