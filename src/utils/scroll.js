/**
 * Sets up smooth scrolling between sections
 * @param {Array} sections - Array of section ref elements
 */
export function setupSmoothScrolling(sections) {
  // Filter out any null sections
  const validSections = sections.filter(section => section);

  // If we don't have at least 2 sections, we can't do sequential scrolling
  if (validSections.length < 2) {
    console.warn('Not enough valid sections to setup smooth scrolling');
    return;
  }

  let isScrolling = false;
  let currentSectionIndex = 0;
  let touchStartY = 0;

  // Function to get the element's offset from the top of the page
  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  };

  // Function to detect which section is currently in view
  const detectCurrentSection = () => {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + (windowHeight / 2);

    for (let i = 0; i < validSections.length; i++) {
      const sectionTop = getOffset(validSections[i].$el);
      const sectionBottom = sectionTop + validSections[i].$el.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = i;
        break;
      }
    }
  };

  // Function to scroll to a specific section
  const scrollToSection = (index) => {
    if (index < 0) index = 0;
    if (index >= validSections.length) index = validSections.length - 1;

    isScrolling = true;
    currentSectionIndex = index;

    validSections[index].$el.scrollIntoView({
      behavior: 'smooth',
    });

    // Reset the flag after animation is likely complete
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  // Wheel event handler
  const handleWheel = (e) => {
    if (isScrolling) return;
    e.preventDefault();

    detectCurrentSection();

    if (e.deltaY > 0) {
      // Scrolling down
      scrollToSection(currentSectionIndex + 1);
    } else {
      // Scrolling up
      scrollToSection(currentSectionIndex - 1);
    }
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    detectCurrentSection();

    // Using a threshold to determine if the swipe was intentional
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe up (go down)
        scrollToSection(currentSectionIndex + 1);
      } else {
        // Swipe down (go up)
        scrollToSection(currentSectionIndex - 1);
      }
    }
  };

  // Key events for keyboard navigation
  const handleKeyDown = (e) => {
    if (isScrolling) return;

    detectCurrentSection();

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(currentSectionIndex - 1);
    }
  };

  // Add event listeners
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
  window.addEventListener('keydown', handleKeyDown);

  // Initial detection of current section
  window.addEventListener('load', detectCurrentSection);
  window.addEventListener('resize', detectCurrentSection);

  // Cleanup function to remove event listeners
  return () => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('load', detectCurrentSection);
    window.removeEventListener('resize', detectCurrentSection);
  };
}
