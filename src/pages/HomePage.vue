<template>
  <section class="hero">
    <div class="hero-left">
      <p class="hero-kicker">Полусухая стяжка пола в Москве за 1 день</p>
      <h1>
        Механизированная стяжка пола
        <span>на немецком оборудовании</span>
      </h1>
      <p class="hero-lead">
        Работаем с 2010 года и завершили более 3&nbsp;000 объектов. Знаем, как сделать вашу площадку
        идеально ровной без трещин и перерасхода материала.
      </p>

      <div class="trusted-by">
        <span>Knauf</span>
        <span>Hope</span>
        <span>Kera</span>
        <span>Lafarge</span>
        <span>BMS</span>
      </div>

      <div class="info-card">
        <div class="info-emoji">👍</div>
        <div>
          <div class="info-title">Работаем с 2010 года</div>
          <div class="info-text">Выбираем оптимальную технологию под ваш объект.</div>
        </div>
      </div>

      <div class="hero-actions">
        <button class="hero-primary" type="button" @click="openModal('estimate')">Сделать расчёт</button>
        <div class="hero-note">
          Пройдите квиз и получите лучшее предложение по цене, качеству и срокам.
        </div>
      </div>

      <div class="features">
        <div class="feature-card">
          <div class="feature-title">5 бригад</div>
          <p>Профессиональные штатные мастера</p>
        </div>
        <div class="feature-card">
          <div class="feature-title">5 растворонасосов</div>
          <p>Оборудование готово к работе в любой день</p>
        </div>
        <div class="feature-card">
          <div class="feature-title">Сертификаты</div>
          <p>Все материалы подтверждены</p>
        </div>
        <div class="feature-card">
          <div class="feature-title">Контроль качества</div>
          <p>На каждом этапе работ</p>
        </div>
      </div>
    </div>

    <div class="hero-right">
      <FloorScreedQuiz />
    </div>
  </section>

  <section class="slider-section">
    <div class="slider-header">
      <div>
        <p class="slider-kicker">Наш опыт</p>
        <h2>Свежие объекты за последний квартал</h2>
      </div>
      <div class="slider-controls">
        <button @click="prevSlide" :disabled="currentSlide === 0">‹</button>
        <button @click="nextSlide" :disabled="currentSlide === totalSlides - 1">›</button>
      </div>
    </div>

    <div class="slider-window">
      <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(slide, slideIndex) in sliderSlides" :key="slideIndex" class="slider-row">
          <article v-for="item in slide" :key="item.id" class="slider-card">
            <div class="slider-tag">{{ item.type }}</div>
            <div class="slider-title">{{ item.title }}</div>
            <p>{{ item.desc }}</p>
            <div class="slider-meta">
              <span>{{ item.area }}</span>
              <span>{{ item.time }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import FloorScreedQuiz from '../components/FloorScreedQuiz.vue';

const sliderItems = [
  {
    id: 1,
    type: 'Квартира в новостройке',
    title: 'ЖК «Символ», 74 м²',
    desc: 'Черновая стяжка под тёплый пол и финишное выравнивание.',
    area: 'Площадь: 74 м²',
    time: 'Срок: 2 дня'
  },
  {
    id: 2,
    type: 'Коттедж',
    title: 'Новорижское ш., 210 м²',
    desc: 'Полусухая стяжка по грунту с гидроизоляцией.',
    area: 'Площадь: 210 м²',
    time: 'Срок: 3 дня'
  },
  {
    id: 3,
    type: 'Коммерция',
    title: 'Коворкинг в Химках, 160 м²',
    desc: 'Быстросохнущая стяжка под винил без остановки бизнеса.',
    area: 'Площадь: 160 м²',
    time: 'Срок: 36 часов'
  },
  {
    id: 4,
    type: 'Квартира во вторичке',
    title: 'м. Университет, 58 м²',
    desc: 'Выравнивание с перепадами до 5 см, подготовка под ламинат.',
    area: 'Площадь: 58 м²',
    time: 'Срок: 1 день'
  },
  {
    id: 5,
    type: 'Таунхаус',
    title: 'Красногорск, 132 м²',
    desc: 'Стяжка под водяной тёплый пол, скрытая проводка.',
    area: 'Площадь: 132 м²',
    time: 'Срок: 2 дня'
  },
  {
    id: 6,
    type: 'Офис',
    title: 'МФЦ в Одинцово, 240 м²',
    desc: 'Стяжка с армированием и деформационными швами.',
    area: 'Площадь: 240 м²',
    time: 'Срок: 4 дня'
  },
  {
    id: 7,
    type: 'Частный дом',
    title: 'Видное, 185 м²',
    desc: 'Устройство стяжки по перекрытиям с утеплением.',
    area: 'Площадь: 185 м²',
    time: 'Срок: 3 дня'
  },
  {
    id: 8,
    type: 'Склад',
    title: 'Люберцы, 320 м²',
    desc: 'Высокопрочная промышленная стяжка с защитой от пыли.',
    area: 'Площадь: 320 м²',
    time: 'Срок: 5 дней'
  }
];

const currentSlide = ref(0);
const sliderSlides = computed(() => {
  const chunk = [];
  for (let i = 0; i < sliderItems.length; i += 4) {
    chunk.push(sliderItems.slice(i, i + 4));
  }
  return chunk;
});

const totalSlides = computed(() => sliderSlides.value.length);

const openModal = inject('openModal', () => {});

function nextSlide() {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value += 1;
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value -= 1;
  }
}
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: flex-start;
  padding: 32px 24px 48px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-left h1 {
  margin: 8px 0 12px;
  font-size: 36px;
  line-height: 1.15;
  color: #0f172a;
}

.hero-left h1 span {
  color: #2563eb;
}

.hero-kicker {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #64748b;
  margin: 0;
}

.hero-lead {
  color: #475467;
  font-size: 15px;
  margin-bottom: 18px;
}

.trusted-by {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 18px;
}

.info-card {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  margin-bottom: 18px;
  align-items: center;
}

.hero-actions {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.hero-primary {
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  background: #ef4444;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
}

.hero-note {
  max-width: 280px;
  font-size: 13px;
  color: #475467;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

.feature-card {
  background: #e0f2fe;
  border-radius: 12px;
  padding: 14px;
  border: 1px solid #bae6fd;
}

.hero-right {
  position: sticky;
  top: 24px;
}

.slider-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 48px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.slider-window {
  overflow: hidden;
  width: 100%;
}

.slider-track {
  display: flex;
  transition: transform 0.35s ease;
}

.slider-row {
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.slider-card {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #e5e7eb;
}

.slider-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  background: #dbeafe;
  margin-bottom: 10px;
}

.slider-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #0f172a;
  font-weight: 500;
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-right {
    position: static;
  }

  .slider-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .slider-row {
    grid-template-columns: 1fr;
  }
}
</style>






