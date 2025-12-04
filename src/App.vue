<template>
  <div class="page">
    <div class="top-strip">
      <div class="top-strip-inner">
        <div class="brand">
          <div class="brand-logo">П</div>
          <div>
            <div class="brand-title">ПрофПол</div>
            <div class="brand-subtitle">Полусухая стяжка пола</div>
          </div>
        </div>
        <div class="rating">
          <strong>4.9 из 5</strong>
          <span>по 200+ отзывам</span>
        </div>
        <div class="contact-line">
          <div>Офис: Москва, ул. Комсомольская пл., 1а</div>
          <div>Пн–Пт: 9:00–20:00</div>
        </div>
        <div class="phones">
          <div>+7 (495) 50-22-11</div>
          <div>+7 (499) 50-22-11</div>
        </div>
      </div>
    </div>

    <div class="top-strip-mobile">
      <div class="mobile-row mobile-row-top">
        <div class="mobile-brand">
          <div class="brand-logo small">П</div>
          <div>
            <div class="brand-title">ПрофПол</div>
            <div class="brand-subtitle">полусухая стяжка пола</div>
          </div>
        </div>
        <div class="mobile-actions">
          <div class="mobile-schedule">
            <div>Пн–Пт:</div>
            <div>9–20</div>
          </div>
          <div class="mobile-icons">
            <button type="button" aria-label="Позвонить" @click="openModal('callback')">📞</button>
            <button type="button" aria-label="Меню" @click="toggleMobileMenu">☰</button>
          </div>
        </div>
      </div>

      <div class="mobile-row mobile-row-bottom">
        <div class="mobile-rating">
          <div class="stars">★★★★★</div>
          <div>4.9 из 5</div>
        </div>
        <div class="mobile-links">
          <a href="#">160+ отзывов на 2ГИС</a>
          <a href="#">215+ отзывов на Яндекс</a>
        </div>
      </div>

      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="mobile-menu">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="mobile-link"
            :class="{ active: route.path === link.path }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </transition>
    </div>

    <header class="main-nav">
      <div class="main-nav-inner">
        <nav>
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ active: route.path === link.path }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>
        <button class="cta-btn" type="button" @click="openModal('callback')">Заказать звонок</button>
      </div>
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    <div v-if="modalVisible" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card">
        <button class="modal-close" type="button" @click="closeModal">×</button>
        <p class="modal-kicker">Заполните форму</p>
        <h3 class="modal-title">{{ modalTitle }}</h3>
        <p class="modal-subtitle">
          Оставьте контакты, и мы перезвоним, чтобы уточнить детали и сделать точный расчёт.
        </p>

        <form class="modal-form" @submit.prevent="submitModal">
          <label class="modal-field">
            <span>Имя *</span>
            <input type="text" v-model="modalForm.name" placeholder="Ваше имя" />
          </label>

          <label class="modal-field">
            <span>Телефон *</span>
            <input type="tel" v-model="modalForm.phone" placeholder="+7 (___) ___-__-__" />
          </label>

          <p v-if="modalError" class="modal-error">{{ modalError }}</p>

          <div class="modal-actions">
            <button type="submit" class="modal-submit">Отправить</button>
            <button type="button" class="modal-secondary" @click="closeModal">Отмена</button>
          </div>

          <p class="modal-note">
            Нажимая на кнопку, вы подтверждаете согласие на обработку персональных данных.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navLinks = [
  { label: 'Главная', path: '/' },
  { label: 'Наши услуги', path: '/nashi-uslugi' },
  { label: 'Наши объекты', path: '/nashi-obekty' },
  { label: 'Цены', path: '/ceny-styazhki' },
  { label: 'Калькулятор', path: '/kalkulyator-styazhki' },
  { label: 'Контакты', path: '/kontakty' }
];

const modalVisible = ref(false);
const modalType = ref('callback');
const modalForm = ref({ name: '', phone: '' });
const modalError = ref('');
const mobileMenuOpen = ref(false);

