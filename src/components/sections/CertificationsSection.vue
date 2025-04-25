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
        //date: 'December 2022',
        description: 'Demonstrated expertise in designing and implementing core Pega Platform features including case design, data modeling, and UI development using Pega best practices.',
        icon: 'fas fa-robot',
        //credentialUrl: '#'
      },
      {
        name: 'Pega Certified Senior System Architect (PCSSA)',
        issuer: 'Pegasystems Inc.',
        //date: 'June 2024',
        description: 'Advanced certification validating skills in complex application design, integration services, and performance optimization on the Pega Platform.',
        icon: 'fas fa-robot',
        //credentialUrl: '#'
      },
      {
        name: 'The Fundamentals of Digital Marketing',
        issuer: 'Google',
       //date: 'March 2021',
        description: 'Certified in essential digital marketing concepts including SEO, content marketing, social media, and analytics through Google\'s interactive learning platform.',
        icon: "fab fa-google",
        //credentialUrl: '#'
      },
      {
        name: 'Data Analytics and Visualization',
        issuer: 'Forage',
        //date: 'November 2020',
        description: 'Hands-on certification covering data analysis techniques, visualization tools, and deriving business insights from complex datasets.',
        icon: "fas fa-chart-line",
        //credentialUrl: '#'
      },
      {
        name: 'Generative AI Fundamentals',
        issuer: 'Cognizant',
        //date: 'July 2019',
        description: 'Comprehensive understanding of generative AI concepts, applications, and ethical considerations in enterprise environments.',
        icon: 'fas fa-brain',
        //credentialUrl: '#'
      },
      {
        name: 'SQL',
        issuer: 'Udemy',
        //date: 'February 2019',
        description: 'Certification in database management, complex query writing, and data manipulation using Structured Query Language (SQL).',
        icon: 'fas fa-database',
        //credentialUrl: '#'
      },
      {
        name: 'Agile methodology and Jira software tool',
        issuer: 'KARE',
        //date: 'February 2019',
        description: 'Practical certification in Agile project management methodologies and proficient use of Jira for sprint planning, tracking, and reporting.',
        icon: 'fab fa-jira',
        //credentialUrl: '#'
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
  background-color: dark-bg;
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
