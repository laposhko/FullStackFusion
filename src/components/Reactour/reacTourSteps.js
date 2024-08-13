import { useTranslation } from 'react-i18next';

const useTourSteps = () => {
  const {t} = useTranslation();
  return [
    {
        // контейнер TrackerPage
      selector: '[data-tour="step-1"]',
      content: t('Reactour.step1'),
    },
    {
        // DailyNorma
      selector: '[data-tour="step-2"]',
      content: t('Reactour.step2'),
    },
    {
        // ProgressBar
      selector: '[data-tour="step-3"]',
      content: t('Reactour.step3'),
    },
    {
        // DailyInfo
      selector: '[data-tour="step-4"]',
      content: t('Reactour.step4'),
    },
    {
        // AddButton
      selector: '[data-tour="step-5"]',
      content: t('Reactour.step5'),
    },
    {
        // UserBar
      selector: '[data-tour="step-6"]',
      content: t('Reactour.step6'),
    },
    {
        // Calendar
      selector: '[data-tour="step-7"]',
      content: t('Reactour.step7'),
    },
    {
      // контейнер TrackerPage
    selector: '[data-tour="step-8"]',
    content: t('Reactour.step8'),
  },
  ];
} 
  
  export default useTourSteps;
