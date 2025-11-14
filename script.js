// Enhanced Portfolio JavaScript with live project demos - ALWAYS VISIBLE BUTTONS
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - enhanced with live demos and always visible buttons');
    
    // Initialize all features
    initializeThemeToggle();
    updateHomeGreeting();
    updateContactGreeting();
    updateAvailabilityStatus();
    updateActiveNavLink();
    initializeTechnologyToggle();
    initializeMobileFeatures();
    initializeTypewriter();
    initializeLanguageSkills();
    
    // Load Real Projects from GitHub - Only on projects page
    if (document.getElementById('projects-loading')) {
        console.log('Projects page detected, loading projects...');
        loadGitHubProjects();
    }
    
    // Project Filters - Only on projects page
    setTimeout(() => {
        if (document.querySelector('.project-filters')) {
            setupProjectFilters();
        }
    }, 1000);
    
    // Resume Request Buttons - Only on resume page
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
    
    // Scroll to top - Universal for all pages
    initializeScrollToTop();
    
    // Smooth scrolling for nav - Universal for all pages
    initializeSmoothScrolling();
    
    // Load Footer
    loadFooter();
    
    // Load Skills Section if placeholder exists
    loadSkillsSection();
    
    // Update active nav on hash change (for about section)
    window.addEventListener('hashchange', updateActiveNavLink);
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Debounce function for scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cache for GitHub requests
const githubCache = {
    data: null,
    timestamp: null,
    ttl: 5 * 60 * 1000 // 5 minutes cache
};

// ===== PROJECT URLS CONFIGURATION =====
const PROJECT_URLS = {
    'AI-Stroke-Shield': {
        live: 'https://ai-stroke-shield-8yw9ddvstkica4k3fodeep.streamlit.app/',
        github: 'https://github.com/SIDNEY081/AI-Stroke-Shield',
        description: 'Healthcare web application for stroke prediction using machine learning algorithms. Provides risk assessment and preventive recommendations.',
        features: [
            'Stroke risk assessment using ML models',
            'Health data analysis and visualization',
            'Preventive healthcare recommendations',
            'Interactive health dashboard',
            'Real-time risk prediction'
        ],
        technologies: ['Python', 'Machine Learning', 'Streamlit', 'Data Science', 'Healthcare']
    },
    'Movie_Finding_Made_Easy': {
        live: 'https://sidney081.github.io/Movie_Finding_Made_Easy/',
        github: 'https://github.com/SIDNEY081/Movie_Finding_Made_Easy',
        description: 'Interactive movie discovery platform with advanced search and filtering capabilities.',
        features: [
            'Advanced movie search and filtering',
            'User ratings and reviews system',
            'Personalized recommendations',
            'Responsive web design'
        ],
        technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'REST API']
    },
    'SafeShell': {
        live: 'https://sidney081.github.io/SafeShell/',
        github: 'https://github.com/SIDNEY081/SafeShell',
        appetize: 'https://appetize.io/app/b_oyu6nguofwkxisrlz4pa2tuipq',
        description: 'Security-focused mobile application providing safe browsing environment and threat protection with real-time security monitoring.',
        features: [
            'Safe browsing environment',
            'Threat detection and protection',
            'Security monitoring dashboard',
            'Real-time security alerts',
            'Mobile-optimized interface'
        ],
        technologies: ['Security', 'Mobile Development', 'JavaScript', 'Privacy', 'Android']
    },
    'mictseta_recruitment_system': {
        live: 'https://mictseta-recruitment-system.github.io/mictseta_recruitment_system/',
        github: 'https://github.com/mictseta-recruitment-system/mictseta_recruitment_system',
        description: 'Comprehensive recruitment management system for MICT SETA organization.',
        features: [
            'Candidate management system',
            'Job posting and applications',
            'Interview scheduling',
            'Recruitment analytics'
        ],
        technologies: ['Web Development', 'Database', 'Management System', 'JavaScript']
    },
    'Python_Learning': {
        live: 'https://sidney081.github.io/Python_Learning/',
        github: 'https://github.com/SIDNEY081/Python_Learning',
        description: 'Collection of Python projects and learning materials covering various programming concepts.',
        features: [
            'Data structures implementation',
            'Algorithm solutions and examples',
            'Web scraping projects',
            'Automation scripts and utilities'
        ],
        technologies: ['Python', 'Algorithms', 'Data Structures', 'Automation', 'Learning']
    }
};

