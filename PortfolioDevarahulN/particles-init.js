
// Initialize tsparticles with a dynamic color that follows the site's theme
// When the page uses the light theme (body.light), particles use the CSS --accent color
document.addEventListener('DOMContentLoaded', function () {
  if (!window.tsParticles) return;

  const getAccentColor = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    return v ? v.trim() : '#27ae60';
  };

  let currentColor = null;

  async function loadParticles() {
    const color = document.body.classList.contains('light') ? getAccentColor() : '#ffffff';
    if (color === currentColor) return;
    currentColor = color;

    // destroy any existing instance attached to #tsparticles to avoid duplicates
    const existing = tsParticles.dom().find(inst => inst && inst.options && inst.id === 'tsparticles');
    if (existing) existing.destroy();

    await tsParticles.load('tsparticles', {
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
      },
      particles: {
        number: { value: 36, density: { enable: true, area: 800 } },
        color: { value: color },
        shape: { type: 'circle' },
        opacity: { value: 0.12 },
        size: { value: { min: 2, max: 5 } },
        move: { enable: true, speed: 0.8, direction: 'none', outModes: { default: 'out' } }
      },
      detectRetina: true
    });
  }

  // initial load
  loadParticles();

  // observe body class changes (theme toggling) and reload particles when theme changes
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        loadParticles();
        break;
      }
    }
  });
  mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});


