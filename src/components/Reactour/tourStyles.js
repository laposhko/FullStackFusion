export const tourStyles = {
    popover: (base) => ({
      ...base,
      backgroundColor: '#f0eff4',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    }),
    dot: (base, state) => ({
      ...base,
      backgroundColor: state.current ? '#9be1a0' : 'rgba(47, 47, 47, 0.6)',
    }),
    arrow: (base) => ({
      ...base,
      color: '#323f47',
    }),
    close: (base) => ({
      ...base,
      color: 'rgba(47, 47, 47, 0.6)',
      position: 'absolute',
      top: '10px',
      right: '10px',
    }),
    badge: (base) => ({
      ...base,
      backgroundColor: '#87d28d',
      color: '#fff',
      boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.2)',
    }),
    mask: (base) => ({
      ...base,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  
      opacity: 0.7,  
    }),
    maskArea: (base) => ({
      ...base,
      rx: '8px',
    }),
  };