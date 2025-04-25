
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div
      data-testid="doctor-card"
      className="bg-white p-4 rounded-lg shadow mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between mb-2">
        <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-800">
          {doctor.name}
        </h2>
        <div className="flex items-center">
          <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
            {doctor.rating} ★
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-2">{doctor.designation}</p>

      <div className="mb-2">
        <span data-testid="doctor-specialty" className="text-gray-700 font-medium">
          {doctor.specialties.join(", ")}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span data-testid="doctor-experience" className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
          {doctor.experience} years experience
        </span>
        <span data-testid="doctor-fee" className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded">
          ₹{doctor.fees} Consultation Fee
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p>{doctor.qualification}</p>
        <p>Languages: {doctor.languagesSpoken.join(", ")}</p>
      </div>

      <div className="mb-3 text-sm">
        <p className="font-medium">Available for:</p>
        <div className="flex gap-2 mt-1">
          {doctor.consultationMode.map((mode) => (
            <span
              key={mode}
              className={`px-2 py-1 rounded ${
                mode === "Video Consult"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {mode}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
