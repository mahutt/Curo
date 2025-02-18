const getTabName = (tab: string) => {
  switch (tab) {
    case 'reminders':
      return 'Reminders'
    case 'medication':
      return 'Medication'
    case 'hcp':
      return 'Healthcare Providers'
  }
}

export { getTabName }