// ===== SKILLS SECTION FUNCTIONS =====

// Load skills section from external file with error handling
function loadSkillsSection() {
    const skillsSection = document.getElementById('skills-section');
    if (!skillsSection) return;
    
    fetch('skills.html')
        .then(response => {
            if (!response.ok) throw new Error('Skills file not found');
            return response.text();
        })
        .then(data => {
            skillsSection.innerHTML = data;
            // Re-initialize components after loading
            setTimeout(() => {
                initializeLanguageSkills();
                initializeSkillProgress();
            }, 100);
        })
        .catch(error => {
            console.error('Error loading skills section:', error);
            skillsSection.innerHTML = getFallbackSkillsHTML();
            initializeLanguageSkills();
            initializeSkillProgress();
        });
}

// Fallback skills HTML with Kotlin and Android progress bars
function getFallbackSkillsHTML() {
    return `
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
                    <div class="skill" data-lang="Kotlin">Kotlin</div>
                </div>
                
                <div id="langDescription" class="lang-description">
                    Click on a language to see description
                </div>

                <!-- Skill Level Progress Bars -->
                <div class="skill-levels">
                    <h3>Skill Proficiency Levels</h3>
                    
                    <div class="skill-level-item">
                        <div class="skill-info">
                            <span class="skill-name">Kotlin</span>
                            <span class="skill-percent">75%</span>
                        </div>
                        <div class="skill-level-bar">
                            <div class="level-progress" data-level="75" style="width: 75%; background: linear-gradient(90deg, #7F52FF, #B47CFF);"></div>
                        </div>
                    </div>
                    
                    <div class="skill-level-item">
                        <div class="skill-info">
                            <span class="skill-name">Android Development</span>
                            <span class="skill-percent">70%</span>
                        </div>
                        <div class="skill-level-bar">
                            <div class="level-progress" data-level="70" style="width: 70%; background: linear-gradient(90deg, #3DDC84, #34A853);"></div>
                        </div>
                    </div>

                    <div class="skill-level-item">
                        <div class="skill-info">
                            <span class="skill-name">Java</span>
                            <span class="skill-percent">85%</span>
                        </div>
                        <div class="skill-level-bar">
                            <div class="level-progress" data-level="85" style="width: 85%; background: linear-gradient(90deg, #ED8B00, #FF9800);"></div>
                        </div>
                    </div>

                    <div class="skill-level-item">
                        <div class="skill-info">
                            <span class="skill-name">JavaScript</span>
                            <span class="skill-percent">80%</span>
                        </div>
                        <div class="skill-level-bar">
                            <div class="level-progress" data-level="80" style="width: 80%; background: linear-gradient(90deg, #F7DF1E, #FFEB3B);"></div>
                        </div>
                    </div>

                    <div class="skill-level-item">
                        <div class="skill-info">
                            <span class="skill-name">Python</span>
                            <span class="skill-percent">75%</span>
                        </div>
                        <div class="skill-level-bar">
                            <div class="level-progress" data-level="75" style="width: 75%; background: linear-gradient(90deg, #3776AB, #4B8BBE);"></div>
                        </div>
                    </div>
                </div>
                
                <h3>Mobile Development</h3>
                <div class="skills">
                    <div class="skill">Android Studio</div>
                    <div class="skill">Kotlin</div>
                    <div class="skill">Java (Android)</div>
                    <div class="skill">Material Design</div>
                    <div class="skill">REST API Integration</div>
                    <div class="skill">Firebase</div>
                    <div class="skill">Appetize.io Deployment</div>
                </div>
                
                <h3>Databases</h3>
                <div class="skills">
                    <div class="skill">MySQL</div>
                    <div class="skill">SQLite</div>
                    <div class="skill">MongoDB</div>
                    <div class="skill">Room Database</div>
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
                    <div class="skill">Android SDK</div>
                    <div class="skill">Gradle</div>
                    <div class="skill">Streamlit</div>
                </div>
            </div>
        </section>
    `;
}

