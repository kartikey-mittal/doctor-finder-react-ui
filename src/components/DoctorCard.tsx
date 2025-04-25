
import { Doctor } from "@/types/doctor";
import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const {
    name,
    designation,
    specialties = [],
    experience,
    fees,
    qualification,
    languagesSpoken = [],
    consultationMode = [],
    rating,
    address
  } = doctor;

  return (
    <div
      data-testid="doctor-card"
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow mb-4"
    >
      <div className="flex gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0" /> {/* Placeholder for doctor image */}
        <div className="flex-grow">
          <h2 data-testid="doctor-name" className="text-lg font-semibold text-gray-800">
            {name}
          </h2>
          <p data-testid="doctor-specialty" className="text-gray-600">
            {specialties.join(", ")}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {qualification}
          </p>
          <p data-testid="doctor-experience" className="text-gray-600 text-sm mt-1">
            {experience} years exp.
          </p>
        </div>
        <div className="text-right">
          <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm inline-block">
            {rating} ★
          </div>
          <p data-testid="doctor-fee" className="mt-2 font-semibold text-gray-900">
            ₹{fees}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span>Dr. {name} Clinic</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{address}</span>
        </div>
      </div>

      <div className="mt-4">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          variant="default"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
