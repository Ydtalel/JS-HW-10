const tooltips = document.querySelectorAll('.has-tooltip');

tooltips.forEach(tooltip => {
  tooltip.addEventListener('click', (e) => {
    e.preventDefault();
    const tooltipText = tooltip.getAttribute('title');
    const tooltipPosition = tooltip.getAttribute('data-position');

    let tooltipElement = document.querySelector('.tooltip');
    if (!tooltipElement) {
      tooltipElement = document.createElement('div');
      tooltipElement.classList.add('tooltip');
      document.body.appendChild(tooltipElement);
    }

    tooltipElement.textContent = tooltipText;
    tooltipElement.classList.add('tooltip_active');

    const rect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipElement.offsetWidth;
    const tooltipHeight = tooltipElement.offsetHeight;

    let left, top;

    switch (tooltipPosition) {
      case 'top':
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.top - tooltipHeight;
        break;
      case 'left':
        left = rect.left - tooltipWidth;
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'right':
        left = rect.right;
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        break;
      case 'bottom':
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.bottom;
        break;
      default:
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        top = rect.top - tooltipHeight;
    }

    tooltipElement.style.left = left + 'px';
    tooltipElement.style.top = top + 'px';
  });
});
