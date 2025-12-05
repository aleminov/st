<template>
  <section class="page-section">
    <h1>Цены на полусухую стяжку</h1>
    <p class="lead">
      Стоимость рассчитывается индивидуально, но ориентироваться можно на базовые тарифы ниже. В цену
      входит доставка смеси, работа бригады и использование нашего оборудования.
    </p>

    <div class="table">
      <div class="table-row table-head">
        <span>Тип работ</span>
        <span>Описание</span>
        <span>Цена от</span>
      </div>
      <div v-for="row in priceRows" :key="row.title" class="table-row">
        <span>{{ row.title }}</span>
        <span>{{ row.desc }}</span>
        <span>{{ row.price }} ₽/м²</span>
      </div>
    </div>

    <div class="note">
      * Точный расчёт зависит от площади, толщины слоя, удалённости от МКАД и дополнительных опций.
      Оставьте заявку, и мы подготовим подробную смету в течение одного рабочего дня.
    </div>
  </section>
</template>

<script setup>
const priceRows = [
  {
    title: 'Стандартная полусухая стяжка',
    desc: 'Слой 40–60 мм, квартиры и коттеджи',
    price: '690'
  },
  {
    title: 'Стяжка под тёплый пол',
    desc: 'Устройство теплоизоляции, армирование',
    price: '780'
  },
  {
    title: 'Быстросохнущая стяжка',
    desc: 'Коммерческие объекты, сокращённые сроки',
    price: '860'
  },
  {
    title: 'Промышленные полы',
    desc: 'Складские и производственные площади',
    price: '950'
  }
];
</script>

<style scoped>
.page-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

.lead {
  margin-bottom: 24px;
  color: #475467;
}

.table {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 1.2fr 2fr 0.8fr;
  gap: 12px;
  padding: 14px 16px;
  align-items: center;
}

.table-head {
  background: #f1f5f9;
  font-weight: 600;
}

.table-row:nth-child(even) {
  background: #f9fafb;
}

.note {
  margin-top: 18px;
  font-size: 13px;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .table-row {
    grid-template-columns: 1fr;
  }
}
</style>








