<template>
  <div class="portfolio-app" :class="{ 'dark-mode': isDarkMode }">
    <TheNavbar :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
    
    <main ref="mainContent">
      <HomeSection id="home" ref="homeSection" />
      <AboutSection id="about" ref="aboutSection" />
      <ExperienceSection id="experience" ref="experienceSection" />
      <SkillsSection id="skills" ref="skillsSection" />
      <CertificationsSection id="certifications" ref="certificationsSection" />
      <ContactSection id="contact" ref="contactSection" />
    </main>
    
    <TheFooter :isDarkMode="isDarkMode" />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import TheNavbar from './components/TheNavbar.vue';
import TheFooter from './components/TheFooter.vue';
import HomeSection from './components/sections/HomeSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import CertificationsSection from './components/sections/CertificationsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter,
    HomeSection,
    AboutSection,
    ExperienceSection,
    SkillsSection,
    CertificationsSection,
    ContactSection
  },
  setup() {
    const isDarkMode = ref(false); // Force light mode by default
    const mainContent = ref(null);
    const homeSection = ref(null);
    const aboutSection = ref(null);
    const experienceSection = ref(null);
    const skillsSection = ref(null);
    const certificationsSection = ref(null);
    const contactSection = ref(null);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
    };

    onMounted(() => {
      // Setup smooth scrolling
    //   setupSmoothScrolling([
    //     homeSection.value,
    //     aboutSection.value,
    //     experienceSection.value,
    //     skillsSection.value,
    //     certificationsSection.value,
    //     contactSection.value
    // ], mainContent.value);
    });

    // Update body class when dark mode changes
    watch(isDarkMode, (newValue) => {
      if (newValue) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
    }, { immediate: true });

    return {
      isDarkMode,
      toggleDarkMode,
      mainContent,
      homeSection,
      aboutSection,
      experienceSection,
      skillsSection,
      certificationsSection,
      contactSection
    };
  }
};
</script>

<style lang="scss">
@import './assets/styles/variables';

.portfolio-app {
  min-height: 100vh;
  transition: background-color $transition-normal, color $transition-normal;
}

.dark-mode {
  background-color: $dark-bg;
  color: $dark-text;
}
</style>