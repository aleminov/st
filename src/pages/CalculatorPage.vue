<template>
  <section class="calculator-section">
    <div class="calc-card">
      <h1>Калькулятор полусухой стяжки</h1>
      <p class="calc-subtitle">Заполните данные</p>

      <div class="calc-grid">
        <label class="calc-row">
          <div class="calc-label">
            <span>1. Площадь под стяжку</span>
            <span class="calc-hint">от 30 м²</span>
          </div>
          <input type="number" min="30" v-model.number="calcForm.area" placeholder="Сколько метров?" />
        </label>

        <label class="calc-row">
          <div class="calc-label">
            <span>2. Средняя толщина</span>
            <span class="calc-hint">от 40 мм</span>
          </div>
          <input
            type="number"
            min="30"
            v-model.number="calcForm.thickness"
            placeholder="Толщина в мм?"
          />
        </label>

        <label class="calc-row">
          <div class="calc-label">
            <span>3. Этаж объекта</span>
            <span class="calc-hint">до 30 этажей</span>
          </div>
          <input type="number" min="1" max="30" v-model.number="calcForm.floor" placeholder="Какой этаж?" />
        </label>

        <label class="calc-row">
          <div class="calc-label">
            <span>4. Расстояние</span>
            <span class="calc-hint">от МКАД, км</span>
          </div>
          <input
            type="number"
            min="0"
            v-model.number="calcForm.distance"
            placeholder="Расстояние от МКАД"
          />
        </label>
      </div>

      <div class="calc-extra">
        <div class="calc-extra-title">Дополнительные параметры</div>
        <div class="calc-extra-grid">
          <label class="calc-radio">
            <input type="radio" value="standard" v-model="calcMixType" />
            <div>
              <div>Стандартная</div>
              <span>оптимальная смесь</span>
            </div>
          </label>
          <label class="calc-radio">
            <input type="radio" value="soundproof" v-model="calcMixType" />
            <div>
              <div>С шумоизоляцией</div>
              <span>дополнительный слой</span>
            </div>
          </label>
          <label class="calc-checkbox">
            <input type="checkbox" v-model="calcExtras.manual" />
            <span>Ручная подача</span>
          </label>
          <label class="calc-checkbox">
            <input type="checkbox" v-model="calcExtras.mesh" />
            <span>Армирование сеткой</span>
          </label>
        </div>
      </div>

      <p v-if="calcError" class="calc-error">{{ calcError }}</p>

      <button class="calc-submit" type="button" @click="calculateCost">Рассчитать стоимость</button>

      <div v-if="calcResult" class="calc-result">
        <div class="calc-total">
          Ориентировочная стоимость:
          <strong>{{ formatCurrency(calcResult.total) }} ₽</strong>
        </div>
        <div class="calc-rate">≈ {{ formatCurrency(calcResult.ratePerM2) }} ₽ за м²</div>
        <ul class="calc-breakdown">
          <li>Материалы: {{ formatCurrency(calcResult.materials) }} ₽</li>
          <li>Работы: {{ formatCurrency(calcResult.labor) }} ₽</li>
          <li>Логистика и этажность: {{ formatCurrency(calcResult.logistics) }} ₽</li>
          <li>Доп. опции: {{ formatCurrency(calcResult.extras) }} ₽</li>
        </ul>
        <p class="calc-note">
          Расчёт предварительный. Менеджер уточнит детали и подберёт точную смету под ваш объект.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const calcForm = ref({
  area: 80,
  thickness: 45,
  floor: 2,
  distance: 0
});

const calcMixType = ref('standard');
const calcExtras = ref({
  manual: false,
  mesh: false
});

const calcResult = ref(null);
const calcError = ref('');

function calculateCost() {
  calcError.value = '';
  const area = Number(calcForm.value.area);
  const thickness = Number(calcForm.value.thickness);
  const floor = Number(calcForm.value.floor);
  const distance = Number(calcForm.value.distance);

  if (!area || area < 30) {
    calcError.value = 'Минимальная площадь для расчёта — 30 м².';
    return;
  }
  if (!thickness || thickness < 30) {
    calcError.value = 'Толщина должна быть не меньше 30 мм.';
    return;
  }
  if (!floor || floor < 1) {
    calcError.value = 'Укажите этаж объекта.';
    return;
  }
  if (floor > 30) {
    calcError.value = 'Мы считаем объекты до 30 этажей.';
    return;
  }

  let ratePerM2 = 650;
  if (area < 60) ratePerM2 += 120;
  if (area > 150) ratePerM2 -= 70;
  ratePerM2 += Math.max(0, thickness - 40) * 3;

  const logisticPerM2 = Math.max(0, floor - 3) * 5 + Math.max(0, distance) * 0.7;
  let extrasPerM2 = 0;

  if (calcMixType.value === 'soundproof') extrasPerM2 += 140;
  if (calcExtras.value.manual) extrasPerM2 += 60;
  if (calcExtras.value.mesh) extrasPerM2 += 80;

  const effectiveRate = Math.round(ratePerM2 + logisticPerM2 + extrasPerM2);
  const total = Math.round(effectiveRate * area);

  calcResult.value = {
    total,
    ratePerM2: effectiveRate,
    materials: Math.round(total * 0.62),
    labor: Math.round(total * 0.25),
    logistics: Math.round(logisticPerM2 * area),
    extras: Math.round(extrasPerM2 * area)
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}
</script>

<style scoped>
.calculator-section {
  width: 100%;
  max-width: 820px;
  margin: 0 auto 48px;
  padding: 32px 16px 48px;
}

.calc-card {
  background: #fff;
  border-radius: 18px;
  padding: 28px 32px 32px;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.12);
  border: 1px solid #e5e7eb;
}

.calc-card h1 {
  margin: 0;
  text-align: center;
}

.calc-subtitle {
  text-align: center;
  color: #6b7280;
  margin: 6px 0 22px;
}

.calc-grid {
  display: grid;
  gap: 12px;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px 16px;
  gap: 16px;
}

.calc-row input {
  width: 200px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
}

.calc-label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #0f172a;
  font-size: 14px;
}

.calc-hint {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 400;
}

.calc-extra {
  margin-top: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #f1f5f9;
}

.calc-extra-title {
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  padding: 10px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #475467;
  letter-spacing: 0.06em;
}

.calc-extra-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  padding: 14px;
}

.calc-radio,
.calc-checkbox {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  font-size: 14px;
  color: #0f172a;
}

.calc-radio span {
  font-size: 12px;
  color: #94a3b8;
}

.calc-error {
  color: #dc2626;
  margin: 12px 0 0;
  text-align: center;
  font-size: 13px;
}

.calc-submit {
  width: 100%;
  margin-top: 18px;
  border: none;
  border-radius: 12px;
  background: #ef4444;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 14px 18px;
  cursor: pointer;
  box-shadow: 0 12px 20px rgba(239, 68, 68, 0.35);
}

.calc-result {
  margin-top: 20px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  padding: 18px;
}

.calc-total {
  font-size: 18px;
  margin-bottom: 6px;
}

.calc-rate {
  color: #2563eb;
  font-weight: 600;
  margin-bottom: 10px;
}

.calc-breakdown {
  margin: 0 0 10px;
  padding-left: 18px;
  color: #475467;
  font-size: 14px;
}

.calc-note {
  font-size: 12px;
  color: #94a3b8;
  margin: 0;
}

@media (max-width: 980px) {
  .calc-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .calc-row input {
    width: 100%;
  }

  .calc-extra-grid {
    grid-template-columns: 1fr;
  }
}
</style>






