<template>
  <div class="quiz-wrapper">
    <div class="quiz-card" v-if="!isSubmitted">
      <div class="quiz-header">
        <h2>Квиз по стяжке пола в Москве</h2>
        <p class="subtitle">Ответьте на 5 вопросов, чтобы получить расчёт стоимости</p>

        <div class="progress">
          <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-text">Шаг {{ currentStep }} из {{ totalSteps }}</div>
      </div>

      <div class="quiz-body">
        <!-- Шаг 1 -->
        <div v-if="currentStep === 1" class="step">
          <h3>На каком объекте нужно сделать стяжку пола?</h3>
          <div class="options">
            <label v-for="option in typeOfObjectOptions" :key="option.value" class="option">
              <input
                type="radio"
                name="type_of_object"
                :value="option.value"
                v-model="form.type_of_object"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <div v-if="form.type_of_object === 'other'" class="field">
            <label class="field-label">Опишите объект</label>
            <input
              type="text"
              v-model="form.type_of_object_other"
              class="input"
              placeholder="Например: складское помещение"
            />
          </div>

          <p v-if="errors.step1" class="error-text">{{ errors.step1 }}</p>
        </div>

        <!-- Шаг 2 -->
        <div v-if="currentStep === 2" class="step">
          <h3>Укажите ориентировочную площадь стяжки пола</h3>

          <div class="field">
            <label class="field-label">Площадь, м²</label>
            <input
              type="number"
              min="1"
              max="1000"
              v-model.number="form.area"
              class="input input-short"
              :disabled="form.area_unknown"
              placeholder="Например: 56"
            />
          </div>

          <label class="checkbox">
            <input type="checkbox" v-model="form.area_unknown" />
            <span>Не знаю точную площадь</span>
          </label>

          <p class="hint">Можно указать примерное значение. Если не уверены, отметьте галочку.</p>
          <p v-if="errors.step2" class="error-text">{{ errors.step2 }}</p>
        </div>

        <!-- Шаг 3 -->
        <div v-if="currentStep === 3" class="step">
          <h3>Какое сейчас состояние пола и какая стяжка интересует?</h3>

          <div class="options options-column">
            <label
              v-for="option in floorConditionOptions"
              :key="option.value"
              class="option option-checkbox"
            >
              <input
                type="checkbox"
                :value="option.value"
                v-model="form.floor_condition"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <p v-if="errors.step3" class="error-text">{{ errors.step3 }}</p>
        </div>

        <!-- Шаг 4 -->
        <div v-if="currentStep === 4" class="step">
          <h3>Когда планируете начинать работы?</h3>

          <div class="options options-column">
            <label
              v-for="option in timeframeOptions"
              :key="option.value"
              class="option"
            >
              <input
                type="radio"
                name="timeframe"
                :value="option.value"
                v-model="form.timeframe"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>

          <p v-if="errors.step4" class="error-text">{{ errors.step4 }}</p>
        </div>

        <!-- Шаг 5 (контакты) -->
        <div v-if="currentStep === 5" class="step">
          <h3>Оставьте контакты для расчёта стоимости</h3>

          <div class="field">
            <label class="field-label">Имя *</label>
            <input
              type="text"
              v-model="form.name"
              class="input"
              placeholder="Ваше имя"
            />
          </div>

          <div class="field">
            <label class="field-label">Телефон *</label>
            <input
              type="tel"
              v-model="form.phone"
              class="input"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div class="field">
            <label class="field-label">Комментарий (необязательно)</label>
            <textarea
              v-model="form.comment"
              class="textarea"
              rows="3"
              placeholder="Например: дом 120 м², тёплый пол в зале и кухне"
            ></textarea>
          </div>

          <label class="checkbox">
            <input type="checkbox" v-model="form.personal_data_agreement" />
            <span>
              Согласен(на) на обработку персональных данных и условия политики конфиденциальности
            </span>
          </label>

          <p v-if="errors.step5" class="error-text">{{ errors.step5 }}</p>

          <p class="small-text">
            Нажимая на кнопку, вы даёте согласие на обработку персональных данных.
          </p>
        </div>
      </div>

      <div class="quiz-footer">
        <button
          class="btn btn-secondary"
          type="button"
          @click="prevStep"
          :disabled="currentStep === 1"
        >
          Назад
        </button>

        <button
          v-if="currentStep < totalSteps"
          class="btn btn-primary"
          type="button"
          @click="nextStep"
        >
          Далее
        </button>

        <button
          v-else
          class="btn btn-primary"
          type="button"
          @click="submitForm"
        >
          Отправить заявку
        </button>
      </div>
    </div>

    <!-- Экран после отправки -->
    <div class="quiz-card submitted" v-else>
      <h2>Спасибо!</h2>
      <p>Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
      <button class="btn btn-primary" type="button" @click="resetQuiz">
        Заполнить ещё раз
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentStep = ref(1);
const totalSteps = 5;
const isSubmitted = ref(false);

const form = ref({
  type_of_object: '',
  type_of_object_other: '',
  area: null,
  area_unknown: false,
  floor_condition: [],
  timeframe: '',
  name: '',
  phone: '',
  comment: '',
  personal_data_agreement: false
});

const errors = ref({
  step1: '',
  step2: '',
  step3: '',
  step4: '',
  step5: ''
});

const typeOfObjectOptions = [
  { value: 'new_flat', label: 'Квартира в новостройке' },
  { value: 'old_flat', label: 'Квартира во вторичном фонде' },
  { value: 'house', label: 'Частный дом / коттедж' },
  { value: 'office', label: 'Офис / коммерческое помещение' },
  { value: 'other', label: 'Другое' }
];

