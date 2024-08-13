import { TourProvider } from '@reactour/tour';
import useTourSteps from './reacTourSteps.js';
import { tourStyles } from './tourStyles.js';

const handleClickMask = ({ setCurrentStep, currentStep, steps, setIsOpen }) => {
  if (steps) {
    if (currentStep === steps.length - 1) {
      setIsOpen(false);
    }
    setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
  }
};

const TourProviderWrapper = ({ children }) => {
  const steps = useTourSteps();
  // console.log(steps)
  return (
    <TourProvider steps={steps} styles={tourStyles} onClickMask={handleClickMask}>
      {children}
    </TourProvider>
  );
} 

export default TourProviderWrapper;
