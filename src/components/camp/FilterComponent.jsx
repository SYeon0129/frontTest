import React from 'react';
import { FaCampground, FaTree } from "react-icons/fa";
import './FilterComponent.css';

const FilterComponent = ({ selectedNature, selectedInduty, onNatureChange, onIndutyChange }) => {
  const natureOptions = ['호수', '도심', '숲', '해변', '산', '계곡', '강'];
  const indutyOptions = ['일반야영장', '자동차야영장', '카라반', '글램핑'];

  return (
    <div className="filters">
      <div className="filter-group">
        <FaTree /><span>자연환경 :</span>
        {natureOptions.map(nature => (
          <button
            key={nature}
            onClick={() => onNatureChange(nature)}
            className={`filter-button ${selectedNature === nature ? 'active' : ''}`}
          >
            {nature}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <FaCampground /><span>장소구분 :</span>
        {indutyOptions.map(induty => (
          <button
            key={induty}
            onClick={() => onIndutyChange(induty)}
            className={`filter-button ${selectedInduty === induty ? 'active' : ''}`}
          >
            {induty}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
