<template>
  <section class="page-section">
    <h1>Наши услуги</h1>
    <p class="lead">
      Выполняем полный цикл работ по устройству полусухой стяжки в квартирах, частных домах и
      коммерческих помещениях. Работаем на немецком оборудовании BMS, используем материалы Knauf,
      Hopе, Lafarge.
    </p>

    <div class="cards">
      <article v-for="service in services" :key="service.title" class="card">
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
        <ul>
          <li v-for="point in service.points" :key="point">{{ point }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Полусухая стяжка под ключ',
    desc: 'От подготовки основания до чистовой шлифовки.',
    points: ['Выезд технолога', 'Доставка материалов', 'Гарантия по договору']
  },
  {
    title: 'Стяжка под тёплый пол',
    desc: 'Монтаж армирования, демпферной ленты, заливка под любой тип отопления.',
    points: ['Водяной и электрический пол', 'Контроль высоты', 'Паспорта работ']
  },
  {
    title: 'Промышленные полы',
    desc: 'Высокопрочные решения для складов, парковок, цехов.',
    points: ['Инженерные расчёты', 'Топпинг и упрочнение', 'Шлифовка и нарезка швов']
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

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.card ul {
  margin: 10px 0 0;
  padding-left: 18px;
  color: #475467;
}
</style>








