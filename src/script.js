    function toggleMobileMenu() {
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('menuOverlay');
        const mainContent = document.getElementById('main-content');

        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            overlay.classList.remove('hidden');
            
            if(mainContent) mainContent.classList.add('blur-sm', 'pointer-events-none');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            overlay.classList.add('hidden');
            
            if(mainContent) mainContent.classList.remove('blur-sm', 'pointer-events-none');
        }
    }


  function setupDropdown(btnId, dropdownId) {
    const btn = document.getElementById(btnId);
    const dropdown = document.getElementById(dropdownId);
    const arrow = btn.querySelector('svg:last-child');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdown.classList.contains('hidden');

      document.querySelectorAll('[id$="-dropdown"]').forEach(d => {
        if (d.id !== dropdownId) {
          d.classList.add('hidden', 'opacity-0', 'translate-y-4');
          const otherBtn = document.getElementById(d.id.replace('dropdown', 'btn'));
          otherBtn.querySelector('svg:last-child').classList.remove('rotate-180');
        }
      });

      if (isHidden) {
        dropdown.classList.remove('hidden');
        setTimeout(() => {
          dropdown.classList.remove('opacity-0', 'translate-y-4');
          arrow.classList.add('rotate-180');
        }, 10);
      } else {
        dropdown.classList.add('opacity-0', 'translate-y-4');
        arrow.classList.remove('rotate-180');
        setTimeout(() => dropdown.classList.add('hidden'), 300);
      }
    });
  }

  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const targetBtnId = this.getAttribute('data-target');
      const btn = document.getElementById(targetBtnId);
      const span = btn.querySelector('span');
      const dropdown = this.closest('[id$="-dropdown"]');
      const arrow = btn.querySelector('svg:last-child');

      span.innerText = this.innerText;
      span.classList.remove('text-gray-400');
      span.classList.add('text-white');

      dropdown.classList.add('opacity-0', 'translate-y-4');
      arrow.classList.remove('rotate-180');
      setTimeout(() => dropdown.classList.add('hidden'), 300);
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('[id$="-dropdown"]').forEach(d => {
      d.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => d.classList.add('hidden'), 300);
    });
    document.querySelectorAll('button[id$="-btn"] svg:last-child').forEach(arrow => {
      arrow.classList.remove('rotate-180');
    });
  });

  setupDropdown('year-btn', 'year-dropdown');
  setupDropdown('event-btn', 'event-dropdown');

  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      const type = this.dataset.type;
      const text = this.innerText;
      const targetBtn = type === 'year' ? yearBtn : eventBtn;
      const span = targetBtn.querySelector('span');

      span.innerText = text;
      span.classList.remove('text-gray-400');
      span.classList.add('text-white');

      updateClearButton();
      this.closest('[id$="-dropdown"]').classList.add('hidden', 'opacity-0', 'translate-y-4');
    });
  });

  function updateClearButton() {
    const yearVal = yearBtn.querySelector('span').innerText.toUpperCase();
    const eventVal = eventBtn.querySelector('span').innerText.toUpperCase();
    
    const isYearSet = yearVal !== 'SELECT YEAR' && yearVal !== 'ALL';
    const isEventSet = eventVal !== 'SELECT EVENTS' && eventVal !== 'ALL';

    if (isYearSet || isEventSet) {
      clearAllBtn.classList.remove('hidden');
    } else {
      clearAllBtn.classList.add('hidden');
    }
  }

  clearAllBtn.onclick = () => {
    yearBtn.querySelector('span').innerText = 'Select Year';
    yearBtn.querySelector('span').classList.add('text-gray-400');
    eventBtn.querySelector('span').innerText = 'Select Events';
    eventBtn.querySelector('span').classList.add('text-gray-400');
    clearAllBtn.classList.add('hidden');
  };

  window.onclick = () => [yearDropdown, eventDropdown].forEach(d => d.classList.add('hidden', 'opacity-0', 'translate-y-4'));