const modalTitle = computed(() =>
  modalType.value === 'callback' ? 'Заказать обратный звонок' : 'Получить расчёт стоимости'
);

function openModal(type) {
  modalType.value = type;
  modalVisible.value = true;
}

function closeModal() {
  modalVisible.value = false;
  modalError.value = '';
  modalForm.value = { name: '', phone: '' };
}

function submitModal() {
  modalError.value = '';
  if (!modalForm.value.name.trim()) {
    modalError.value = 'Пожалуйста, укажите имя.';
    return;
  }
  const phoneRegex = /^\+7[\s(]?\d{3}[\s)]?\s?\d{3}-?\d{2}-?\d{2}$/;
  if (!phoneRegex.test(modalForm.value.phone.trim())) {
    modalError.value = 'Введите телефон в формате +7 (XXX) XXX-XX-XX.';
    return;
  }

  console.log('Modal request', {
    type: modalType.value,
    ...modalForm.value
  });

  closeModal();
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

provide('openModal', openModal);
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f6fb;
  font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

.top-strip {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 24px;
}

.top-strip-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 150px 1fr auto;
  align-items: center;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: linear-gradient(130deg, #f97316, #facc15);
  color: #fff;
  font-weight: 800;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo.small {
  width: 46px;
  height: 46px;
}

.brand-title {
  font-weight: 700;
  font-size: 18px;
}

.brand-subtitle {
  font-size: 13px;
  color: #6b7280;
}

.rating {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #475467;
}

.contact-line {
  font-size: 13px;
  color: #475467;
  line-height: 1.4;
}

.phones {
  text-align: right;
  font-weight: 600;
  color: #0f172a;
}

.top-strip-mobile {
  display: none;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 16px;
  gap: 12px;
  position: relative;
  z-index: 10;
}

.mobile-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.mobile-row-bottom {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 10px;
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mobile-icons {
  display: flex;
  gap: 8px;
}

.mobile-icons button {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
}

.mobile-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #0f172a;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
}

.mobile-links a {
  color: #2563eb;
  text-decoration: none;
}

.mobile-menu {
  position: absolute;
  left: 16px;
  right: 16px;
  top: calc(100% - 6px);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  background: #f8fafc;
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.18);
}

.mobile-link {
  text-decoration: none;
  color: #0f172a;
  font-weight: 500;
  font-size: 14px;
  padding: 6px 0;
  border-bottom: 1px solid #e2e8f0;
}

.mobile-link:last-child {
  border-bottom: none;
}

.mobile-link.active {
  color: #2563eb;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.main-nav {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 24px;
}

.main-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.main-nav nav {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.nav-link {
  text-decoration: none;
  color: #475467;
  font-size: 14px;
  font-weight: 500;
}

.nav-link.active {
  color: #2563eb;
}

.cta-btn {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background: #ef4444;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.page-content {
  flex: 1;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 999;
}

.modal-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 28px 26px 24px;
  position: relative;
  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.25);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  font-size: 20px;
  cursor: pointer;
}

.modal-kicker {
  margin: 0;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #94a3b8;
}

.modal-title {
  margin: 6px 0 4px;
  font-size: 22px;
  color: #0f172a;
}

.modal-subtitle {
  margin: 0 0 16px;
  font-size: 14px;
  color: #475467;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #475467;
}

.modal-field input {
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.modal-field input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.15);
}

.modal-error {
  color: #dc2626;
  margin: 0;
  font-size: 13px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.modal-submit {
  flex: 1;
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.modal-secondary {
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  background: #e2e8f0;
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}

.modal-note {
  font-size: 11px;
  color: #94a3b8;
  margin: 0;
}

@media (max-width: 980px) {
  .top-strip-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .phones {
    text-align: center;
  }

  .main-nav-inner {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .top-strip,
  .main-nav {
    display: none;
  }

  .top-strip-mobile {
    display: block;
  }

  .page-content {
    padding-top: 12px;
  }
}
</style>
