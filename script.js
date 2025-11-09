// Simple, reliable portfolio functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - simple version');
    
    // 1. Theme Toggle - Universal fix for all pages
    initializeThemeToggle();
    
    // 2. Dynamic Greetings
    updateHomeGreeting();
    updateContactGreeting();
    updateAvailabilityStatus();
    
    // 3. Active Navigation - Highlight current page
    updateActiveNavLink();
    

    // Function to initialize technology toggle functionality
function initializeTechnologyToggle() {
  document.querySelectorAll('.tech-item').forEach(item => {
    const toggle = item.querySelector('.tech-toggle');
    const description = item.querySelector('.tech-description');
    
    item.addEventListener('click', (e) => {
      // Toggle the show class on the description
      description.classList.toggle('show');
      
      // Change the toggle button text
      if (description.classList.contains('show')) {
        toggle.textContent = '-';
      } else {
        toggle.textContent = '+';
      }
    });
  });
}



    // 4. Typewriter Effect for Home Page
    initializeTypewriter();
    
    // 5. Language Skills - Initialize on all pages that have skills section
    initializeLanguageSkills();
    
    // 6. Load Real Projects from GitHub - Only on projects page
    if (document.getElementById('projects-loading')) {
        loadGitHubProjects();
    }
    
    // 7. Project Filters - Only on projects page
    setTimeout(() => {
        if (document.querySelector('.project-filters')) {
            setupProjectFilters();
        }
    }, 1000);
    
    // 8. Resume Request Buttons - Only on resume page
    setTimeout(() => {
        const resumeButtons = document.querySelectorAll('.resume-btn');
        
        resumeButtons.forEach(button => {
            button.onclick = function(e) {
                if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                    e.preventDefault();
                    alert('For privacy reasons, please request my resume via email, LinkedIn, or WhatsApp. Thank you for your understanding!');
                }
            };
        });
    }, 1500);
    
    // 9. Scroll to top - Universal for all pages
    initializeScrollToTop();
    
    // 10. Smooth scrolling for nav - Universal for all pages
    initializeSmoothScrolling();
    
    // 11. Load Footer
    loadFooter();
    
    // 12. Load Skills Section if placeholder exists
    loadSkillsSection();
    
    // 13. Update active nav on hash change (for about section)
    window.addEventListener('hashchange', updateActiveNavLink);
});

// ===== SKILLS SECTION FUNCTIONS =====

// Load skills section from external file
function loadSkillsSection() {
    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
        fetch('skills.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Skills file not found');
                }
                return response.text();
            })
            .then(data => {
                skillsSection.innerHTML = data;
                // Re-initialize language skills after loading
                setTimeout(initializeLanguageSkills, 100);
            })
            .catch(error => {
                console.error('Error loading skills section:', error);
                // Fallback skills section
                skillsSection.innerHTML = `
                    <section id="skills">
                        <div class="container">
                            <h2>Technical Skills</h2>
                            <p class="section-subtitle">Technologies and tools I work with</p>
                            
                            <h3>Programming Languages</h3>
                            <div id="languageSkills" class="skills">
                                <div class="skill" data-lang="Java">Java</div>
                                <div class="skill" data-lang="JavaScript">JavaScript</div>
                                <div class="skill" data-lang="Python">Python</div>
                                <div class="skill" data-lang="PHP">PHP</div>
                                <div class="skill" data-lang="SQL">SQL</div>
                            </div>
                            
                            <div id="langDescription" class="lang-description">
                                Click on a language to see description
                            </div>
                            
                            <h3>Databases</h3>
                            <div class="skills">
                                <div class="skill">MySQL</div>
                                <div class="skill">SQLite</div>
                                <div class="skill">MongoDB</div>
                            </div>
                            
                            <h3>IT Infrastructure</h3>
                            <div class="skills">
                                <div class="skill">PC Hardware & Assembly</div>
                                <div class="skill">System Troubleshooting</div>
                                <div class="skill">Network Configuration</div>
                                <div class="skill">IT Security Fundamentals</div>
                            </div>
                            
                            <h3>Frameworks & Tools</h3>
                            <div class="skills">
                                <div class="skill">React</div>
                                <div class="skill">Node.js</div>
                                <div class="skill">Git</div>
                                <div class="skill">Docker</div>
                                <div class="skill">REST APIs</div>
                                <div class="skill">Linux</div>
                            </div>
                        </div>
                    </section>
                `;
                // Initialize skills after fallback
                setTimeout(initializeLanguageSkills, 100);
            });
    }
}

