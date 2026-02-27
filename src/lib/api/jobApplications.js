
export const getJobApplications = async (page = 1, pageSize = 100) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job-applications?page=${page}&pageSize=10`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  
  const data = await res.json();
  
  if (data.success) {
    setApplications(data.items);
  }
};
