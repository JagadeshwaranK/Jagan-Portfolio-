<template>
  <section id="experience" class="experience-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>Work Experience</h2>
      </div>
      
      <div class="experience-timeline" ref="timeline">
        <ExperienceCard 
          v-for="(exp, index) in experiences" 
          :key="index" 
          :experience="exp" 
          :isDarkMode="isDarkMode"
          :class="{ 'visible': isInView }"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ExperienceCard from '../ui/ExperienceCard.vue';

export default {
  name: 'ExperienceSection',
  components: {
    ExperienceCard
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const timeline = ref(null);
    const isInView = ref(false);
    
    // Sample experience data
    const experiences = [
      {
        role: 'Pega Developer',
        company: 'Cognizant Technology Solutions',
        location: 'Chennai, India',
        startYear: '2022',
        endYear: '2024',
        details: [
          'End-to-End Case Life Cycle Development: Designed and implemented processes for diverse applications, ensuring scalability and maintainability.',
          'API Integration: Configured REST APIs and services using REST connectors, seamlessly managing customer records through connectors, endpoint URLs, and Data Transforms.',
          'Data Accuracy Improvement: Enhanced data accuracy by 15% with Data Transforms and Data Pages, streamlining operations for better performance.',
          'Process Reliability: Reduced SLA violations by 10% through the creation and management of Service-Level Agreements (SLAs) with escalation protocols for timely task completion.',
          'User Interface Enhancement: Developed Business Process Flows, Flow Actions, and UI components using CSS, HTML, and JavaScript to improve UI consistency and user experience.',
          'Debugging Expertise: Leveraged tools like Tracer, Live UI, and Clipboard for effective issue resolution, ensuring smooth application operation.',
                  ],
        technologies: ['Pega', 'Agile', 'Java', 'REST API', 'SQL', 'SLA', 'Javascript']
      }
    ];
    
    const checkIfInView = () => {
      if (timeline.value) {
        const rect = timeline.value.getBoundingClientRect();
        const isVisible = 
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && 
          rect.bottom >= 0;
        
        isInView.value = isVisible;
      }
    };
    
    onMounted(() => {
      window.addEventListener('scroll', checkIfInView);
      window.addEventListener('resize', checkIfInView);
      
      // Initial check
      checkIfInView();
    });
    
    onUnmounted(() => {
      window.removeEventListener('scroll', checkIfInView);
      window.removeEventListener('resize', checkIfInView);
    });
    
    return {
      experiences,
      timeline,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.experience-section {
  background-color: dark-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
  }
}

.experience-timeline {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 120px;
    height: 100%;
    width: 2px;
    background-color: $light-border;
    
    
    .dark-mode & {
      background-color: $dark-border;
    }
    
    @media (max-width: $breakpoint-md) {
      left: -5px;
    }
  }
  
  :deep(.experience-card) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
