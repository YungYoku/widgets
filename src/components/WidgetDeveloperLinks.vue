<template>
  <div class="social-links">
    <button
      v-for="link in links"
      :key="link.href"
      class="social-links__button"
      @click="openLink(link.href)"
    >
      <img
        :alt="link.alt"
        :src="link.image"
        class="social-links__button-img"
      />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import github from "@/assets/img/github.svg";
import telegram from "@/assets/img/telegram.svg";

export default Vue.extend({
  name: "WidgetDeveloperLinks",

  data() {
    return {
      links: [
        {
          image: github,
          alt: "GitHub",
          href: "https://github.com/yungyoku"
        },

        {
          image: telegram,
          alt: "Телеграм",
          href: "https://t.me/yungyoku"
        }
      ]
    };
  },

  methods: {
    openLink(link: string) {
      window.open(link, "_blank");
    }
  }
});
</script>

<style lang="scss" scoped>
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;

  &__button {
    display: block;

    width: 32px;
    height: 32px;
    margin: 0 5px;
    padding: 0;

    text-decoration: none;

    background-color: transparent;
    border: none;

    cursor: pointer;
    transition: all 0.1s;

    &:hover,
    &:focus {
      transform: scale(1.1);
      transition: all 0.1s;
    }

    &-img {
      display: block;

      width: 32px;
      height: 32px;

      pointer-events: none;

      @supports (aspect-ratio: 1 / 1) {
        aspect-ratio: 1 / 1;
      }
    }
  }
}
</style>