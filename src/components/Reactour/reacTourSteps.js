const steps = [
    {
        // контейнер TrackerPage
      selector: '[data-tour="step-1"]',
      content: 'Alright, let`s start the tour of Aqua Track!',
    },
    {
        // DailyNorma
      selector: '[data-tour="step-2"]',
      content: 'Here you can see your daily water intake.',
    },
    {
        // ProgressBar
      selector: '[data-tour="step-3"]',
      content:
        'And here you can track your progress in water consumption.',
    },
    {
        // DailyInfo
      selector: '[data-tour="step-4"]',
      content: 'Here you will be able to see the cards of water consumed throughout the day after adding it. The cards can be edited and deleted.',
    },
    {
        // AddButton
      selector: '[data-tour="step-5"]',
      content:
        'And with the help of this button, you can add the amount of water consumed and set the time of this event.',
    },
    {
        // UserBar
      selector: '[data-tour="step-6"]',
      content:
        'Here you can edit your personal information.',
    },
    {
        // Calendar
      selector: '[data-tour="step-7"]',
      content:
        'In the calendar, you can see the progress of water consumption for each day.',
    },
    {
      // контейнер TrackerPage
    selector: '[data-tour="step-8"]',
    content: 'We wish you get the most satisfaction from using our app!',
  },
  ];
  
  export default steps;