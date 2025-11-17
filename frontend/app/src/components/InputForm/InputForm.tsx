import './InputForm.css';

interface InputFormProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

/**
 * container for ingredients input form
 * @param value - ingredient string
 * @param onChange - handles value changes
 * @param onAdd - button function for adding ingredients to the ingredients list
 */
export const InputForm: React.FC<InputFormProps> = ({
value, onChange, onAdd }) => 
{
  // handles user pressing enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="input-form-container">
      <h2 className="input-form-title">Ingredient Form</h2>
      <div className="input-form-controls">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`Enter an ingredient...`}
          className="input-form-field"
        />
        <button
          onClick={() => onAdd()}
          className="input-form-button"
        >
        Add
        </button>
      </div>
    </div>
  );
};