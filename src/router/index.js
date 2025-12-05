import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import CalculatorPage from '../pages/CalculatorPage.vue';
import ServicesPage from '../pages/ServicesPage.vue';
import ProjectsPage from '../pages/ProjectsPage.vue';
import PricesPage from '../pages/PricesPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Полусухая стяжка пола в Москве — механизированная стяжка за 1 день | ПрофПол',
      description: 'Профессиональная полусухая стяжка пола в Москве. Работаем с 2010 года, более 3000 объектов. Немецкое оборудование, 5 бригад, гарантия качества. Звоните: +7 (495) 50-22-11'
    }
  },
  {
    path: '/kalkulyator-styazhki',
    name: 'calculator',
    component: CalculatorPage,
    meta: {
      title: 'Калькулятор стоимости стяжки пола — рассчитать цену онлайн | ПрофПол',
      description: 'Онлайн-калькулятор для расчёта стоимости полусухой стяжки пола. Узнайте точную цену за 1 минуту. Учитываем площадь, толщину, дополнительные работы.'
    }
  },
  {
    path: '/nashi-uslugi',
    name: 'services',
    component: ServicesPage,
    meta: {
      title: 'Наши услуги — виды стяжки пола и дополнительные работы | ПрофПол',
      description: 'Полный спектр услуг по устройству стяжки пола: полусухая, мокрая, самовыравнивающаяся. Гидроизоляция, тёплые полы, армирование. Работаем в Москве и области.'
    }
  },
  {
    path: '/nashi-obekty',
    name: 'projects',
    component: ProjectsPage,
    meta: {
      title: 'Наши объекты — портфолио выполненных работ по стяжке пола | ПрофПол',
      description: 'Примеры наших работ: квартиры, коттеджи, коммерческие объекты. Более 3000 завершённых проектов с 2010 года. Фото, описание и отзывы клиентов.'
    }
  },
  {
    path: '/ceny-styazhki',
    name: 'prices',
    component: PricesPage,
    meta: {
      title: 'Цены на стяжку пола в Москве — прайс-лист на услуги | ПрофПол',
      description: 'Актуальные цены на полусухую стяжку пола в Москве. Стоимость работ и материалов. Прозрачное ценообразование, фиксированные расценки, без скрытых платежей.'
    }
  },
  {
    path: '/kontakty',
    name: 'contacts',
    component: ContactsPage,
    meta: {
      title: 'Контакты — адрес офиса, телефоны, график работы | ПрофПол',
      description: 'Свяжитесь с нами: +7 (495) 50-22-11, +7 (499) 50-22-11. Офис: Москва, ул. Комсомольская пл., 1а. Работаем Пн–Пт: 9:00–20:00. Бесплатная консультация.'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Обновление SEO-тегов при навигации
router.beforeEach((to, from, next) => {
  // Обновляем title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Обновляем или создаём meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  if (to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description);
  }

  next();
});

export default router;








