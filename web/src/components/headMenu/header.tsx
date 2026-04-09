import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>ПРИЛОЖЕНИЕ ДЛЯ РАБОТЫ С БАЗОЙ ДАННЫХ</HeaderTitle>
      <HeaderSubtitle>Управление спортивными данными</HeaderSubtitle>
    </HeaderContainer>
  );
};

// Стилизованные компоненты
const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  color: white;
  padding: 25px 30px;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 20%);
    pointer-events: none;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default Header;