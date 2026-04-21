import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctorProfile } from "../api/authApi";

import SeeHero from '../component/profile/SeeHero'
import EnquiryForm from '../component/profile/EnquiryForm'
import PatientReview from '../component/profile/PatientReview'
import MedicalServices from '../component/profile/MedicalServices'
import DoctorProfile from '../component/profile/DoctorProfile'
import Achievements from '../component/profile/Achievements'
import CTASection from '../component/profile/CTASection'
import AppointmentForm from "../component/profile/AppointmentForm";
import TrustSection from '../component/profile/TrustSection'
import AboutDoctor from '../component/profile/AboutDoctor'

function SeeProfile() {

  const navigate = useNavigate();
  const { slug } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const patientEmail = localStorage.getItem("patientEmail") || "";

  useEffect(() => {

    const fetchDoctor = async () => {
      try {

        const data = await getDoctorProfile(slug, patientEmail);

        setDoctor(data.doctor || data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDoctor();
    }

  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Doctor not found
      </div>
    );
  }

  return (
 <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-900 overflow-hidden relative">
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-gray-200"></div>
      <div className="absolute w-[400px] h-[400px] bg-teal-200/40 blur-[120px] top-[-80px] left-[-80px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-200/40 blur-[120px] bottom-[-80px] right-[-80px]"></div>

      <SeeHero doctor={doctor} navigate={navigate} />

      <div className="relative px-6 md:px-20 pb-20">
        <DoctorProfile doctor={doctor} navigate={navigate} />
        <MedicalServices />
        <PatientReview doctor={doctor} />
        <Achievements doctor={doctor} />
        <TrustSection />
        <AboutDoctor doctor={doctor} navigate={navigate} />
        <EnquiryForm slug={doctor.slug} clinicLocation={doctor.clinicLocation}/>
        <CTASection doctor={doctor} navigate={navigate} />
      </div>
    </div>
  );
}

export default SeeProfile;