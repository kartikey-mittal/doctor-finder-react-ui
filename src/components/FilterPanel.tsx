
import { ConsultationType, SortOption } from "@/hooks/useDoctorFilters";
import { useState } from "react";

interface FilterPanelProps {
  allSpecialties: string[];
  selectedSpecialties: string[];
  consultationType: ConsultationType;
  sortBy: SortOption;
  onConsultationTypeChange: (type: ConsultationType) => void;
  onSpecialtyChange: (specialty: string, isChecked: boolean) => void;
  onSortChange: (option: SortOption) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  allSpecialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    consultationMode: true,
    specialties: true,
    sort: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSpecialtyTestId = (specialty: string) => {
    // Fix: Add a null check before using replace
    if (!specialty) return "";
    // Format specialty for data-testid (replace spaces and special chars)
    return specialty.replace(/[^a-zA-Z0-9]/g, "-");
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-4 max-h-screen overflow-y-auto">
      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          onClick={() => toggleSection("consultationMode")}
          className="font-semibold text-lg mb-2 flex justify-between cursor-pointer"
        >
          Consultation Mode
          <span>{expandedSections.consultationMode ? "−" : "+"}</span>
        </h3>
        {expandedSections.consultationMode && (
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={consultationType === "Video Consult"}
                onChange={() => onConsultationTypeChange("Video Consult")}
                className="h-4 w-4"
              />
              <span>Video Consult</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={consultationType === "In Clinic"}
                onChange={() => onConsultationTypeChange("In Clinic")}
                className="h-4 w-4"
              />
              <span>In Clinic</span>
            </label>
          </div>
        )}
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          onClick={() => toggleSection("specialties")}
          className="font-semibold text-lg mb-2 flex justify-between cursor-pointer"
        >
          Speciality
          <span>{expandedSections.specialties ? "−" : "+"}</span>
        </h3>
        {expandedSections.specialties && (
          <div className="flex flex-col space-y-2 max-h-64 overflow-y-auto">
            {allSpecialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${getSpecialtyTestId(specialty)}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={(e) => onSpecialtyChange(specialty, e.target.checked)}
                  className="h-4 w-4"
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          onClick={() => toggleSection("sort")}
          className="font-semibold text-lg mb-2 flex justify-between cursor-pointer"
        >
          Sort By
          <span>{expandedSections.sort ? "−" : "+"}</span>
        </h3>
        {expandedSections.sort && (
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="sort-fees"
                checked={sortBy === "fees"}
                onChange={() => onSortChange("fees")}
                className="h-4 w-4"
              />
              <span>Fees (Low to High)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                data-testid="sort-experience"
                checked={sortBy === "experience"}
                onChange={() => onSortChange("experience")}
                className="h-4 w-4"
              />
              <span>Experience (High to Low)</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