// Initialize language skills functionality with accessibility
function initializeLanguageSkills() {
    const skills = document.querySelectorAll('#languageSkills .skill');
    const desc = document.getElementById('langDescription');
    
    if (!skills.length || !desc) {
        console.log('Language skills elements not found on this page');
        return;
    }
    
    console.log('Initializing language skills:', skills.length, 'skills found');
    
    const descriptions = {
        'Java': 'Enterprise applications and Android development. Strong in OOP principles and backend systems. Experience with Spring Boot and Android SDK.',
        'JavaScript': 'Web development and interactive features. Experience with frontend frameworks (React, Vue) and Node.js backend development.',
        'Python': 'Data science, automation, and web development. Skilled in scripting, ML libraries (scikit-learn), and Django framework.',
        'PHP': 'Server-side web development. Experience with Laravel and building dynamic websites and RESTful APIs.',
        'SQL': 'Database management and complex queries. Proficient in database design, optimization, and working with MySQL, SQLite, and MongoDB.',
        'Kotlin': 'Modern Android development with Kotlin. Experience with coroutines, Jetpack components, and building responsive mobile applications with Appetize.io deployment.'
    };
    
    skills.forEach(skill => {
        // Add keyboard accessibility
        skill.setAttribute('tabindex', '0');
        skill.setAttribute('role', 'button');
        
        skill.addEventListener('click', function() {
            activateLanguageSkill(this, skills, desc, descriptions);
        });
        
        skill.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateLanguageSkill(this, skills, desc, descriptions);
            }
        });
    });
    
    // Activate first skill by default if none active
    const activeSkill = document.querySelector('#languageSkills .skill.active');
    if (!activeSkill && skills.length > 0) {
        activateLanguageSkill(skills[0], skills, desc, descriptions);
    }
}

// Helper function for language skill activation
function activateLanguageSkill(skill, allSkills, descElement, descriptions) {
    // Remove active class from all skills
    allSkills.forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked skill
    skill.classList.add('active');
    
    // Update description
    const lang = skill.getAttribute('data-lang');
    descElement.textContent = descriptions[lang] || 'Description available soon.';
    descElement.style.opacity = '1';
}

// ===== TECHNOLOGY TOGGLE FUNCTIONS =====

// Function to initialize technology toggle functionality
function initializeTechnologyToggle() {
    const techItems = document.querySelectorAll('.tech-item');
    
    if (techItems.length === 0) return;
    
    techItems.forEach(item => {
        const toggle = item.querySelector('.tech-toggle');
        const description = item.querySelector('.tech-description');
        
        if (!toggle || !description) return;
        
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
        
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

// ===== MOBILE FEATURES =====

// Mobile-specific JavaScript with error handling
function initializeMobileFeatures() {
    try {
        // Handle touch events for better mobile experience
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Add touch feedback for interactive elements
            document.addEventListener('touchstart', function() {}, {passive: true});
            
            // Prevent zoom on double tap for interactive elements
            const interactiveElements = document.querySelectorAll('button, a, .tech-item, .project-card');
            interactiveElements.forEach(el => {
                el.style.touchAction = 'manipulation';
            });
        }
        
        // Handle viewport height issues on mobile
        const setViewportHeight = debounce(() => {
            try {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            } catch (error) {
                console.warn('Viewport height setting failed:', error);
            }
        }, 100);
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);
        
        // Improve scrolling performance on mobile
        if ('scrollBehavior' in document.documentElement.style) {
            const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
            smoothScrollElements.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    } catch (error) {
        console.error('Mobile features initialization failed:', error);
    }
}

// ===== TYPEWRITER EFFECT =====

// Advanced Typewriter Effect
function initializeTypewriter() {
    const texts = [
        "Full-Stack Developer",
        "Software Engineer", 
        "Android Developer",
        "Kotlin Developer",
        "Web Developer",
        "Problem Solver",
        "Java Programmer",
        "JavaScript Developer",
        "AI Developer",
        "Mobile App Developer",
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
    if (!footerSection) return;
    
    fetch('sections/footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer file not found');
            return response.text();
        })
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

// Universal Scroll to Top with debouncing
function initializeScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
        
        // Use debounced scroll handler
        const scrollHandler = debounce(() => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        }, 100);
        
        window.addEventListener('scroll', scrollHandler);
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
            // For external page links
        };
    });
}

// ===== GITHUB PROJECTS FUNCTIONS =====

