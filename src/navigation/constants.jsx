export const SCREENS = {
  LOGIN: '/login',
  REGISTER: '/register',
  PLANS: '/plans',
  PLAN: (id) => `/plan/${id ? id : '/:id'}`,
  CREATE_PLAN: '/create-plan',
  DASHBOARD: '/dashboard',
  ORDERS: '/orders/',
  ORDER: (id) => `/order/${id}`,
  INVOICES: '/invoices',
  INVOICE: (id) => `/invoice/${id}`,
  COURSES: `/courses`,
  COURSE: (id) => `/course/${id}`
}