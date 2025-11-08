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
    const firework = {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height,
      targetX: x,
      targetY: y,
      velocity: { x: 0, y: 0 },
      speed: 2 + Math.random() * 1,
      brightness: 1,
      color: this.getRandomColor(),
      trail: [],
      exploded: false,
      type: type
    };

    // Calculate initial velocity towards target
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

  getParticleCount(type) {
    const counts = {
      'standard': 80,
      'double': 120,
      'crackle': 150,
      'willow': 100,
      'peony': 200,
      'chrysanthemum': 180,
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
      'random': this.getRandomColorScheme()
    };
    return colorSchemes[type] || colorSchemes.standard;
  }

  getRandomColorScheme() {
    const schemes = [
      ['#FF0000', '#FF6B00', '#FFFF00'], // Red-Orange-Yellow
      ['#00FF00', '#00FFFF', '#0080FF'], // Green-Cyan-Blue
      ['#FF00FF', '#FF0080', '#FF0000'], // Magenta-Pink-Red
      ['#FFFF00', '#FFA500', '#FF6B00'], // Yellow-Orange
      ['#00FFFF', '#0080FF', '#0000FF'], // Cyan-Blue
      ['#FF6B6B', '#FFA500', '#FFFF00']  // Coral-Orange-Yellow
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

        if (distance < 5 || Math.random() < 0.02) {
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
    // Continuous firework show
    setInterval(() => {
      if (this.fireworks.length < 5) {
        const x = 100 + Math.random() * (this.canvas.width - 200);
        const y = 100 + Math.random() * (this.canvas.height * 0.4);
        const types = ['standard', 'double', 'crackle', 'willow', 'peony', 'chrysanthemum'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.createFirework(x, y, type);
      }
    }, 800);

    // Occasional burst
    setInterval(() => {
      if (Math.random() > 0.5) {
        const burstX = 200 + Math.random() * (this.canvas.width - 400);
        const burstY = 150 + Math.random() * (this.canvas.height * 0.3);
        const burstCount = 3 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < burstCount; i++) {
          setTimeout(() => {
            this.createFirework(
              burstX + (Math.random() - 0.5) * 100,
              burstY + (Math.random() - 0.5) * 50,
              'random'
            );
          }, i * 150);
        }
      }
    }, 3000);
  }

  bindEvents() {
    // Click to create firework
    this.canvas.addEventListener('click', (e) => {
      const types = ['standard', 'double', 'crackle', 'willow', 'peony'];
      const type = types[Math.floor(Math.random() * types.length)];
      this.createFirework(e.clientX, e.clientY, type);
    });

    // Spacebar for burst
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.createFirework(
              Math.random() * this.canvas.width,
              100 + Math.random() * (this.canvas.height * 0.4),
              'random'
            );
          }, i * 100);
        }
      }
    });
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

