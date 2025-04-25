
import { Doctor } from "@/types/doctor";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type ConsultationType = "Video Consult" | "In Clinic" | "";
export type SortOption = "fees" | "experience" | "";

interface DoctorFilters {
  searchTerm: string;
  consultationType: ConsultationType;
  selectedSpecialties: string[];
  sortBy: SortOption;
}

export const useDoctorFilters = (doctors: Doctor[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<DoctorFilters>({
    searchTerm: searchParams.get("search") || "",
    consultationType: (searchParams.get("consultType") as ConsultationType) || "",
    selectedSpecialties: searchParams.get("specialties")?.split(",").filter(Boolean) || [],
    sortBy: (searchParams.get("sortBy") as SortOption) || "",
  });

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);

  // Extract unique specialties from all doctors
  const allSpecialties = [...new Set(doctors.flatMap(doctor => doctor.specialties))].sort();

  // Update search params whenever filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filters.searchTerm) {
      newSearchParams.set("search", filters.searchTerm);
    }
    
    if (filters.consultationType) {
      newSearchParams.set("consultType", filters.consultationType);
    }
    
    if (filters.selectedSpecialties.length > 0) {
      newSearchParams.set("specialties", filters.selectedSpecialties.join(","));
    }
    
    if (filters.sortBy) {
      newSearchParams.set("sortBy", filters.sortBy);
    }
    
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  // Apply filters to doctors
  useEffect(() => {
    let result = [...doctors];

    // Filter by search term
    if (filters.searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by consultation type
    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.consultationMode.includes(filters.consultationType)
      );
    }

    // Filter by specialties
    if (filters.selectedSpecialties.length > 0) {
      result = result.filter(doctor => 
        filters.selectedSpecialties.some(specialty => 
          doctor.specialties.includes(specialty)
        )
      );
    }

    // Sort doctors
    if (filters.sortBy === "fees") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sortBy === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [doctors, filters]);

  // Update suggestions based on search term
  useEffect(() => {
    if (filters.searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matchedDoctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ).slice(0, 3);

    setSuggestions(matchedDoctors);
  }, [doctors, filters.searchTerm]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  };

  const handleSuggestionClick = (doctor: Doctor) => {
    setFilters(prev => ({ ...prev, searchTerm: doctor.name }));
    setSuggestions([]);
  };

  const handleConsultationTypeChange = (type: ConsultationType) => {
    setFilters(prev => ({ ...prev, consultationType: type }));
  };

  const handleSpecialtyChange = (specialty: string, isChecked: boolean) => {
    setFilters(prev => ({
      ...prev,
      selectedSpecialties: isChecked 
        ? [...prev.selectedSpecialties, specialty]
        : prev.selectedSpecialties.filter(s => s !== specialty)
    }));
  };

  const handleSortChange = (option: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy: option }));
  };

  return {
    filters,
    filteredDoctors,
    suggestions,
    allSpecialties,
    handleSearchChange,
    handleSuggestionClick,
    handleConsultationTypeChange,
    handleSpecialtyChange,
    handleSortChange,
  };
};
