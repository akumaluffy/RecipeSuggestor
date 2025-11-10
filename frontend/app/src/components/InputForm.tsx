import './InputForm.css';

interface InputFormProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  value,
  onChange,
  onAdd
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="input-form-container">
      <label className="input-form-label"></label>
      <div className="input-form-controls">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
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