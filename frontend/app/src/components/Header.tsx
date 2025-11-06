import './Header.css';

export const Header = () => {
  return (
    <div className="header">
        <div className="header-title-wrapper">
            <h1 className="header-title">Recipe Finder</h1>
        </div>
        <p className="header-subtitle">
            Tell us what ingredients you have, and we'll suggest delicious recipes
        </p>
    </div>
  );
};