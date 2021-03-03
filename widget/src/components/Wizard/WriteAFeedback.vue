<template>
  <div class="wizard-wrapper">
    <textarea
      v-model="state.feedback"
      class="wizard-input-field"
    >
    </textarea>
    <button
      :disabled="submitButtonIsDisabled"
      :class="{
        'opacity-50': state.isLoading,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
        'bg-brand-main text-white': !submitButtonIsDisabled
      }"
      @click="submitAFeedback"
      class="wizard-button"
    >
      <Icon v-if="state.isLoading" name="loading" class="animate-spin" color="white" />
      <template v-else>Enviar Feedback</template>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, reactive } from 'vue';
import Icon from '@/components/Icon/index.vue';
import useNavigation from '@/hooks/navigation';
import useStore from '@/hooks/store';
import services from '@/services';
import { setMessage } from '@/store';

type State = {
  feedback: string;
  isLoading: boolean;
  hasError: Error | null;
}

interface SetupReturn {
  state: State;
  submitButtonIsDisabled: ComputedRef<boolean>;
  submitAFeedback(): Promise<void>;
}

export default defineComponent({
  components: { Icon },
  setup(): SetupReturn {
    const store = useStore();
    const { setSuccessState, setErrorState } = useNavigation();
    const state = reactive<State>({
      feedback: '',
      isLoading: false,
      hasError: null
    });

    const submitButtonIsDisabled = computed<boolean>(() => {
      return !state.feedback.length;
    });

    function handleError(error: Error) {
      state.hasError = error;
      state.isLoading = false;
      setErrorState();
    }

    async function submitAFeedback(): Promise<void> {
      setMessage(state.feedback);
      state.isLoading = true;

      try {
        const response = await services.feedbacks.create({
          type: store.feedbackType,
          text: store.message,
          page: store.currentPage,
          apiKey: store.apiKey,
          device: window.navigator.userAgent,
          fingerprint: store.fingerprint
        });

        if (!response.errors) {
          setSuccessState();
        } else {
          setErrorState();
        }

        state.isLoading = false;
      } catch (error) {
        handleError(error);
      }
    }

    return {
      state,
      submitButtonIsDisabled,
      submitAFeedback
    }
  }
});
</script>

<style lang="postcss" scoped>
.wizard-wrapper {
  @apply flex flex-col items-center justify-center w-full my-5;
}

.wizard-input-field {
  @apply
    w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2
    resize-none focus:outline-none focus:ring-4 ring-brand-main ring-opacity-50
  ;
}

.wizard-button {
  @apply
    rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer
    focus:outline-none focus:ring-4 ring-brand-main ring-opacity-50 transition-all duration-200
  ;
}
</style>