// Initialize language skills functionality
function initializeLanguageSkills() {
    const skills = document.querySelectorAll('#languageSkills .skill');
    const desc = document.getElementById('langDescription');
    
    if (skills.length > 0 && desc) {
        console.log('Initializing language skills:', skills.length, 'skills found');
        
        const descriptions = {
            'Java': 'Enterprise applications and Android development. Strong in OOP principles and backend systems.',
            'JavaScript': 'Web development and interactive features. Experience with frontend frameworks and Node.js.',
            'Python': 'Data science, automation, and web development. Skilled in scripting and ML libraries.',
            'PHP': 'Server-side web development. Experience with Laravel and building dynamic websites.',
            'SQL': 'Database management and complex queries. Proficient in database design and optimization.'
        };
        
        skills.forEach(skill => {
            skill.onclick = function() {
                console.log('Language clicked:', this.getAttribute('data-lang'));
                
                // Remove active class from all skills
                skills.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked skill
                this.classList.add('active');
                
                // Update description
                const lang = this.getAttribute('data-lang');
                desc.textContent = descriptions[lang] || 'Description available soon.';
                desc.style.opacity = '1';
            };
        });
        
        // Activate first skill by default if none active
        const activeSkill = document.querySelector('#languageSkills .skill.active');
        if (!activeSkill && skills.length > 0) {
            skills[0].click();
        }
    } else if (skills.length === 0) {
        console.log('No language skills found on this page');
    }
}

// ===== TYPEWRITER EFFECT =====

// Advanced Typewriter Effect
function initializeTypewriter() {
  const texts = [
    "Full-Stack Developer",
    "Software Engineer", 
    "Web Developer",
    "Problem Solver",
    "Java Programmer",
    "JavaScript Developer",
    "AI Developer",
    "Network Specialist",
    "IT Essentials Certified",
    "IT Graduate",
    "Seeking Internships"
  ];
  
  const element = document.getElementById('typewriter');
  if (!element) return;
  
  let currentIndex = 0;
  let currentText = '';
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const fullText = texts[currentIndex];
    
    if (isDeleting) {
      currentText = fullText.substring(0, currentText.length - 1);
    } else {
      currentText = fullText.substring(0, currentText.length + 1);
    }
    
    element.textContent = currentText;
    
    let delta = typingSpeed;
    
    if (!isDeleting && currentText === fullText) {
      delta = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentText === '') {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      delta = 500;
    } else if (isDeleting) {
      delta = typingSpeed / 2;
    }
    
    setTimeout(type, delta);
  }
  
  type();
}

// ===== DYNAMIC GREETING FUNCTIONS =====

// Dynamic Greeting Function
function setDynamicGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    let emoji = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning!';
        emoji = '☀️';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon!';
        emoji = '🌤️';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening!';
        emoji = '🌙';
    } else {
        greeting = 'Hello there!';
        emoji = '🌟';
    }
    
    return { greeting, emoji };
}

// Update Home Page Greeting
function updateHomeGreeting() {
    const greetingElement = document.getElementById('dynamicGreeting');
    if (greetingElement) {
        const { greeting, emoji } = setDynamicGreeting();
        greetingElement.innerHTML = `
            <span class="greeting-emoji">${emoji}</span>
            ${greeting} Ready to build something amazing?
        `;
    }
}

