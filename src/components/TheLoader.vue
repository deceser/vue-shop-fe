<template>
  <span class="loader"></span>
</template>

<style lang="scss" scoped>
  .loader {
    width: 148px;
    height: 148px;
    border: 11px dotted var(--dark-gray);
    border-radius: 50%;
    animation: rotation 2s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
