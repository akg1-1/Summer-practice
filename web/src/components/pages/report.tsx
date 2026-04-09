import React, { useState } from 'react';
import styled from 'styled-components';

// Типы данных для компонента
type ColumnConfig<T> = {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: string;
};

type SortConfig<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
};

type ReportProps<T> = {
  title: string;
  data: T[];
  columns: ColumnConfig<T>[];
  defaultSort?: SortConfig<T>;
};

// Стилизованный компонент отчета
const ReportContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 25px 0;
  overflow: hidden;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e3f2fd;
`;

const ReportTitle = styled.h2`
  color: #1976d2;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.thead`
  background: linear-gradient(to bottom, #1976d2, #1565c0);
  color: white;
`;

const TableHeaderCell = styled.th<{ sortable?: boolean; width?: string }>`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  cursor: ${props => (props.sortable ? 'pointer' : 'default')};
  position: relative;
  width: ${props => props.width || 'auto'};
  
  &:hover {
    background-color: ${props => (props.sortable ? '#0d47a1' : 'transparent')};
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    opacity: 0.7;
  }
  
  &.asc::after {
    border-bottom: 5px solid white;
  }
  
  &.desc::after {
    border-top: 5px solid white;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f9ff;
  }
  
  &:hover {
    background-color: #e3f2fd;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

const SortIndicator = styled.span`
  margin-left: 5px;
  font-size: 0.8em;
`;

const EmptyMessage = styled.div`
  padding: 30px;
  text-align: center;
  color: #666;
  font-style: italic;
`;

// Компонент отчета
export const Report = <T extends Record<string, any>>({
  title,
  data,
  columns,
  defaultSort
}: ReportProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    defaultSort || null
  );

  // Функция сортировки данных
  const sortedData = [...data];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Обработчик сортировки
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortConfig({ key, direction });
  };

  return (
    <ReportContainer>
      <ReportHeader>
        <ReportTitle>{title}</ReportTitle>
      </ReportHeader>

      <Table>
        <TableHeader>
          <tr>
            {columns.map(column => (
              <TableHeaderCell
                key={column.key.toString()}
                sortable={column.sortable}
                width={column.width}
                className={
                  sortConfig?.key === column.key
                    ? sortConfig.direction
                    : ''
                }
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.title}
                {column.sortable && sortConfig?.key === column.key && (
                  <SortIndicator>
                    {sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </SortIndicator>
                )}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>

        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell key={column.key.toString()}>
                    {item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <EmptyMessage>Нет данных для отображения</EmptyMessage>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ReportContainer>
  );
};