// Update Contact Page Greeting
function updateContactGreeting() {
    const greetingElement = document.getElementById('contactGreeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let message = '';
        let emoji = '';
        
        if (hour >= 9 && hour < 17) {
            message = 'Great time to connect! I\'m usually available during business hours.';
            emoji = '💼';
        } else if (hour >= 17 && hour < 21) {
            message = 'Evening connections welcome! I\'ll respond first thing tomorrow.';
            emoji = '🌆';
        } else {
            message = 'Outside business hours? No worries - I\'ll get back to you in the morning!';
            emoji = '🌙';
        }
        
        greetingElement.innerHTML = `
            <span class="greeting-emoji">${emoji}</span>
            ${message}
        `;
    }
}

// Update availability status based on time
function updateAvailabilityStatus() {
    const statusElement = document.querySelector('.status-content h4');
    const statusIndicator = document.querySelector('.status-indicator');
    const hour = new Date().getHours();
    
    if (statusElement && statusIndicator) {
        if (hour >= 9 && hour < 17) {
            // Business hours - actively available
            statusElement.textContent = 'Available for Opportunities';
            statusIndicator.style.background = 'var(--success-color)';
        } else {
            // Outside business hours - still available but response might be delayed
            statusElement.textContent = 'Available (Response may be delayed)';
            statusIndicator.style.background = 'var(--warning-color)';
        }
    }
}

// ===== ACTIVE NAVIGATION FUNCTION =====

// Update Active Navigation Link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    const currentHash = window.location.hash;
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Check for exact page matches
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Special case for home page
        if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
            link.classList.add('active');
        }
        
        // Special case for about section on home page
        if ((currentPage === 'index.html' || currentPage === '') && currentHash === '#about' && linkHref === '#about') {
            link.classList.add('active');
        }
    });
}

// ===== UNIVERSAL FUNCTIONS =====

// Universal Theme Toggle Function
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Load saved theme preference first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light');
        }
        
        // Update button text based on current theme
        updateThemeButton();
        
        themeToggle.onclick = function() {
            document.body.classList.toggle('light');
            const isLight = document.body.classList.contains('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeButton();
        };
    }
}

