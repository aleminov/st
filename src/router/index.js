import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import CalculatorPage from '../pages/CalculatorPage.vue';
import ServicesPage from '../pages/ServicesPage.vue';
import ProjectsPage from '../pages/ProjectsPage.vue';
import PricesPage from '../pages/PricesPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';

export const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/kalkulyator-styazhki',
    name: 'calculator',
    component: CalculatorPage
  },
  { path: '/nashi-uslugi', name: 'services', component: ServicesPage },
  { path: '/nashi-obekty', name: 'projects', component: ProjectsPage },
  { path: '/ceny-styazhki', name: 'prices', component: PricesPage },
  { path: '/kontakty', name: 'contacts', component: ContactsPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;








