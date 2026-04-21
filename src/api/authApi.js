import axiosInstance from "./axiosInstance";

// ================= AUTH =================

export const signupDoctor = async (formData) => {
  try {
    const res = await axiosInstance.post("/api/auth/signup", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/verify-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resendOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/resend-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginDoctor = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/login", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/forgot-password", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resendResetOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/resend-reset-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const verifyResetOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/verify-reset-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/reset-password", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ================= PROFILE =================

export const getDoctorProfile = async (slug, patientEmail) => {
  try {
    const res = await axiosInstance.get(
      `/api/auth/profile/${slug}?patientEmail=${patientEmail}`
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDashboard = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/dashboard");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDashboardStats = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/dashboard-stats");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProfile = async (data) => {
  try {
    const res = await axiosInstance.put("/api/auth/update-profile", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const changeProfilePhoto = async (formData) => {
  try {
    const res = await axiosInstance.put(
      "/api/auth/change-photo",
      formData
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ================= APPOINTMENTS =================

export const bookAppointment = async (slug, data) => {
  try {
    const res = await axiosInstance.post(`/api/auth/book/${slug}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAppointments = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/appointments");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const confirmAppointment = async (id) => {
  try {
    const res = await axiosInstance.put(
      `/api/auth/appointments/${id}/confirm`
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const rescheduleAppointment = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      `/api/auth/appointments/${id}/reschedule`,
      data
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const cancelAppointment = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      `/api/auth/appointments/${id}/cancel`,
      data
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ================= ADMIN =================

export const getAllDoctors = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/admin/doctors");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const getAdminDashboardStats = async () => {
  try {
    const res = await axiosInstance.get(
      "/api/auth/admin/dashboard-stats"
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const toggleDoctorBlock = async (id) => {
  try {
    const res = await axiosInstance.put(
      `/api/auth/admin/doctor/${id}/toggle-block`
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createDoctorByAdmin = async (data) => {
  try {
    const res = await axiosInstance.post(
      "/api/auth/admin/create-doctor",
      data
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// ================= CHANGE EMAIL =================

// Send OTP to new email
export const sendNewEmailOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/change-email/send-otp", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Verify new email OTP
export const verifyNewEmailOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/change-email/verify-new", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Resend OTP to new email
export const resendNewEmailOtp = async () => {
  try {
    const res = await axiosInstance.post("/api/auth/change-email/resend-new-otp");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Verify old email OTP
export const verifyOldEmailOtp = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/change-email/verify-old", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Resend OTP to old email
export const resendOldEmailOtp = async () => {
  try {
    const res = await axiosInstance.post("/api/auth/change-email/resend-old-otp");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



// Enquiry APIs

export const sendEnquiry = async (slug, data) => {
  try {
    const res = await axiosInstance.post(`/api/auth/enquiry/${slug}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDoctorEnquiries = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/doctor/enquiries");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateEnquiryStatus = async (id, data) => {
  try {
    const res = await axiosInstance.put(`/api/auth/enquiry/${id}/status`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// ================= ADMIN ENQUIRIES =================

// 🌍 Website se admin ko enquiry
export const sendAdminEnquiry = async (data) => {
  try {
    const res = await axiosInstance.post("/api/auth/admin/enquiry", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// 📥 Admin dashboard enquiries
export const getAdminEnquiries = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/admin/enquiries");
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✔ Admin enquiry read / unread
export const updateAdminEnquiryStatus = async (id) => {
  try {
    const res = await axiosInstance.put(`/api/auth/admin/enquiry/${id}/status`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const generateAIContent = async (data) => {
    try {
  const res = await axiosInstance.post("/api/auth/generate-ai-content", data);
  return res.data;
   } catch (error) {
    throw error.response?.data || error;
  }
};