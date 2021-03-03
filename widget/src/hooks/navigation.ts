import useStore from './store';
import { setCurrentComponent, setFeebackType } from '@/store';

export interface Navigation {
  next(): void;
  back(): void;
  setErrorState(): void;
  setSuccessState(): void;
}

export default function useNavigation(): Navigation {
  const store = useStore();

  function next(): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback');
    }
  }

  function back(): void {
    if(store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType');
      setFeebackType('');
    }
  }

  function setErrorState(): void {
    setCurrentComponent('Error');
  }

  function setSuccessState(): void {
    setCurrentComponent('Success');
  }

  return { next, back, setErrorState, setSuccessState }
}
