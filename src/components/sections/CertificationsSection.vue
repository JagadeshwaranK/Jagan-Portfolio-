<template>
  <section id="certifications" class="certifications-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>My Certifications</h2>
      </div>
      
      <div class="certifications-grid">
        <CertificateCard 
          v-for="(cert, index) in certifications"
          :key="index"
          :certificate="cert"
          :isDarkMode="isDarkMode"
          :class="{ 'visible': isInView }"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import CertificateCard from '../ui/CertificateCard.vue';

export default {
  name: 'CertificationsSection',
  components: {
    CertificateCard
  },
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);
    
    // Sample certifications data
    const certifications = [
      {
        name: 'Pega Certified System Architect (PCSA)',
        issuer: 'Pegasystems Inc.',
        date: 'June 2022',
        description: 'Certified in designing and building applications on the Pega Platform, implementing best practices for application development.',
        icon: 'fas fa-certificate',
        credentialUrl: '#'
      },
      {
        name: 'Certified Full Stack Developer',
        issuer: 'Tech Academy',
        date: 'March 2021',
        description: 'Comprehensive certification in full-stack web development covering front-end and back-end technologies.',
        icon: 'fas fa-laptop-code',
        credentialUrl: '#'
      },
      {
        name: 'AWS Certified Developer Associate',
        issuer: 'Amazon Web Services',
        date: 'November 2020',
        description: 'Certification validating expertise in developing, deploying, and debugging cloud-based applications using AWS.',
        icon: 'fab fa-aws',
        credentialUrl: '#'
      },
      {
        name: 'Certified Scrum Master',
        issuer: 'Scrum Alliance',
        date: 'July 2019',
        description: 'Certification in Scrum methodologies, principles, and practices for effective agile project management.',
        icon: 'fas fa-users-cog',
        credentialUrl: '#'
      },
      {
        name: 'UI/UX Design Professional',
        issuer: 'Design Institute',
        date: 'February 2019',
        description: 'Certification in user interface and experience design principles, including wireframing, prototyping, and user testing.',
        icon: 'fas fa-palette',
        credentialUrl: '#'
      }
    ];
    
    const checkIfInView = () => {
      const certSection = document.getElementById('certifications');
      
      if (certSection) {
        const rect = certSection.getBoundingClientRect();
        const isVisible = 
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.7 && 
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
      certifications,
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.certifications-section {
  background-color: darken($light-bg, 2%);
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: darken($dark-bg, 2%);
  }
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: $spacing-xl;
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
  
  :deep(.certificate-card) {
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
