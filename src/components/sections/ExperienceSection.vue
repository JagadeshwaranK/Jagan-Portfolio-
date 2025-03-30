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
        role: 'Senior Pega Developer',
        company: 'Tech Solutions Inc.',
        location: 'New York, NY',
        startYear: '2020',
        endYear: null, // null for present
        details: [
          'Led a team of 5 developers in implementing Pega Platform solutions for enterprise clients',
          'Designed and developed customer service applications that improved efficiency by 35%',
          'Implemented CI/CD pipelines for Pega applications to streamline deployment',
          'Collaborated with stakeholders to gather requirements and translate them into technical specifications'
        ],
        technologies: ['Pega', 'Agile', 'Java', 'REST API', 'SQL']
      },
      {
        role: 'Pega Developer',
        company: 'Global Systems Ltd.',
        location: 'Boston, MA',
        startYear: '2018',
        endYear: '2020',
        details: [
          'Developed Pega applications for banking and financial services clients',
          'Created reusable components that reduced development time by 25%',
          'Performed system analysis and performance optimization',
          'Conducted knowledge transfer sessions for junior developers'
        ],
        technologies: ['Pega', 'JavaScript', 'HTML/CSS', 'Oracle DB']
      },
      {
        role: 'Software Engineer',
        company: 'Innovative Software',
        location: 'San Francisco, CA',
        startYear: '2016',
        endYear: '2018',
        details: [
          'Developed full-stack web applications using modern JavaScript frameworks',
          'Implemented responsive user interfaces for client applications',
          'Participated in code reviews and maintained coding standards',
          'Assisted in migrating legacy systems to modern architectures'
        ],
        technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS']
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
  background-color: darken($light-bg, 2%);
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: darken($dark-bg, 2%);
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
      left: 20px;
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
