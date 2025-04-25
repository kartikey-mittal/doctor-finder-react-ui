
import { Doctor } from "@/types/doctor";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

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

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          data-testid="autocomplete-input"
          className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
              className="p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onSuggestionClick(doctor);
                setShowSuggestions(false);
              }}
            >
              <div className="font-medium">{doctor.name}</div>
              <div className="text-sm text-gray-600">{doctor.specialties.join(", ")}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