function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const isOpen = !dropdown.classList.contains('hidden');
    
    document.getElementById('year-dropdown').classList.add('hidden');
    document.getElementById('year-dropdown').style.opacity = "0";
    document.getElementById('event-dropdown').classList.add('hidden');
    document.getElementById('event-dropdown').style.opacity = "0";

    if (!isOpen) {
        dropdown.classList.remove('hidden');
        setTimeout(() => {
            dropdown.style.opacity = "1";
            dropdown.style.transform = "translateY(0)";
        }, 10);
    }
}

let activeFilters = { year: 'all', event: 'all' };

document.querySelectorAll('.filter-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const value = this.getAttribute('data-value');
        activeFilters[type] = value;

        const btnText = document.querySelector(`#${type}-btn span`);
        btnText.innerText = value === 'all' ? `Select ${type.charAt(0).toUpperCase() + type.slice(1)}` : value;

        toggleDropdown(`${type}-dropdown`);

        document.querySelectorAll('.gallery-item').forEach(item => {
            const matchesYear = activeFilters.year === 'all' || item.getAttribute('data-year') === activeFilters.year;
            const matchesEvent = activeFilters.event === 'all' || item.getAttribute('data-event') === activeFilters.event;

            if (matchesYear && matchesEvent) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 400);
            }
        });
    });
});




let currentYear = 'all';
let currentEvent = 'all';

// Keep your exact toggle animation logic
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const otherId = id === 'year-dropdown' ? 'event-dropdown' : 'year-dropdown';
    const otherDropdown = document.getElementById(otherId);
    
    // Close other dropdown immediately
    otherDropdown.classList.add('hidden');
    otherDropdown.style.opacity = '0';
    otherDropdown.style.transform = 'translateY(1rem)';
    
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
        setTimeout(() => {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        }, 10);
    } else {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(1rem)';
        setTimeout(() => dropdown.classList.add('hidden'), 300);
    }
}

// Handling filter selection
document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const value = this.getAttribute('data-value');
        
        if (type === 'year') currentYear = value;
        if (type === 'event') currentEvent = value;
        
        // Update Button Text to reflect selection
        const btnId = type === 'year' ? 'year-btn' : 'event-btn';
        const defaultText = type === 'year' ? 'Select Year' : 'Select Events';
        document.querySelector(`#${btnId} span`).innerText = value === 'all' ? defaultText : value;
        
        applyFilters();
        toggleDropdown(type + '-dropdown');
    });
});

function applyFilters() {
    const items = document.querySelectorAll('.gallery-item');
    const clearBtn = document.getElementById('clear-filters');
    
    // Toggle Clear Button Visibility
    if (currentYear !== 'all' || currentEvent !== 'all') {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }

    items.forEach(item => {
        const itemYear = item.getAttribute('data-year');
        const itemEvent = item.getAttribute('data-event');
        
        const yearMatch = currentYear === 'all' || itemYear === currentYear;
        const eventMatch = currentEvent === 'all' || itemEvent === currentEvent;
        
        if (yearMatch && eventMatch) {
            // Use flex instead of removing hidden class to preserve Masonry flow
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            // Delay display none so fade out animation works
            setTimeout(() => {
                if(item.style.opacity === '0') item.style.display = 'none';
            }, 300);
        }
    });
}

function clearAllFilters() {
    currentYear = 'all';
    currentEvent = 'all';
    document.querySelector('#year-btn span').innerText = 'Select Year';
    document.querySelector('#event-btn span').innerText = 'Select Events';
    applyFilters();
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.closest('.relative')) {
        document.querySelectorAll('[id$="-dropdown"]').forEach(d => {
            d.style.opacity = '0';
            d.style.transform = 'translateY(1rem)';
            setTimeout(() => d.classList.add('hidden'),300);
        });
    }
}