const floorConditionOptions = [
  {
    value: 'standard',
    label: 'Черновой пол, нужна стандартная цементно-песчаная стяжка'
  },
  {
    value: 'uneven',
    label: 'Неровный пол, требуется выравнивание'
  },
  {
    value: 'warm_floor',
    label: 'Стяжка под тёплый пол'
  },
  {
    value: 'fast_dry',
    label: 'Быстросохнущая стяжка'
  },
  {
    value: 'consult',
    label: 'Не знаю, нужен выезд специалиста и консультация'
  }
];

const timeframeOptions = [
  { value: '7_days', label: 'В ближайшие 7 дней' },
  { value: '1_month', label: 'В течение месяца' },
  { value: '1_3_months', label: 'Через 1–3 месяца' },
  { value: 'planning', label: 'Просто уточняю стоимость / планирую на будущее' }
];

const progressPercent = computed(() => (currentStep.value / totalSteps) * 100);

function clearErrors() {
  errors.value = {
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: ''
  };
}

function validateStep(step) {
  clearErrors();

  // Шаг 1
  if (step === 1) {
    if (!form.value.type_of_object) {
      errors.value.step1 = 'Пожалуйста, выберите тип объекта.';
      return false;
    }
    if (
      form.value.type_of_object === 'other' &&
      !form.value.type_of_object_other.trim()
    ) {
      errors.value.step1 = 'Пожалуйста, опишите ваш объект.';
      return false;
    }
  }

  // Шаг 2
  if (step === 2) {
    if (!form.value.area_unknown) {
      if (!form.value.area || form.value.area <= 0) {
        errors.value.step2 = 'Укажите, пожалуйста, примерную площадь в м².';
        return false;
      }
      if (form.value.area > 10000) {
        errors.value.step2 = 'Слишком большая площадь. Уточните данные у менеджера.';
        return false;
      }
    }
  }

  // Шаг 3
  if (step === 3) {
    if (!form.value.floor_condition.length) {
      errors.value.step3 = 'Выберите хотя бы один вариант.';
      return false;
    }
  }

  // Шаг 4
  if (step === 4) {
    if (!form.value.timeframe) {
      errors.value.step4 = 'Пожалуйста, выберите сроки начала работ.';
      return false;
    }
  }

  // Шаг 5
  if (step === 5) {
    if (!form.value.name.trim()) {
      errors.value.step5 = 'Укажите, пожалуйста, имя.';
      return false;
    }

    const phone = form.value.phone.trim();
    const phoneRegex = /^\+7[\s(]?\d{3}[\s)]?\s?\d{3}-?\d{2}-?\d{2}$/;

    if (!phone) {
      errors.value.step5 = 'Укажите, пожалуйста, телефон.';
      return false;
    }

    if (!phoneRegex.test(phone)) {
      errors.value.step5 = 'Введите телефон в формате +7 (XXX) XXX-XX-XX.';
      return false;
    }

    if (!form.value.personal_data_agreement) {
      errors.value.step5 = 'Необходимо согласиться на обработку персональных данных.';
      return false;
    }
  }

  return true;
}

function nextStep() {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < totalSteps) {
      currentStep.value += 1;
    }
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
    clearErrors();
  }
}

function submitForm() {
  if (!validateStep(5)) return;

  // Здесь вы можете отправить данные на сервер
  // Например:
  // await fetch('/api/quiz-floor-screed', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(form.value)
  // });

  console.log('Отправка формы', form.value);
  isSubmitted.value = true;
}

function resetQuiz() {
  form.value = {
    type_of_object: '',
    type_of_object_other: '',
    area: null,
    area_unknown: false,
    floor_condition: [],
    timeframe: '',
    name: '',
    phone: '',
    comment: '',
    personal_data_agreement: false
  };
  clearErrors();
  currentStep.value = 1;
  isSubmitted.value = false;
}
</script>

<style scoped>
.quiz-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  background: #f4f5f7;
  border-radius: 24px;
}

.quiz-card {
  width: 100%;
  max-width: 640px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 20px 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
  box-sizing: border-box;
}

.quiz-card.submitted {
  text-align: center;
}

.quiz-header h2 {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
}

.subtitle {
  margin: 0 0 16px;
  color: #6b7280;
  font-size: 14px;
}

.progress {
  width: 100%;
  background: #e5e7eb;
  border-radius: 999px;
  height: 6px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  transition: width 0.25s ease;
}

.progress-text {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 16px;
}

.quiz-body {
  margin-bottom: 20px;
}

.step h3 {
  margin: 0 0 12px;
  font-size: 18px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.options-column {
  flex-direction: column;
}

.option {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.option:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.07);
}

.option input[type='radio'],
.option input[type='checkbox'] {
  accent-color: #2563eb;
}

.option-checkbox {
  align-items: flex-start;
}

.field {
  margin-bottom: 10px;
}

.field-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
}

.input,
.textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  background: #f9fafb;
}

.input:focus,
.textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
  background: #ffffff;
}

.input-short {
  max-width: 180px;
}

.textarea {
  resize: vertical;
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 6px 0 4px;
  font-size: 13px;
  color: #374151;
}

.checkbox input {
  margin-top: 3px;
  accent-color: #2563eb;
}

.hint {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

.small-text {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}

.error-text {
  color: #b91c1c;
  font-size: 13px;
  margin-top: 8px;
}

.quiz-footer {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.btn {
  border: none;
  border-radius: 999px;
  cursor: pointer;
  padding: 9px 18px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease;
}

.btn-primary {
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
}

.btn-primary:hover {
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.45);
  transform: translateY(-1px);
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn:disabled {
  opacity: 0.6;
  cursor: default;
  box-shadow: none;
  transform: none;
}

@media (max-width: 480px) {
  .quiz-card {
    padding: 18px 14px 16px;
    border-radius: 12px;
  }

  .quiz-footer {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>






