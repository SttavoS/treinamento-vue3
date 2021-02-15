import { reactive, readonly } from 'vue';

export type StoreState = {
  currentComponent: string;
  message: string;
  feedbackType: string;
  fingerprint: string;
  apiKey: string;
  currentPage: string;
};

const initialState: StoreState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<StoreState>({ ...initialState });

export function setCurrentComponent(component: string): void {
  state.currentComponent = component;
}

export function setMessage(message: string): void {
  state.message = message;
}

export function setFeebackType(feedbackType: string): void {
  state.feedbackType = feedbackType;
}

export function setFingerprint(fingerprint: string): void {
  state.fingerprint = fingerprint;
}

export function setApiKey(apiKey: string): void {
  state.apiKey = apiKey;
}

export function setCurrentPage(page: string): void {
  state.currentPage = page;
}

export function resetStore(): void {
  setCurrentComponent(initialState.currentComponent);
  setMessage(initialState.message);
  setFeebackType(initialState.feedbackType);
  setFingerprint(initialState.fingerprint);
  setApiKey(initialState.apiKey);
  setCurrentPage(initialState.currentPage);
}

export default readonly(state);
