<template>
  <div class="auth-page page-layout-margin">
    <h1 class="heading-1 text-center auth-page__title">My Account</h1>

    <div class="auth-tab">
      <button
        class="auth-tab__button heading-3"
        :class="{ 'auth-tab__button--active': currentAuthTab === 'sign-in' }"
        @click="setCurrentAuthTab('sign-in')"
      >
        Sign In
      </button>
      <button
        class="auth-tab__button heading-3"
        :class="{ 'auth-tab__button--active': currentAuthTab === 'register' }"
        @click="setCurrentAuthTab('register')"
      >
        Register
      </button>
    </div>

    <form
      class="auth-form"
      @submit.prevent="onSubmit"
      autocomplete="off"
    >
      <div class="auth-form__section">
        <BaseInput
          v-model="email"
          v-bind="emailProps"
          id="emaillAddress"
          type="text"
          placeholder="Email"
        />
        <small
          v-if="errors.email"
          class="input__error error-text"
          >{{ errors.email }}</small
        >
        <small v-else>noerror</small>
      </div>
      <div class="auth-form__section">
        <BaseInput
          v-model="pass"
          v-bind="passProps"
          id="password"
          type="password"
          placeholder="Password"
        />

        <small class="input__error error-text">{{ errors.pass }}</small>
      </div>
      <div class="auth-form__checkbox">
        <BaseCheckbox
          v-model="rememberMe"
          label="Remember me"
          id="rememberMe"
        />
      </div>
      <div class="auth-form__submit">
        <BaseButton
          v-if="isSubmitting"
          text="Loading"
          variant="solid-black"
          size="large"
        />

        <BaseButton
          v-else
          text="SIGN IN"
          variant="solid-black"
          size="large"
        />
      </div>
    </form>

    <div class="forgot-password text-center">
      <router-link
        :to="{ name: 'forgot-password' }"
        class="navigation__link navigation__link--light heading-5"
      >
        Have you forgotten your password?</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { RouterLink } from "vue-router";

  import { useValidation } from "../utils/validation";

  type AuthSection = "sign-in" | "register";

  const currentAuthTab = ref<AuthSection>("sign-in");
  const setCurrentAuthTab = (value: AuthSection): void => {
    currentAuthTab.value = value;
  };

  const rememberMe = ref(false);

  const { meta, errors, handleSubmit, resetForm, isSubmitting, email, emailProps, pass, passProps } = useValidation();

  const onSubmit = handleSubmit(async values => {
    // Simulates a 1 second delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Need save in store
      alert(`email: ${values.email}, \npassword: ${values.pass}, \nthis fake auth`);
    } catch (error) {
      console.error("An error occurred during submission:", error);
    } finally {
      resetForm();
    }
  });
</script>

<style lang="scss">
  .auth-page {
    max-width: 50rem;

    &__title {
      margin-bottom: 2.4rem;

      @media screen and (min-width: 768px) {
        margin-bottom: 6.4rem;
      }
    }
  }

  .auth-tab {
    background: #efefef;
    border-radius: 0.8rem;
    padding: 0.5rem;
    display: flex;
    margin-bottom: 8.7rem;

    @media screen and (min-width: 768px) {
      margin-bottom: 12.6rem;
    }

    &__button {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      padding: 1.2rem 2.4rem;
      cursor: pointer;
      transition: all 0.2s;

      &--active {
        background: #ffffff;
        box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.1);
        border-radius: 0.8rem;
      }
    }
  }

  .auth-form {
    &__section {
      &:first-child {
        margin-bottom: 4.6rem;
      }
    }

    &__checkbox {
      margin-top: 2.2rem;

      @media screen and (min-width: 768px) {
        margin-top: 1.5rem;
      }
    }

    &__submit {
      margin-top: 1.2rem;
      margin-bottom: 1.6rem;

      @media screen and (min-width: 768px) {
        margin-top: 6.9rem;
        margin-bottom: 1.3rem;
      }
    }
  }
</style>
