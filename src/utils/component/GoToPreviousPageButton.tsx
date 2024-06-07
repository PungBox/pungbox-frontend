import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GoToPreviousPageButtonProps {
  innerText: string;
  className?: string;
}

const GoToPreviousPageButton: React.FC<GoToPreviousPageButtonProps> = ({ innerText, className }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={className}>
      {innerText}
    </button>
  );
};

export default GoToPreviousPageButton;
