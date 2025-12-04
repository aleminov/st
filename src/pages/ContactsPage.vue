<template>
  <section class="page-section">
    <h1>Контакты</h1>
    <p class="lead">
      Офис и демонстрационный стенд работают в будние дни с 9:00 до 20:00. Приём по записи, чтобы мы
      могли подготовить материалы под ваши задачи.
    </p>

    <div class="contacts-grid">
      <div class="contacts-card">
        <h3>Офис продаж</h3>
        <p>Москва, ул. Комсомольская пл., 1а</p>
        <p>Пн–Пт: 09:00–20:00</p>
        <a href="tel:+7495502211">+7 (495) 50-22-11</a>
        <a href="mailto:info@prof-pol.ru">info@prof-pol.ru</a>
      </div>

      <div class="contacts-card">
        <h3>Склад и база техники</h3>
        <p>Красногорск, Новорижское ш., вл. 45</p>
        <p>Пн–Сб: 08:00–21:00</p>
        <p>Выдача материалов по предварительной заявке.</p>
      </div>

      <div class="contacts-card">
        <h3>Онлайн-каналы</h3>
        <p>WhatsApp / Telegram: +7 (900) 123-45-67</p>
        <p>Мы отвечаем в мессенджерах в течение 15 минут.</p>
        <button type="button" class="btn" @click="openModal('callback')">Оставить заявку</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue';

const openModal = inject('openModal', () => {});
</script>

<style scoped>
.page-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

.lead {
  margin-bottom: 20px;
  color: #475467;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.contacts-card {
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contacts-card a {
  color: #2563eb;
  text-decoration: none;
}

.btn {
  margin-top: 8px;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
</style>






