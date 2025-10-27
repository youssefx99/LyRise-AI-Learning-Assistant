const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

// Parse study plan
export const parseStudyPlan = (plan) => {
  if (!plan) return null;

  return {
    ...plan,
    steps:
      typeof plan.steps === 'string'
        ? JSON.parse(plan.steps)
        : plan.steps || [],
    resources:
      typeof plan.resources === 'string'
        ? JSON.parse(plan.resources)
        : plan.resources || [],
  };
};

// Get auth headers
export const getAuthHeaders = () => {
  console.log('JWT Token:', JWT_TOKEN ? 'Token exists' : 'TOKEN MISSING!');
  
  const headers = {
    'Content-Type': 'application/json',
    'token': JWT_TOKEN
  };
  
  console.log('Headers:', headers);
  return headers;
};
