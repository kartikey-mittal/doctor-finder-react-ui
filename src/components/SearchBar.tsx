
import { Doctor } from "@/types/doctor";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  suggestions: Doctor[];
  onSearchChange: (value: string) => void;
  onSuggestionClick: (doctor: Doctor) => void;
  searchTerm: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  suggestions,
  onSearchChange,
  onSuggestionClick,
  searchTerm,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (doctor: Doctor) => {
    onSuggestionClick(doctor);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-blue"
          placeholder="Search for doctors by name..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg"
        >
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              data-testid="suggestion-item"
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionSelect(doctor)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
