<template>
  <div class="wrapper">
    <Icon
      name="check"
      :color="palette.success"
      size="70"
    />

    <p>
      Obrigado! Recebemos o seu feedback.
    </p>

    <div class="button-wrapper">
      <button @click="goBack">
        Envie mais feedbacks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '@/components/Icon/index.vue';
import { resetStore } from '@/store';
import palette from '../../../palette.js';

interface SetupReturn {
  goBack(): void;
  palette: Record<string, string>;
}

export default defineComponent({
  components: { Icon },
  setup(): SetupReturn {
    function goBack(): void {
      resetStore();
    }

    return {
      goBack,
      palette: palette.brand
    }
  }
});
</script>

<style lang="postcss" scoped>
.wrapper {
  @apply flex flex-col items-center justify-between w-full my-5;
}

p {
  @apply text-xl font-black text-center w-full mt-2;
}

.button-wrapper {
  @apply flex justify-center items-center w-full mt-2;
}

button {
  @apply
    rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center
    py-2 px-5 cursor-pointer focus:outline-none focus:ring-4 ring-brand-success ring-opacity-30
  ;
}
</style>
