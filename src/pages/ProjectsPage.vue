<template>
  <section class="page-section">
    <h1>Наши объекты</h1>
    <p class="lead">
      За последние годы выполнили более 3&nbsp;000 заказов. Ниже — часть свежих проектов с указанием
      типа объекта, площади и особенностей выполнения.
    </p>

    <div class="projects">
      <article v-for="project in projects" :key="project.title" class="project-card">
        <div class="project-header">
          <span class="tag">{{ project.type }}</span>
          <span>{{ project.area }}</span>
        </div>
        <h3>{{ project.title }}</h3>
        <p>{{ project.desc }}</p>
        <ul>
          <li v-for="detail in project.details" :key="detail">{{ detail }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    type: 'ЖК',
    area: '74 м²',
    title: 'ЖК «Символ», Москва',
    desc: 'Квартира в новостройке, стяжка под тёплый пол и финишное выравнивание.',
    details: ['Срок: 2 дня', 'Толщина 60 мм', 'Лазерная разбивка уровней']
  },
  {
    type: 'Коммерция',
    area: '160 м²',
    title: 'Коворкинг в Химках',
    desc: 'Быстросохнущая стяжка без остановки работы бизнес-центра.',
    details: ['Срок: 36 часов', 'Усиленное армирование', 'Звукоизоляция на перекрытии']
  },
  {
    type: 'Дом',
    area: '210 м²',
    title: 'Коттедж на Новорижском шоссе',
    desc: 'Стяжка по грунту с утеплением и контуром водяного тёплого пола.',
    details: ['Срок: 3 дня', 'Утеплитель 50 мм', 'Растворонасос BMS']
  }
];
</script>

<style scoped>
.page-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

h1 {
  margin-bottom: 8px;
}

.lead {
  margin-bottom: 24px;
  color: #475467;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.project-card {
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #475467;
}

.tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 600;
}

.project-card ul {
  margin: 10px 0 0;
  padding-left: 18px;
  color: #475467;
}
</style>








