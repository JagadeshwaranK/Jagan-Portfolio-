<template>
  <div class="scrolling-skills" :class="{ 'dark-mode': isDarkMode }">
    <div class="skills-track" ref="track">
      <div class="skills-slide" v-for="(group, groupIndex) in groupedSkills" :key="groupIndex">
        <div class="skill-item" v-for="(skill, skillIndex) in group" :key="`${groupIndex}-${skillIndex}`">
          <div class="skill-icon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skill-name">{{ skill.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ScrollingSkills',
  props: {
    skills: {
      type: Array,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      default: false
    },
    itemsPerGroup: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const track = ref(null);
    let animationId = null;
    let currentPosition = 0;
    let direction = 1; // 1 for right-to-left, -1 for left-to-right
    
    // Group skills for better animation control
    const groupedSkills = computed(() => {
      const groups = [];
      const skillsCopy = [...props.skills];
      
      // Create duplicates for seamless scrolling
      const allSkills = [...skillsCopy, ...skillsCopy];
      
      for (let i = 0; i < allSkills.length; i += props.itemsPerGroup) {
        groups.push(allSkills.slice(i, i + props.itemsPerGroup));
      }
      
      return groups;
    });
    
    const animateScroll = () => {
      if (!track.value) return;
      
      // Adjust speed here - smaller number = faster
      const speed = 0.5;
      currentPosition += speed * direction;
      
      // Get the width of the track element
      const trackWidth = track.value.scrollWidth / 2;
      
      // Reset position when reaching the end for seamless loop
      if (currentPosition > trackWidth) {
        currentPosition = 0;
      } else if (currentPosition < 0) {
        currentPosition = trackWidth;
      }
      
      // Apply the transformation
      track.value.style.transform = `translateX(${-currentPosition}px)`;
      
      // Continue animation
      animationId = requestAnimationFrame(animateScroll);
    };
    
    const pauseAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
    
    const resumeAnimation = () => {
      animationId = requestAnimationFrame(animateScroll);
    };
    
    onMounted(() => {
      // Start animation
      animationId = requestAnimationFrame(animateScroll);
      
      // Add event listeners for hover to pause animation
      if (track.value) {
        track.value.addEventListener('mouseenter', pauseAnimation);
        track.value.addEventListener('mouseleave', resumeAnimation);
      }
    });
    
    onUnmounted(() => {
      // Clean up animation
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Remove event listeners
      if (track.value) {
        track.value.removeEventListener('mouseenter', pauseAnimation);
        track.value.removeEventListener('mouseleave', resumeAnimation);
      }
    });
    
    return {
      track,
      groupedSkills
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

.scrolling-skills {
  width: 100%;
  overflow: hidden;
  padding: $spacing-lg 0;
  
  &.dark-mode {
    .skill-item {
      background-color: $dark-card-bg;
      
      &:hover {
        background-color: lighten($dark-card-bg, 5%);
      }
    }
    
    .skill-name {
      color: $dark-text;
    }
  }
}

.skills-track {
  display: flex;
  will-change: transform;
}

.skills-slide {
  display: flex;
  gap: $spacing-md;
  flex-shrink: 0;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-md;
  border-radius: $border-radius-md;
  background-color: $light-card-bg;
  box-shadow: $shadow-sm;
  transition: all $transition-fast;
  width: 120px;
  cursor: default;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-md;
    background-color: darken($light-card-bg, 3%);
  }
}

.skill-icon {
  font-size: 32px;
  margin-bottom: $spacing-sm;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    background: linear-gradient(45deg, $primary-color, $secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.skill-name {
  font-weight: 500;
  text-align: center;
  color: $light-text;
}
</style>
