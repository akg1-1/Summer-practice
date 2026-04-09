import { useState, ChangeEvent } from "react";
import { Report } from "./report";
import './pagesStyled.css';
import { ApiClient, CompetitionReportDto, ColumnConfig } from "../apiClient";

const CompetitionReport = () => {

    const apiClient = new ApiClient()
    const [year, setYear] = useState('')
    const [report, setReport] = useState<CompetitionReportDto[]>([])
    const columns: ColumnConfig<CompetitionReportDto>[] = [
        { key: 'reportId', title: 'ID отчета', sortable: true, width: '5%' },
        { key: 'sportTypeId', title: 'ID вида', sortable: true, width: '5%' },
        { key: 'sportTypeName', title: 'Название вида', sortable: true, width: '15%' },
        { key: 'competitionCount', title: 'Кол-во соревнований', sortable: true, width: '15%' },
        { key: 'participantCount', title: 'Кол-во участников', sortable: true, width: '15%' },
        { key: 'ageGroup', title: 'Возрастная группа', sortable: true, width: '15%' },
        { key: 'reportYear', title: 'Год отчета', sortable: true, width: '15%' }
    ];


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value);
    };


    const handleGet = () => {
        const yearNum = parseInt(year)
        if (isNaN(yearNum)) {
            alert("Введите год отчета")
            return
        }
        apiClient.getAllReports(yearNum).then(response => {
            if (response.success) {
                const data = response.data as CompetitionReportDto[];
                setReport(data)
            }
            else {
                alert("Данных нет или иная ошибка")
            }
        })
    }


    return (
        <div className="read-container">
            <div className="read-header">
                <h2>Просмотр отчетов</h2>
                <button
                    className="refresh-btn"
                    onClick={handleGet}
                >
                    Обновить данные
                </button>
            </div>
            <div
            className="form-container">
                <div className="form-group">
                    <label>Год:</label>
                    <input
                        id="year-input"
                        type="number"
                        value={year}
                        onChange={handleInputChange}
                        placeholder="Введите год"
                        min="1900"
                        max="2100"
                    />
                </div>
            </div>
            <div className="table-container">
                <Report
                    title="Отчеты"
                    data={report}
                    columns={columns}
                    defaultSort={{ key: 'reportYear', direction: 'asc' }} />
            </div>
        </div>
    )
}

export default CompetitionReport