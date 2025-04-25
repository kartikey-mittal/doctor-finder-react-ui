
import { ConsultationType, SortOption } from "@/hooks/useDoctorFilters";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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
  const [searchTerm, setSearchTerm] = useState("");
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

  // Fix: Check if each specialty is defined before calling toLowerCase
  const filteredSpecialties = allSpecialties.filter(specialty =>
    specialty && specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearAllFilters = () => {
    onConsultationTypeChange("");
    selectedSpecialties.forEach(specialty => onSpecialtyChange(specialty, false));
    onSortChange("");
  };

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-medium">Filters</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Specialties Section */}
        <Collapsible 
          defaultOpen={true}
          className="space-y-2"
        >
          <CollapsibleTrigger 
            className="flex items-center justify-between w-full"
            data-testid="filter-header-speciality"
          >
            <h3 className="text-sm font-medium">Specialities</h3>
            <span>{expandedSections.specialties ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search specialties"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredSpecialties.map((specialty) => (
                <label
                  key={specialty}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    data-testid={`filter-specialty-${specialty.replace(/[^a-zA-Z0-9]/g, "-")}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={(e) => onSpecialtyChange(specialty, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Mode of Consultation */}
        <Collapsible defaultOpen={true} className="space-y-2">
          <CollapsibleTrigger 
            className="flex items-center justify-between w-full"
            data-testid="filter-header-moc"
          >
            <h3 className="text-sm font-medium">Mode of consultation</h3>
            <span>{expandedSections.consultationMode ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={consultationType === "Video Consult"}
                onChange={() => onConsultationTypeChange("Video Consult")}
                className="h-4 w-4"
              />
              <span>Video Consultation</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={consultationType === "In Clinic"}
                onChange={() => onConsultationTypeChange("In Clinic")}
                className="h-4 w-4"
              />
              <span>In-clinic Consultation</span>
            </label>
          </CollapsibleContent>
        </Collapsible>

        {/* Sort By */}
        <Collapsible defaultOpen={true} className="space-y-2">
          <CollapsibleTrigger 
            className="flex items-center justify-between w-full"
            data-testid="filter-header-sort"
          >
            <h3 className="text-sm font-medium">Sort By</h3>
            <span>{expandedSections.sort ? "−" : "+"}</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                data-testid="sort-fees"
                checked={sortBy === "fees"}
                onChange={() => onSortChange("fees")}
                className="h-4 w-4"
              />
              <span>Fees (Low to High)</span>
            </label>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="radio"
                data-testid="sort-experience"
                checked={sortBy === "experience"}
                onChange={() => onSortChange("experience")}
                className="h-4 w-4"
              />
              <span>Experience (High to Low)</span>
            </label>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
