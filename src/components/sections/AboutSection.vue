<template>
  <section id="about" class="about-section" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="section-title">
        <h2>About Me</h2>
      </div>
      
      <div class="about-content">
        <div class="about-image" :class="{ 'visible': isInView }">
          <div class="image-container">
            <!-- Replace with actual SVG or use an image placeholder from CDN -->
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="profile-placeholder">
              <circle cx="100" cy="70" r="50" fill="#6c63ff" />
              <rect x="40" y="120" width="120" height="60" rx="10" fill="#6c63ff" />
              <circle cx="80" cy="70" r="10" fill="white" />
              <circle cx="120" cy="70" r="10" fill="white" />
              <path d="M80 90 Q100 110 120 90" stroke="white" stroke-width="4" fill="none" />
            </svg>
          </div>
        </div>
        
        <div class="about-text" :class="{ 'visible': isInView }">
          <h3>Hello, I'm <span class="highlight">Your Name</span></h3>
          <p class="subtitle">Pega Developer & Software Engineer</p>
          
          <p>
            I'm a passionate software engineer and Pega developer with expertise in creating 
            robust, user-friendly applications. With a strong foundation in software design principles
            and a keen eye for detail, I strive to develop solutions that are not only functional
            but also intuitive and elegant.
          </p>
          
          <p>
            My journey in technology began with a curiosity about how digital solutions can solve 
            real-world problems. This curiosity has evolved into a career where I continuously 
            learn and adapt to emerging technologies and methodologies.
          </p>
          
          <div class="personal-info">
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <span>youremail@example.com</span>
            </div>
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <span>+1234567890</span>
            </div>
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Your Location</span>
            </div>
          </div>
          
          <div class="about-actions">
            <a href="#contact" class="btn">Get In Touch</a>
            <a href="#" class="btn btn-outline">Download CV</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'AboutSection',
  props: {
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const isInView = ref(false);
    
    const checkIfInView = () => {
      const aboutSection = document.getElementById('about');
      
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
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
      isInView
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.about-section {
  background-color: $light-bg;
  transition: background-color $transition-normal;
  
  &.dark-mode {
    background-color: $dark-bg;
    
    .profile-placeholder {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .highlight {
      color: lighten($primary-color, 10%);
    }
    
    .info-item {
      i {
        color: lighten($primary-color, 10%);
      }
      
      span {
        color: $dark-secondary-text;
      }
    }
  }
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-xxl;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.about-image {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .image-container {
    width: 80%;
    max-width: 400px;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow-lg;
    position: relative;
    transition: transform $transition-normal;
    
    &:hover {
      transform: translateY(-10px);
    }
    
    .profile-placeholder {
      width: 100%;
      height: auto;
      display: block;
      background-color: #f8f9fa;
      box-shadow: 0 10px 30px rgba(100, 100, 100, 0.2);
      border-radius: $border-radius-lg;
    }
  }
}

.about-text {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  h3 {
    font-size: $font-size-xl;
    margin-bottom: $spacing-sm;
    
    .highlight {
      color: $primary-color;
      font-weight: 700;
    }
  }
  
  .subtitle {
    font-size: $font-size-lg;
    color: $light-secondary-text;
    margin-bottom: $spacing-lg;
    font-weight: 500;
    
    .dark-mode & {
      color: $dark-secondary-text;
    }
  }
  
  p {
    margin-bottom: $spacing-md;
    line-height: 1.8;
  }
}

.personal-info {
  margin: $spacing-xl 0;
  
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-md;
    
    i {
      width: 30px;
      color: $primary-color;
      font-size: $font-size-lg;
    }
    
    span {
      color: $light-secondary-text;
    }
  }
}

.about-actions {
  display: flex;
  gap: $spacing-md;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: $spacing-sm;
    
    .btn {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
