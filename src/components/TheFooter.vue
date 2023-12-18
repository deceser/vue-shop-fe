<template>
  <footer class="footer">
    <div class="footer__top flex items-center space-between">
      <ul class="footer__navigation flex space-between w-100">
        <li
          v-for="link in links"
          :key="link.name"
          class="navigation__item"
        >
          <router-link
            :to="{ name: link.path }"
            class="navigation__link navigation__link--light heading-5 text-uppercase"
          >
            {{ link.name }}</router-link
          >
        </li>
      </ul>
      <form
        class="footer__newsletter w-100 position-relative"
        @submit.prevent="subscribeToNewsletter"
      >
        <BaseInput
          v-model="emailAddress"
          :error="invalidEmailAddress"
          type="text"
          id="newsletter-id"
          placeholder="Give an email, get the newsletter"
          @focus="invalidEmailAddress = false"
        />
        <base-button class="position-absolute footer__submit-button">
          <RightArrowIcon />
        </base-button>
      </form>
    </div>
    <div class="footer__bottom flex space-between">
      <p class="footer__copyright heading-5">
        &copy; {{ currentYear }} Shelly.
        <router-link
          :to="{ name: 'terms-of-service' }"
          class="navigation__link navigation__link--light"
          >Terms of use</router-link
        >
        and
        <router-link
          :to="{ name: 'privacy-policy' }"
          class="navigation__link navigation__link--light"
          >privacy policy</router-link
        >
      </p>
      <ul class="footer__socials w-100 flex items-center space-between">
        <li
          v-for="social in socials"
          :key="social.path"
          class="navigation__item"
        >
          <a
            :href="social.path"
            target="_blank"
            rel="noopener noreferrer"
            class="navigation__link--light"
          >
            <component :is="social.icon" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { RouterLink } from "vue-router";

  import { footerLinks, footerSocials } from "../utils/data/footerLinks";

  import RightArrowIcon from "@/components/icons/IconArrowRight.vue";

  interface FooterLinks {
    name: string;
    path: string;
  }

  interface FooterSocials {
    icon: object;
    path: string;
  }

  const links: FooterLinks[] = footerLinks;
  const socials: FooterSocials[] = footerSocials;

  const currentYear = computed(() => new Date().getFullYear());

  const emailAddress = ref("");
  const invalidEmailAddress = ref(false);
  const subscribeToNewsletter = () => {
    invalidEmailAddress.value = false;

    if (emailAddress.value === "") {
      invalidEmailAddress.value = true;
      return;
    }
  };
</script>

<style lang="scss" scoped>
  @mixin footer-flex($initial-direction) {
    flex-direction: $initial-direction;
    align-items: flex-start;

    @media screen and (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  .footer {
    margin-top: 7.2rem;

    @media screen and (min-width: 768px) {
      border-top: 0.1rem solid var(--light-gray);
      padding: 5.2rem 0 0;
      margin-top: 25rem;
    }

    &__top {
      @include footer-flex(column-reverse);
      gap: 1rem;
      margin-bottom: 3.2rem;

      @media screen and (min-width: 768px) {
        margin-bottom: 4.8rem;
      }
    }

    &__navigation {
      @include footer-flex(column);
      gap: 0.8rem;

      @media screen and (min-width: 768px) {
        max-width: 47.8rem;
      }
    }

    &__submit-button {
      right: 0;
      top: 0.8rem;
    }

    &__newsletter {
      margin-bottom: 4rem;

      @media screen and (min-width: 768px) {
        max-width: 40rem;
        margin-bottom: 0;
      }
    }

    &__bottom {
      @include footer-flex(column-reverse);
    }

    &__socials {
      margin-bottom: 3.6rem;
      max-width: 15.6rem;

      @media screen and (min-width: 768px) {
        margin-bottom: 0;
      }
    }
  }
</style>
