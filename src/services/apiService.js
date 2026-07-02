const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  getToken() {
    return localStorage.getItem('token');
  }

  headers() {
    const h = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  }

  async request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, { headers: this.headers(), ...options });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  get(path) { return this.request(path); }
  post(path, body) { return this.request(path, { method: 'POST', body: JSON.stringify(body) }); }

  // Auth
  login(credentials) { return this.post('/auth/login', credentials); }
  logout() { return this.post('/auth/logout', {}); }
  getProfile() { return this.get('/auth/profile'); }
  register(data) { return this.post('/auth/register', data); }
  refreshToken() { return this.post('/auth/refresh', {}); }

  // Loans
  getLoanOffers() { return this.get('/loans/offers'); }
  getLoanFeatures() { return this.get('/loans/features'); }
  getLoanEligibility() { return this.get('/loans/eligibility'); }
  getLoanDocuments() { return this.get('/loans/documents'); }
  getLoanConfig() { return this.get('/loans/config'); }
  submitLoanApplication(data) { return this.post('/loans/apply', data); }
  getLoanApplicationStatus(id) { return this.get(`/loans/status/${id}`); }
  calculateEMI(data) { return this.post('/loans/emi', data); }
  getPersonalizedLoanOffers() { return this.get('/loans/personalized'); }
  getLoanPageData() { return this.get('/loans/page-data'); }

  // Accounts
  getAccountTypes() { return this.get('/accounts/types'); }
  getAccountBalance() { return this.get('/accounts/balance'); }
  getAccountDetails() { return this.get('/accounts/details'); }
  getAccountTransactions() { return this.get('/accounts/transactions'); }
  openAccount(data) { return this.post('/accounts/open', data); }
  getAccountSummary() { return this.get('/accounts/summary'); }
  getAccountBenefits() { return this.get('/accounts/benefits'); }
  getAccountDashboardData() { return this.get('/accounts/dashboard'); }

  // Services
  getBankingServices() { return this.get('/services'); }
  getServiceDetails(id) { return this.get(`/services/${id}`); }
  getQuickActions() { return this.get('/services/quick-actions'); }
  getServicesPageData() { return this.get('/services/page-data'); }

  // Contact
  getContactInfo() { return this.get('/contact/info'); }
  submitContactForm(data) { return this.post('/contact/message', data); }
  submitGrievance(data) { return this.post('/contact/grievance', data); }
  getGrievanceStatus(id) { return this.get(`/contact/grievance/${id}`); }
  getGrievanceCategories() { return this.get('/contact/grievance/categories'); }

  // Transactions
  getTransactionHistory() { return this.get('/transactions'); }
  getTransactionDetails(id) { return this.get(`/transactions/${id}`); }
  initiateFundTransfer(data) { return this.post('/transactions/transfer', data); }

  // Dashboard
  getDashboardData() { return this.get('/dashboard'); }
  getRecentActivities() { return this.get('/dashboard/activities'); }

  // Batch / UI
  getUIData() { return this.get('/ui-data'); }
}

const apiService = new ApiService();
export default apiService;
