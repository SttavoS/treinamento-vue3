<template>
  <span
    :class="`bg-${badgeColor}`"
    class="p-2 text-xs font-black text-white uppercase rounded-full"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    type: { type: String, required: true }
  },
  setup(props) {
    const label = computed(() => {
      if (props.type === 'ISSUE') {
        return 'problema';
      }

      if (props.type === 'IDEA') {
        return 'ideia';
      }

      return 'outros';
    });

    const badgeColor = computed(() => {
      if (props.type === 'ISSUE') {
        return 'brand-danger';
      }

      if (props.type === 'IDEA') {
        return 'brand-warning';
      }

      return 'brand-graydark';
    });

    return {
      label,
      badgeColor
    };
  }
};
</script>
