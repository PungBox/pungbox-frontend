import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GoToPreviousPageButtonProps {
  innerText: string;
}

const GoToPreviousPageButton = ({ innerText }: GoToPreviousPageButtonProps) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>{innerText}</button>;
};

export default GoToPreviousPageButton;
