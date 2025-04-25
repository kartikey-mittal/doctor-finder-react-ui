
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useDoctorFilters = (doctors) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    searchTerm: searchParams.get("search") || "",
    consultationType: searchParams.get("consultType") || "",
    selectedSpecialties: searchParams.get("specialties")?.split(",").filter(Boolean) || [],
    sortBy: searchParams.get("sortBy") || "",
  });

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [suggestions, setSuggestions] = useState([]);

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

    if (filters.searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.consultationType) {
      result = result.filter(doctor => 
        doctor.consultationMode.includes(filters.consultationType)
      );
    }

    if (filters.selectedSpecialties.length > 0) {
      result = result.filter(doctor => 
        filters.selectedSpecialties.some(specialty => 
          doctor.specialties.includes(specialty)
        )
      );
    }

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

    const matchedDoctors = doctors
      .filter(doctor =>
        doctor.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
      .slice(0, 3);

    setSuggestions(matchedDoctors);
  }, [doctors, filters.searchTerm]);

  const handleSearchChange = (value) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  };

  const handleSuggestionClick = (doctor) => {
    setFilters(prev => ({ ...prev, searchTerm: doctor.name }));
    setSuggestions([]);
  };

  const handleConsultationTypeChange = (type) => {
    setFilters(prev => ({ ...prev, consultationType: type }));
  };

  const handleSpecialtyChange = (specialty, isChecked) => {
    setFilters(prev => ({
      ...prev,
      selectedSpecialties: isChecked 
        ? [...prev.selectedSpecialties, specialty]
        : prev.selectedSpecialties.filter(s => s !== specialty)
    }));
  };

  const handleSortChange = (option) => {
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
