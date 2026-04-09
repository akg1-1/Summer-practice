import { useState } from "react";
import Sportsmens from "../pages/sportsmens";
import SporTypes from "../pages/sportTypes";
import SportsmenRanks from "../pages/sportsmenRanks";
import Cities from "../pages/cities";
import Competitions from "../pages/competition";
import CompetitionTypes from "../pages/competitionTypes";
import SportsmenCompetition from "../pages/sportsmenCompetition";
import "./headmenu.css";
import CompetitionReport from "../pages/competitionReport";
import DiplomaGenerator from "../pages/gramota";



type SectionType =
  | 'sportsmens'
  | 'sportTypes'
  | 'sportsmenRanks'
  | 'cities'
  | 'competitions'
  | 'competitionTypes'
  | 'sportsmenCompetition'
  | 'report'
  | 'gramota';

const HeadMenu = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('sportsmens');

  return (
    <div className="menu-app-container">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 'sportsmens' && <Sportsmens />}
      {activeSection === 'sportTypes' && <SporTypes />}
      {activeSection === 'sportsmenRanks' && <SportsmenRanks />}
      {activeSection === 'cities' && <Cities />}
      {activeSection === 'competitions' && <Competitions />}
      {activeSection === 'competitionTypes' && <CompetitionTypes />}
      {activeSection === 'sportsmenCompetition' && <SportsmenCompetition />}
      {activeSection === 'report' && <CompetitionReport/>}
      {activeSection === 'gramota' && <DiplomaGenerator/>}
    </div>
  );
}

interface HeaderProps {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void;
}

function Header({ activeSection, setActiveSection }: HeaderProps) {
  const menuItems: { key: SectionType, title: string, icon: string }[] = [
    { key: 'sportsmens', title: 'Спортсмены', icon: '👤' },
    { key: 'sportTypes', title: 'Виды спорта', icon: '⚽' },
    { key: 'sportsmenRanks', title: 'Разряды', icon: '⭐' },
    { key: 'cities', title: 'Города', icon: '🏙️' },
    { key: 'competitions', title: 'Соревнования', icon: '🏆' },
    { key: 'competitionTypes', title: 'Типы соревнований', icon: '📋' },
    { key: 'sportsmenCompetition', title: 'Участие', icon: '🤝' },
    {key: 'report', title:'Отчет', icon:'📝'},
    {key: 'gramota', title:'Грамота', icon:'📜'}
  ];

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="app-title">Спортивная База Данных</h1>
      </div>

      <nav className="menu-navigation">
        {menuItems.map(item => (
          <button
            key={item.key}
            className={`menu-button ${activeSection === item.key ? 'active' : ''}`}
            onClick={() => setActiveSection(item.key)}
          >
            <span className="menu-icon">{item.icon}</span>
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
export default HeadMenu