// Load real projects from GitHub with caching and timeout
async function loadGitHubProjects() {
    const loadingElement = document.getElementById('projects-loading');
    
    try {
        console.log('Loading GitHub projects...');
        
        // Show loading state
        if (loadingElement) {
            loadingElement.style.display = 'block';
            loadingElement.innerHTML = '<div class="loading-spinner">Loading projects...</div>';
        }
        
        // Check cache first
        if (githubCache.data && githubCache.timestamp && 
            (Date.now() - githubCache.timestamp) < githubCache.ttl) {
            console.log('Using cached GitHub data');
            processProjects(githubCache.data);
            return;
        }
        
        // Add timeout for slow connections
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch('https://api.github.com/users/sidney081/repos?sort=updated&per_page=20', {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Cache the data
        githubCache.data = repos;
        githubCache.timestamp = Date.now();
        
        processProjects(repos);
        
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        if (error.name === 'AbortError') {
            console.log('GitHub request timed out');
        }
        showFallbackProjects();
    } finally {
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
}

// Process projects after loading - FIXED VERSION
function processProjects(repos) {
    console.log('Processing repos:', repos);
    
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
    
    // DEBUG: Log all repo names to see what we're working with
    console.log('All repository names:', repos.map(repo => repo.name));
    
    const completedProjects = [];
    const inProgressProjects = [];
    
    // Categorize projects - SIMPLIFIED LOGIC
    repos.forEach(repo => {
        // Skip forks
        if (repo.fork) {
            console.log(`Skipping fork: ${repo.name}`);
            return;
        }
        
        // Check if this is one of our main projects
        const isMainProject = Object.keys(PROJECT_URLS).includes(repo.name);
        
        if (isMainProject) {
            console.log(`Found main project: ${repo.name}`);
            completedProjects.push(repo);
        } else {
            // For other repos, use simple completion check
            const isCompleted = checkIfProjectIsCompleted(repo);
            if (isCompleted) {
                completedProjects.push(repo);
            } else {
                inProgressProjects.push(repo);
            }
        }
    });
    
    console.log('Completed projects:', completedProjects.length);
    console.log('In progress projects:', inProgressProjects.length);
    
    // Always show fallback projects to ensure main projects are displayed
    if (completedProjects.length === 0 && inProgressProjects.length === 0) {
        console.log('No projects found, showing fallback');
        showFallbackProjects();
    } else {
        // Display projects from GitHub
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

// Enhanced project display with ALWAYS VISIBLE buttons including Appetize demo
function displayProjects(projects, type) {
    const containerId = type === 'completed' ? 'completed-projects-grid' : 'inprogress-projects-grid';
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container not found: ${containerId}`);
        return;
    }
    
    if (projects.length === 0) {
        console.log(`No ${type} projects to display`);
        container.innerHTML = '<p class="no-projects">No projects found in this category.</p>';
        return;
    }
    
    console.log(`Displaying ${projects.length} ${type} projects`);
    
    container.innerHTML = projects.map(repo => {
        const projectData = PROJECT_URLS[repo.name] || {
            live: repo.homepage || '#',
            github: repo.html_url,
            description: repo.description || 'A software project demonstrating various development skills and technologies.',
            features: getDefaultFeatures(repo),
            technologies: [repo.language || 'Various Technologies']
        };

        return `
        <div class="project-card show">
            <div class="badge ${type === 'completed' ? 'completed-badge' : 'inprogress-badge'}">
                ${type === 'completed' ? 'Completed' : 'In Progress'}
            </div>
            <div class="repo-header">
                <h3>${formatProjectName(repo.name)}</h3>
                <div class="repo-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
            <div class="screenshot-container">
                <div class="project-screenshot" style="background: linear-gradient(135deg, ${getRandomColor()});">
                    <div class="screenshot-placeholder">
                        <i class="fas fa-code"></i>
                        <p>${formatProjectName(repo.name)}</p>
                    </div>
                </div>
            </div>
            
            <!-- ALWAYS VISIBLE ACTION BUTTONS -->
            <div class="project-actions">
                ${projectData.live && projectData.live !== '#' ? 
                    `<a href="${projectData.live}" class="action-btn" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                     </a>` : ''}
                ${projectData.appetize ? 
                    `<a href="${projectData.appetize}" class="action-btn" target="_blank" rel="noopener" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                        <i class="fas fa-mobile-alt"></i> Mobile Demo
                     </a>` : ''}
                <a href="${projectData.github}" class="action-btn secondary" target="_blank" rel="noopener">
                    <i class="fab fa-github"></i> Source Code
                </a>
            </div>
            
            <p class="repo-description">
                ${projectData.description}
            </p>
            <div class="project-features">
                <h4><i class="fas fa-list-check"></i> Key Features:</h4>
                <ul>
                    ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="tech-stack">
                ${projectData.technologies.map(tech => `<span class="language-tag">${tech}</span>`).join('')}
                ${repo.topics ? repo.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('') : ''}
            </div>
            <div class="repo-footer">
                <span><i class="fas fa-calendar-alt"></i> Updated ${formatDate(repo.updated_at)}</span>
                <span><i class="fas fa-code"></i> ${repo.language || 'Multiple Languages'}</span>
            </div>
        </div>
        `;
    }).join('');
}

// Helper function for default features
function getDefaultFeatures(repo) {
    if (repo.description && repo.description.toLowerCase().includes('movie')) {
        return ['Movie search functionality', 'User interface', 'Data management', 'Web application'];
    } else if (repo.description && repo.description.toLowerCase().includes('python')) {
        return ['Python scripts', 'Code examples', 'Learning materials', 'Programming concepts'];
    } else if (repo.description && repo.description.toLowerCase().includes('security') || repo.name.toLowerCase().includes('safeshell')) {
        return ['Security monitoring', 'Threat detection', 'Safe browsing', 'Mobile optimization'];
    } else {
        return ['Code implementation', 'Problem solving', 'Software development', 'Technical documentation'];
    }
}

// Show fallback projects when GitHub API fails
function showFallbackProjects() {
    console.log('🛟 Showing enhanced fallback projects with live demos');
    
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
    
    // Create fallback projects using our URL configuration
    const fallbackProjects = Object.keys(PROJECT_URLS).map(projectName => ({
        name: projectName,
        description: PROJECT_URLS[projectName].description,
        language: PROJECT_URLS[projectName].technologies[0],
        stargazers_count: Math.floor(Math.random() * 10) + 1,
        forks_count: Math.floor(Math.random() * 5),
        updated_at: new Date().toISOString(),
        html_url: PROJECT_URLS[projectName].github,
        homepage: PROJECT_URLS[projectName].live,
        topics: PROJECT_URLS[projectName].technologies.slice(0, 3)
    }));
    
    // Display enhanced fallback projects
    if (completedSection) {
        displayProjects(fallbackProjects, 'completed');
        completedSection.style.display = 'block';
    }
    if (inprogressSection) {
        // Show first 2 projects as "in progress"
        displayProjects(fallbackProjects.slice(0, 2), 'inprogress');
        inprogressSection.style.display = 'block';
    }
    
    console.log('✅ Enhanced fallback projects with live demos displayed');
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

// ===== SKILL PROGRESS BARS =====

// Initialize skill progress bars
function initializeSkillProgress() {
    const progressBars = document.querySelectorAll('.level-progress');
    
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        // Animate the progress bar
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 300);
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

function formatProjectName(name) {
    return name.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

// ===== APPETIZE.IO DEMO TRACKING =====

// Track Appetize demo views
function trackAppetizeDemo(projectName) {
    console.log(`Appetize demo viewed for: ${projectName}`);
    // You can add analytics tracking here
    if (typeof gtag !== 'undefined') {
        gtag('event', 'appetize_demo_view', {
            'project_name': projectName,
            'event_category': 'engagement'
        });
    }
}

// Initialize Appetize demo tracking
function initializeAppetizeTracking() {
    const appetizeLinks = document.querySelectorAll('a[href*="appetize.io"]');
    appetizeLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard ? projectCard.querySelector('h3').textContent : 'Unknown';
            trackAppetizeDemo(projectName);
        });
    });
}

// Re-initialize tracking when projects are loaded
const originalDisplayProjects = displayProjects;
displayProjects = function(projects, type) {
    originalDisplayProjects(projects, type);
    setTimeout(initializeAppetizeTracking, 100);
};

console.log('Portfolio JS loaded - enhanced with live project demos, mobile demos, and always visible buttons');