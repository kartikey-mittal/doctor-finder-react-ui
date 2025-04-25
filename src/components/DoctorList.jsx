
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No doctors match your criteria</p>
        <p className="text-gray-500">Try changing your search or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