// Update theme button text and icon
function updateThemeButton() {
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const isLight = document.body.classList.contains('light');
    
    if (themeIcon) {
        themeIcon.textContent = isLight ? '🌙' : '☀️';
    }
    if (themeText) {
        themeText.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
}

// Load footer from sections folder
function loadFooter() {
    const footerSection = document.getElementById('footer-section');
    if (footerSection) {
        fetch('sections/footer.html')
            .then(response => response.text())
            .then(data => {
                footerSection.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer
                footerSection.innerHTML = `
                    <footer>
                        <div class="container">
                            <div class="footer-content">
                                <p>&copy; 2025 Sidney Mpenyana. All rights reserved.</p>
                                <p class="footer-quote">"Always learning, always growing"</p>
                                <div class="footer-links">
                                    <a href="index.html">Home</a> | 
                                    <a href="projects.html">Projects</a> | 
                                    <a href="contact.html">Contact</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
}

// Universal Scroll to Top
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
    }
}

// Universal Smooth Scrolling - Fixed for all pages
function initializeSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(link => {
        link.onclick = function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                // If we're on the home page, scroll to section
                if (window.location.pathname.endsWith('index.html') || 
                    window.location.pathname === '/' || 
                    window.location.pathname.endsWith('/')) {
                    
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({behavior: 'smooth'});
                    }
                } else {
                    // If we're on another page, redirect to home page with anchor
                    window.location.href = 'index.html' + href;
                }
            }
            // For external page links, let them work normally
        };
    });
}

// ===== GITHUB PROJECTS FUNCTIONS =====

// Load real projects from GitHub
async function loadGitHubProjects() {
    try {
        console.log('Loading GitHub projects...');
        
        // Show loading state
        const loadingElement = document.getElementById('projects-loading');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        const response = await fetch('https://api.github.com/users/sidney081/repos?sort=updated&per_page=20');
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        console.log('Loaded repos:', repos);
        
        // Hide loading spinner
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // Check if we got rate limited or empty response
        if (repos.message && repos.message.includes('API rate limit')) {
            console.log('GitHub API rate limited');
            showFallbackProjects();
            return;
        }
        
        if (!repos || repos.length === 0) {
            console.log('No repositories found');
            showFallbackProjects();
            return;
        }
        
        const completedProjects = [];
        const inProgressProjects = [];
        
        // Categorize projects
        repos.forEach(repo => {
            // Skip forks
            if (repo.fork) return;
            
            // Check for completion indicators
            const isCompleted = checkIfProjectIsCompleted(repo);
            
            if (isCompleted) {
                completedProjects.push(repo);
            } else {
                inProgressProjects.push(repo);
            }
        });
        
        console.log('Completed projects:', completedProjects.length);
        console.log('In progress projects:', inProgressProjects.length);
        
        // Display projects
        displayProjects(completedProjects, 'completed');
        displayProjects(inProgressProjects, 'inprogress');
        
        // Show/hide sections based on content
        const completedSection = document.getElementById('completed-projects');
        const inprogressSection = document.getElementById('inprogress-projects');
        
        if (completedProjects.length > 0 && completedSection) {
            completedSection.style.display = 'block';
        }
        if (inProgressProjects.length > 0 && inprogressSection) {
            inprogressSection.style.display = 'block';
        }
        
        // If no projects found in either category, show fallback
        if (completedProjects.length === 0 && inProgressProjects.length === 0) {
            console.log('No projects found in any category');
            showFallbackProjects();
        }
        
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        
        // Hide loading and show error
        const loadingElement = document.getElementById('projects-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        showFallbackProjects();
    }
}

// Improved project completion detection
function checkIfProjectIsCompleted(repo) {
    // 1. Check if repo is archived
    if (repo.archived) return true;
    
    // 2. Check for specific topics
    if (repo.topics && repo.topics.includes('completed')) {
        return true;
    }
    
    // 3. Check description for completion keywords
    const completionKeywords = ['complete', 'completed', 'finished', 'done', 'production', 'deployed'];
    if (repo.description) {
        const descLower = repo.description.toLowerCase();
        if (completionKeywords.some(keyword => descLower.includes(keyword))) {
            return true;
        }
    }
    
    // 4. Check if repo hasn't been updated in a while (likely completed)
    const lastUpdate = new Date(repo.updated_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    if (lastUpdate < threeMonthsAgo) {
        return true;
    }
    
    // 5. Default: consider it in progress
    return false;
}

// Display projects in the grid
function displayProjects(projects, type) {
    const containerId = type === 'completed' ? 'completed-projects-grid' : 'inprogress-projects-grid';
    const container = document.getElementById(containerId);
    
    if (!container || projects.length === 0) return;
    
    container.innerHTML = projects.map(repo => `
        <div class="project-card show">
            <div class="badge ${type === 'completed' ? 'completed-badge' : 'inprogress-badge'}">
                ${type === 'completed' ? 'Completed' : 'In Progress'}
            </div>
            <div class="repo-header">
                <h3>${repo.name}</h3>
                <div class="repo-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
            <div class="screenshot-container">
                <div class="project-screenshot" style="background: linear-gradient(135deg, ${getRandomColor()});"></div>
                <div class="overlay-links">
                    ${repo.homepage ? `<a href="${repo.homepage}" class="overlay-link" target="_blank">Live Demo</a>` : ''}
                    <a href="${repo.html_url}" class="overlay-link" target="_blank">Source Code</a>
                </div>
            </div>
            <p class="repo-description">
                ${repo.description || 'No description available.'}
            </p>
            <div class="tech-stack">
                ${repo.language ? `<span class="language-tag">${repo.language}</span>` : ''}
                ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('') : ''}
            </div>
            <div class="repo-footer">
                <span>Updated ${formatDate(repo.updated_at)}</span>
                <span>${repo.language || 'Various'}</span>
            </div>
        </div>
    `).join('');
}

// Show fallback projects when GitHub API fails
function showFallbackProjects() {
    console.log('🛟 Showing fallback projects');
    
    const loadingElement = document.getElementById('projects-loading');
    const errorElement = document.getElementById('projects-error');
    const completedSection = document.getElementById('completed-projects');
    const inprogressSection = document.getElementById('inprogress-projects');
    
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    if (errorElement) {
        errorElement.style.display = 'block';
    }
    
    // Create fallback projects with correct technologies
    const fallbackProjects = [
        {
            name: "Movie Finding Made Easy",
            description: "Web application for discovering and searching movies with detailed information, ratings, and recommendations using PHP backend.",
            language: "PHP",
            stargazers_count: 7,
            forks_count: 2,
            updated_at: new Date().toISOString(),
            html_url: "https://github.com/SIDNEY081/Movie_Finding_Made_Easy",
            homepage: "#",
            topics: ["movies", "web-app", "php", "entertainment", "api-integration"]
        },
        {
            name: "AI-Stroke-Shield",
            description: "Healthcare application for stroke prediction and prevention using machine learning algorithms and data analysis.",
            language: "Python",
            stargazers_count: 12,
            forks_count: 3,
            updated_at: new Date().toISOString(),
            html_url: "#",
            homepage: "#",
            topics: ["machine-learning", "healthcare", "python", "data-science"]
        },
        {
            name: "Python Learning",
            description: "Collection of Python scripts and projects covering fundamentals, data structures, algorithms, and practical applications.",
            language: "Python",
            stargazers_count: 5,
            forks_count: 1,
            updated_at: new Date().toISOString(),
            html_url: "https://github.com/SIDNEY081/Python_Learning",
            homepage: "#",
            topics: ["python", "learning", "algorithms", "programming", "beginners"]
        }
    ];
    
    // Display fallback projects in both sections
    if (completedSection) {
        displayProjects(fallbackProjects, 'completed');
        completedSection.style.display = 'block';
    }
    if (inprogressSection) {
        displayProjects(fallbackProjects.slice(0, 2), 'inprogress');
        inprogressSection.style.display = 'block';
    }
    
    console.log('✅ Fallback projects displayed');
}

// Setup project filters
function setupProjectFilters() {
    const filters = document.querySelectorAll('.project-filters button');
    
    filters.forEach(button => {
        button.onclick = function() {
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const completedSection = document.getElementById('completed-projects');
            const inprogressSection = document.getElementById('inprogress-projects');
            
            if (filter === 'all') {
                if (completedSection) completedSection.style.display = 'block';
                if (inprogressSection) inprogressSection.style.display = 'block';
            } else if (filter === 'completed') {
                if (completedSection) completedSection.style.display = 'block';
                if (inprogressSection) inprogressSection.style.display = 'none';
            } else if (filter === 'inprogress') {
                if (completedSection) completedSection.style.display = 'none';
                if (inprogressSection) inprogressSection.style.display = 'block';
            }
        };
    });
}

// ===== HELPER FUNCTIONS =====

// Helper functions
function getRandomColor() {
    const colors = [
        '#667eea, #764ba2',
        '#f093fb, #f5576c',
        '#4facfe, #00f2fe',
        '#43e97b, #38f9d7',
        '#fa709a, #fee140',
        '#a8edea, #fed6e3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}


// Initialize skill progress bars
function initializeSkillProgress() {
    const progressBars = document.querySelectorAll('.level-progress');
    
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSkillProgress();
});

// Also call it when skills section is loaded dynamically
function initializeSkillFrames() {
    initializeSkillProgress();
}
console.log('Portfolio JS loaded - with skills section loading and improved functionality');