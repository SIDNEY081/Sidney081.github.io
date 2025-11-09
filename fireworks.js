// Ultra Realistic Fireworks with Advanced Effects
class AdvancedFireworks {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.fireworks = [];
    this.particles = [];
    this.init();
  }

  init() {
    this.createCanvas();
    this.startRendering();
    this.startAutoShow();
    this.bindEvents();
    this.createAnimatedHolidayMessage();
    this.createChristmasTreesWithLights();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'fireworks-canvas';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createFirework(x, y, type = 'random') {
    // Start from much lower for true long range - below the visible screen
    const startX = Math.random() * this.canvas.width;
    const startY = this.canvas.height + 100; // Start 100px below screen
    
    // Make target much higher for long range trajectory
    const targetY = Math.max(80, y - 300);
    
    const firework = {
      x: startX,
      y: startY,
      targetX: x,
      targetY: targetY,
      velocity: { x: 0, y: 0 },
      // Much higher speed for long range
      speed: 6 + Math.random() * 3,
      brightness: 1,
      color: this.getRandomColor(),
      trail: [],
      exploded: false,
      type: type,
      gravity: 0.005, // Reduced gravity for longer flight
      drag: 0.998
    };

    // Calculate trajectory for very long range
    const dx = firework.targetX - firework.x;
    const dy = firework.targetY - firework.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    firework.velocity.x = (dx / distance) * firework.speed;
    firework.velocity.y = (dy / distance) * firework.speed;

    this.fireworks.push(firework);
  }

  createParticle(x, y, color, type = 'standard') {
    const particle = {
      x: x,
      y: y,
      velocity: {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8
      },
      life: 1,
      decay: 0.02 + Math.random() * 0.02,
      color: color,
      size: 2 + Math.random() * 3,
      type: type,
      gravity: 0.1,
      friction: 0.95,
      brightness: 0.8 + Math.random() * 0.2
    };

    // Special particle types
    if (type === 'sparkle') {
      particle.size = 1;
      particle.decay = 0.03;
      particle.brightness = 1;
    } else if (type === 'flare') {
      particle.size = 8;
      particle.decay = 0.05;
    } else if (type === 'debris') {
      particle.size = 1 + Math.random() * 2;
      particle.gravity = 0.2;
      particle.friction = 0.9;
    }

    this.particles.push(particle);
  }

  explodeFirework(firework) {
    const particleCount = this.getParticleCount(firework.type);
    const colors = this.getExplosionColors(firework.type);
    
    // Special name explosion for SIDNEY
    if (firework.type === 'name') {
      this.createNameExplosion(firework.x, firework.y);
      // Also create regular explosion particles
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.createParticle(firework.x, firework.y, color, 'standard');
      }
      return;
    }
    
    // Create main explosion particles
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.createParticle(firework.x, firework.y, color, 'standard');
    }

    // Create sparkles
    for (let i = 0; i < particleCount / 4; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.createParticle(firework.x, firework.y, color, 'sparkle');
    }

    // Create flares
    for (let i = 0; i < 8; i++) {
      this.createParticle(firework.x, firework.y, firework.color, 'flare');
    }

    // Create debris
    for (let i = 0; i < 15; i++) {
      this.createParticle(firework.x, firework.y, '#888888', 'debris');
    }

    // Create secondary explosion after delay for some types
    if (firework.type === 'double' || Math.random() > 0.7) {
      setTimeout(() => {
        for (let i = 0; i < particleCount / 2; i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.createParticle(
            firework.x + (Math.random() - 0.5) * 50,
            firework.y + (Math.random() - 0.5) * 50,
            color,
            'sparkle'
          );
        }
      }, 200 + Math.random() * 300);
    }
  }

  // Special name explosion that spells out "SIDNEY"
  createNameExplosion(x, y) {
    const name = "SIDNEY";
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF8E53'];
    
    console.log("Creating name explosion for: SIDNEY");
    
    for (let i = 0; i < name.length; i++) {
      const letter = name[i];
      const angle = (i / name.length) * Math.PI * 2;
      const radius = 100; // Larger radius for better visibility
      
      // Create multiple particles per letter for better visibility
      for (let j = 0; j < 15; j++) {
        const particleAngle = angle + (Math.random() - 0.5) * 0.8;
        const particleRadius = radius + (Math.random() - 0.5) * 40;
        
        const targetX = Math.cos(particleAngle) * particleRadius;
        const targetY = Math.sin(particleAngle) * particleRadius;
        
        const nameParticle = document.createElement('div');
        nameParticle.className = 'name-particle';
        nameParticle.textContent = letter;
        nameParticle.style.color = colors[Math.floor(Math.random() * colors.length)];
        nameParticle.style.left = (x - 8) + 'px';
        nameParticle.style.top = (y - 8) + 'px';
        nameParticle.style.setProperty('--tx', targetX + 'px');
        nameParticle.style.setProperty('--ty', targetY + 'px');
        nameParticle.style.fontSize = (20 + Math.random() * 8) + 'px';
        nameParticle.style.zIndex = '10000';
        nameParticle.style.fontWeight = '900';
        
        document.body.appendChild(nameParticle);
        
        // Remove after animation
        setTimeout(() => {
          if (nameParticle.parentNode) {
            nameParticle.parentNode.removeChild(nameParticle);
          }
        }, 2500);
      }
    }
  }

  // Create Christmas trees with lights
  createChristmasTreesWithLights() {
    // Left Christmas Tree
    const leftTree = document.createElement('div');
    leftTree.className = 'christmas-tree left';
    leftTree.innerHTML = '🎄';
    leftTree.addEventListener('click', () => this.createTreeFireworks('left'));
    document.body.appendChild(leftTree);

    // Right Christmas Tree
    const rightTree = document.createElement('div');
    rightTree.className = 'christmas-tree right';
    rightTree.innerHTML = '🎄';
    rightTree.addEventListener('click', () => this.createTreeFireworks('right'));
    document.body.appendChild(rightTree);

    // Create lights for both sides
    this.createChristmasLights('left');
    this.createChristmasLights('right');
    this.createNewYearLights('left');
    this.createNewYearLights('right');
  }

  createChristmasLights(side) {
    const lightsContainer = document.createElement('div');
    lightsContainer.className = `christmas-lights ${side}`;
    
    const lightString = document.createElement('div');
    lightString.className = 'light-string';
    
    // Create 7 colorful light bulbs
    const lightColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan'];
    
    for (let i = 0; i < 7; i++) {
      const lightBulb = document.createElement('div');
      lightBulb.className = `light-bulb ${lightColors[i]}`;
      lightString.appendChild(lightBulb);
    }
    
    lightsContainer.appendChild(lightString);
    document.body.appendChild(lightsContainer);
  }

  createNewYearLights(side) {
    const newYearLights = document.createElement('div');
    newYearLights.className = `new-year-lights ${side}`;
    
    // Create 4 countdown lights
    for (let i = 0; i < 4; i++) {
      const countdownLight = document.createElement('div');
      countdownLight.className = 'countdown-light';
      newYearLights.appendChild(countdownLight);
    }
    
    document.body.appendChild(newYearLights);
  }

  // Special fireworks when clicking trees
  createTreeFireworks(side) {
    const x = side === 'left' ? 150 : this.canvas.width - 150;
    const y = this.canvas.height / 2;
    
    // Create multiple fireworks from the tree
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createFirework(
          x + (Math.random() - 0.5) * 100,
          y - Math.random() * 200,
          'random'
        );
      }, i * 200);
    }
    
    // Special tree explosion effect
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.createParticle(
          x,
          y,
          side === 'left' ? '#00FF00' : '#FF6B6B',
          'sparkle'
        );
      }
    }, 1000);
  }

  getParticleCount(type) {
    const counts = {
      'standard': 80,
      'double': 120,
      'crackle': 150,
      'willow': 100,
      'peony': 200,
      'chrysanthemum': 180,
      'name': 60,
      'random': 100 + Math.random() * 100
    };
    return counts[type] || counts.standard;
  }

  getExplosionColors(type) {
    const colorSchemes = {
      'standard': ['#FF0000', '#FF6B00', '#FFFF00'],
      'double': ['#00FF00', '#00FFFF', '#0080FF'],
      'crackle': ['#FFFFFF', '#FFA500', '#FF0000'],
      'willow': ['#00FF00', '#80FF00', '#FFFF00'],
      'peony': ['#FF0000', '#FF00FF', '#FF0080'],
      'chrysanthemum': ['#FFFF00', '#FFA500', '#FF6B00'],
      'name': ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      'random': this.getRandomColorScheme()
    };
    return colorSchemes[type] || colorSchemes.standard;
  }

  getRandomColorScheme() {
    const schemes = [
      ['#FF0000', '#FF6B00', '#FFFF00'],
      ['#00FF00', '#00FFFF', '#0080FF'],
      ['#FF00FF', '#FF0080', '#FF0000'],
      ['#FFFF00', '#FFA500', '#FF6B00'],
      ['#00FFFF', '#0080FF', '#0000FF'],
      ['#FF6B6B', '#FFA500', '#FFFF00']
    ];
    return schemes[Math.floor(Math.random() * schemes.length)];
  }

  getRandomColor() {
    const colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
      '#FF6B00', '#FF0080', '#0080FF', '#80FF00', '#FF6B6B', '#6BFF6B'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  updateFireworks() {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const firework = this.fireworks[i];
      
      if (!firework.exploded) {
        // Apply physics for realistic trajectory
        firework.velocity.x *= firework.drag;
        firework.velocity.y *= firework.drag;
        firework.velocity.y += firework.gravity;
        
        // Update position
        firework.x += firework.velocity.x;
        firework.y += firework.velocity.y;

        // Add to trail
        firework.trail.push({ x: firework.x, y: firework.y });
        if (firework.trail.length > 8) firework.trail.shift();

        // Check if reached target or should explode
        const dx = firework.targetX - firework.x;
        const dy = firework.targetY - firework.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Explode when close to target or when starting to descend
        if (distance < 15 || firework.velocity.y > 0 || firework.y < 150) {
          firework.exploded = true;
          this.explodeFirework(firework);
          this.fireworks.splice(i, 1);
        }
      }
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Apply physics
      particle.velocity.x *= particle.friction;
      particle.velocity.y *= particle.friction;
      particle.velocity.y += particle.gravity;
      
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.life -= particle.decay;

      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    // Clear canvas with fade effect for trails
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render fireworks trails
    this.fireworks.forEach(firework => {
      this.ctx.strokeStyle = firework.color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(firework.trail[0].x, firework.trail[0].y);
      for (let i = 1; i < firework.trail.length; i++) {
        this.ctx.lineTo(firework.trail[i].x, firework.trail[i].y);
      }
      this.ctx.stroke();
    });

    // Render particles
    this.particles.forEach(particle => {
      const alpha = particle.life * particle.brightness;
      const size = particle.size * particle.life;
      
      this.ctx.globalAlpha = alpha;
      
      if (particle.type === 'flare') {
        // Flare effect with gradient
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(particle.x - size * 2, particle.y - size * 2, size * 4, size * 4);
      } else {
        // Standard particle with glow
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow
        this.ctx.shadowColor = particle.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    });

    this.ctx.globalAlpha = 1;
  }

  startRendering() {
    const animate = () => {
      this.updateFireworks();
      this.updateParticles();
      this.render();
      requestAnimationFrame(animate);
    };
    animate();
  }

  startAutoShow() {
    // Continuous firework show with true long range
    setInterval(() => {
      if (this.fireworks.length < 4) {
        const x = 150 + Math.random() * (this.canvas.width - 300);
        // Very high targets for long range
        const y = 50 + Math.random() * 80;
        const types = ['standard', 'double', 'crackle', 'willow', 'peony', 'chrysanthemum'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.createFirework(x, y, type);
      }
    }, 1200);

    // Occasional burst with long range
    setInterval(() => {
      if (Math.random() > 0.3) {
        const burstX = 200 + Math.random() * (this.canvas.width - 400);
        const burstY = 30 + Math.random() * 60;
        const burstCount = 2 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < burstCount; i++) {
          setTimeout(() => {
            this.createFirework(
              burstX + (Math.random() - 0.5) * 100,
              burstY + (Math.random() - 0.5) * 40,
              'random'
            );
          }, i * 250);
        }
      }
    }, 5000);

    // Special name firework every 15 seconds
    setInterval(() => {
      const x = this.canvas.width / 2;
      const y = 100;
      this.createFirework(x, y, 'name');
    }, 15000);
  }

  bindEvents() {
    // Click to create firework
    this.canvas.addEventListener('click', (e) => {
      const types = ['standard', 'double', 'crackle', 'willow', 'peony', 'name'];
      const type = types[Math.floor(Math.random() * types.length)];
      this.createFirework(e.clientX, e.clientY, type);
    });

    // Spacebar for burst
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            this.createFirework(
              Math.random() * this.canvas.width,
              50 + Math.random() * 80,
              'random'
            );
          }, i * 200);
        }
      }
      
      // N key for name firework
      if (e.code === 'KeyN') {
        e.preventDefault();
        console.log("N key pressed - launching SIDNEY name firework");
        const x = this.canvas.width / 2;
        const y = 100;
        this.createFirework(x, y, 'name');
      }
    });
  }

  createAnimatedHolidayMessage() {
    const message = document.createElement('div');
    message.className = 'holiday-message';
    
    const messageText = "🎆 Happy Holidays & Merry Christmas from SIDNEY,  Press N for name firework! 🎆";
    
    // Create each letter as a separate span
    for (let i = 0; i < messageText.length; i++) {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'holiday-letter';
      letterSpan.textContent = messageText[i];
      
      // Add space handling
      if (messageText[i] === ' ') {
        letterSpan.style.marginRight = '4px';
      }
      
      message.appendChild(letterSpan);
    }
    
    document.body.appendChild(message);
  }

  // Public method to create firework from outside
  launchFirework(x, y, type = 'random') {
    this.createFirework(x, y, type);
  }

  // Method to stop the show
  stopShow() {
    this.fireworks = [];
    this.particles = [];
  }
}

// Initialize advanced fireworks
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded - initializing fireworks with animated message and trees");
  window.advancedFireworks = new AdvancedFireworks();
  
  // Keep snowflake functionality
  createSnowflakes();
});

// Keep your original functions for compatibility
function initializeFireworks() {
  console.log('🎆 Initializing advanced fireworks...');
}

function createFirework(x, y) {
  if (window.advancedFireworks) {
    window.advancedFireworks.launchFirework(x, y);
  }
}

// Snowflake function
function createSnowflakes() {
  setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = (5 + Math.random() * 10) + 's';
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake);
      }
    }, 15000);
  }, 200);
}

// Debug: Check if script is loaded
console.log("Fireworks script loaded successfully - SIDNEY animated message and Christmas trees enabled");