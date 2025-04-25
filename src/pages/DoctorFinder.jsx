import { useQuery } from '@tanstack/react-query';
import { fetchDoctors } from '@/services/doctorService';
import { useDoctorFilters } from '@/hooks/useDoctorFilters';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorList from '@/components/DoctorList';
import { Skeleton } from '@/components/ui/skeleton';

const DoctorFinder = () => {
  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  const {
    filters,
    filteredDoctors,
    suggestions,
    allSpecialties,
    handleSearchChange,
    handleSuggestionClick,
    handleConsultationTypeChange,
    handleSpecialtyChange,
    handleSortChange,
  } = useDoctorFilters(doctors);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">Failed to load doctor data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Find Doctors</h1>
      
      <div className="mb-8">
        <SearchBar
          suggestions={suggestions}
          onSearchChange={handleSearchChange}
          onSuggestionClick={handleSuggestionClick}
          searchTerm={filters.searchTerm}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-44 w-full" />
            </div>
          ) : (
            <FilterPanel
              allSpecialties={allSpecialties}
              selectedSpecialties={filters.selectedSpecialties}
              consultationType={filters.consultationType}
              sortBy={filters.sortBy}
              onConsultationTypeChange={handleConsultationTypeChange}
              onSpecialtyChange={handleSpecialtyChange}
              onSortChange={handleSortChange}
            />
          )}
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-52 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
                </p>
              </div>
              <DoctorList doctors={filteredDoctors} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
