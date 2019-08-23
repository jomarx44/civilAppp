// this will hold all the api path for production


const api = {
  pin: 'api/v1/check/pin/',
  login: 'authenticate3',
  notifications: 'api/v1/notification/',
  portfolios: 'api/v1/activity/getPortfolio/',
  applications: 'api/v1/activity/getApplications/',
  billing: '/api/v1/find/billing/by/application/',
  portfolio_range: 30,
  products: 'api/v1/products/',
  borrowApply: 'api/v1/products/apply',
  updatePassword: 'api/v1/update/password',
  firstTimeLogInFalse: 'api/v1/update/first/time/user/false/'
}
export default api

