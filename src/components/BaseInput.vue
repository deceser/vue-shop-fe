<template>
  <div class="input position-relative w-100">
    <label
      v-if="!!label"
      :for="id"
      class="input__label"
      >{{ label }}</label
    >
    <input
      class="input__field"
      autocomplete="current-password"
      :value="modelValue"
      :type="type"
      :name="id"
      :id="id"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus')"
    />
    <small
      v-if="error"
      class="input__error position-absolute block error-text"
      >Required field</small
    >
  </div>
</template>

<script setup lang="ts">
  interface Props {
    id: string;
    type: string;
    label?: string;
    modelValue: string | number | undefined;
    placeholder?: string;
    error?: boolean;
  }

  defineProps<Props>();
  defineEmits(["update:modelValue", "focus"]);
</script>
