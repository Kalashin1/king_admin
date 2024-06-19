export const SCREENS = {
  LOGIN: '/login',
  REGISTER: '/register',
  PLANS: '/plans',
  PLAN: (id) => `/plan/${id ? id : '/:id'}`,
  CREATE_PLAN: '/create-plan',
}