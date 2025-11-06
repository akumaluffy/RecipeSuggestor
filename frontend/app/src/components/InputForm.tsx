import type { CategoryType } from '../types';
import { CATEGORY_LABELS } from '../constants/categories.ts';
import './InputForm.css';

interface InputFormProps {
  category: CategoryType;
  value: string;
  onChange: (category: CategoryType, value: string) => void;
  onAdd: (category: CategoryType) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  category,
  value,
  onChange,
  onAdd
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd(category);
    }
  };

  return (
    <div className="input-form-container">
      <label className="input-form-label">
        {CATEGORY_LABELS[category]}
      </label>
      <div className="input-form-controls">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(category, e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Enter a ${category}...`}
          className="input-form-field"
        />
        <button
          onClick={() => onAdd(category)}
          className="input-form-button"
        >
          Add
        </button>
      </div>
    </div>
  );
};