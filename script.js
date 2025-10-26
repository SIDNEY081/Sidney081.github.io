// ---------- Theme Toggle ----------
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const githubUsername = "SIDNEY081";

let isLight = localStorage.getItem("theme") === "light";
document.body.classList.toggle("light", isLight);
updateTheme();

toggleBtn.addEventListener("click", () => {
    isLight = !isLight;
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateTheme();
});

function updateTheme() {
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    themeText.textContent = isLight ? "Light Mode" : "Dark Mode";

    const theme = isLight ? "default" : "radical";
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}&hide_border=true&bg_color=00000000`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}&hide_border=true&bg_color=00000000`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}&hide_border=true&background=00000000`;
}

// ---------- Programming Language Descriptions ----------
const langDescriptions = {
    "C": "Low-level language used for system programming, embedded systems, and performance-critical applications. Perfect for hardware interaction and operating systems.",
    "C++": "Object-oriented extension of C, great for game development, high-performance applications, and system software. Combines low-level control with high-level features.",
    "Java": "Versatile, platform-independent language used in Android development, enterprise systems, and large-scale web applications. Strong emphasis on object-oriented principles.",
    "JavaScript": "Core language of the web, used for dynamic front-end behavior, interactive web applications, and server-side development with Node.js.",
    "Python": "Popular for AI, ML, data science, scripting, and rapid development. Known for its simplicity, readability, and extensive library ecosystem.",
    "PHP": "Server-side scripting language designed for web development. Powers content management systems like WordPress and e-commerce platforms.",
    "SQL": "Structured Query Language for managing and querying relational databases. Essential for data storage, retrieval, and manipulation in web applications.",
    "MATLAB": "Used for numerical computing, simulations, data analysis, and engineering applications. Popular in academic research and engineering fields."
};

document.querySelectorAll('#languageSkills .skill').forEach(el => {
    el.addEventListener('click', () => {
        const lang = el.getAttribute('data-lang');
        const description = langDescriptions[lang] || "No description available.";
        const descElement = document.getElementById('langDescription');
        descElement.textContent = description;
        descElement.classList.add('show');
        
        // Remove show class after 5 seconds
        setTimeout(() => {
            descElement.classList.remove('show');
        }, 5000);
    });
});

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");

// List of projects that should always appear as Completed
const completedProjects = [
    "Python-Learning", "python-learning", "python_learning",
    "mictseta_recruitment_system", "MICT-SETA", "mictseta",
    "AI-Stroke-Shield", "ai-stroke-shield", "stroke-shield"
];

// Manual language overrides for specific projects
const languageOverrides = {
    "mictseta_recruitment_system": "Python",
    "MICT-SETA": "Python",
    "mictseta": "Python",
    "Python-Learning": "Python",
    "python-learning": "Python",
    "AI-Stroke-Shield": "Python",
    "ai-stroke-shield": "Python",
    "SafeShell": "Java",
    "safeshell": "Java",
    "Movie_Finding_Made_Easy": "PHP",
    "Movie-Finder": "JavaScript"
};

// Project Filtering
document.querySelectorAll(".project-filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".project-filters button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const filter = btn.getAttribute("data-filter");
        document.querySelectorAll(".project-card").forEach(card => {
            if (filter === "all") {
                card.style.display = "block";
            } else if (filter === "completed" && card.classList.contains("completed")) {
                card.style.display = "block";
            } else if (filter === "inprogress" && card.classList.contains("inprogress")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// Create a project card
function createProjectCard(repo, isInProgress) {
    const card = document.createElement("div");
    card.className = `project-card ${isInProgress ? "inprogress" : "completed"}`;

    // Highlight based on project name
    const repoName = repo.name.toLowerCase();
    if (repoName.includes('safe')) card.classList.add('safeshell-highlight');
    if (repoName.includes('stroke')) card.classList.add('ai-highlight');
    if (repoName.includes('movie')) card.classList.add('movie-highlight');
    if (repoName.includes('mictseta')) card.classList.add('mictseta-highlight');
    if (repoName.includes('python')) card.classList.add('python-highlight');

    // Get correct language (use override if available, otherwise use GitHub's detection)
    const correctLanguage = getCorrectLanguage(repo.name, repo.language);
    
    // Get screenshot URL
    const screenshotUrl = getProjectScreenshot(repo.name);
    
    // Calculate days since last update
    const lastUpdated = new Date(repo.updated_at);
    const daysAgo = Math.floor((new Date() - lastUpdated) / (1000 * 60 * 60 * 24));

    card.innerHTML = `
        <div class="badge ${isInProgress ? 'inprogress-badge' : 'completed-badge'}">
            ${isInProgress ? "🚧 In Progress" : "✅ Completed"}
        </div>
        <div class="repo-header">
            <h3>${formatProjectName(repo.name)}</h3>
            <div class="repo-stats">
                <span class="stars" title="Stars">⭐ ${repo.stargazers_count}</span>
                <span class="forks" title="Forks">🍴 ${repo.forks_count}</span>
                <span class="size" title="Repository Size">📦 ${(repo.size / 1024).toFixed(1)}MB</span>
            </div>
        </div>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${screenshotUrl}" alt="${repo.name} Screenshot" loading="lazy">
            <div class="overlay-links">
                <a class="overlay-link repo-link" href="${repo.html_url}" target="_blank" title="View Code">
                    📁 Repository
                </a>
                ${repo.homepage ? `
                <a class="overlay-link demo-link" href="${repo.homepage}" target="_blank" title="Live Demo">
                    🌐 Live Demo
                </a>
                ` : ''}
            </div>
        </div>
        <p class="repo-description">${repo.description || "No description provided."}</p>
        <div class="tech-stack">
            <span class="language-tag">${correctLanguage}</span>
            ${repo.topics && repo.topics.length > 0 ? 
                repo.topics.slice(0, 3).map(topic => 
                    `<span class="topic-tag">${topic}</span>`
                ).join('') : ''}
        </div>
        <div class="repo-footer">
            <span class="timestamp" title="Last updated ${lastUpdated.toLocaleDateString()}">
                Updated: ${daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
            </span>
            <span class="visibility">${repo.private ? '🔒 Private' : '🌍 Public'}</span>
        </div>
    `;
    return card;
}

// Get correct language for project (manual overrides)
function getCorrectLanguage(repoName, detectedLanguage) {
    // Check for manual overrides first
    if (languageOverrides[repoName]) {
        return languageOverrides[repoName];
    }
    
    // Check case-insensitive matches
    const repoNameLower = repoName.toLowerCase();
    for (const [key, value] of Object.entries(languageOverrides)) {
        if (key.toLowerCase() === repoNameLower) {
            return value;
        }
    }
    
    // Check partial matches (for projects containing keywords)
    for (const [key, value] of Object.entries(languageOverrides)) {
        if (repoNameLower.includes(key.toLowerCase())) {
            return value;
        }
    }
    
    // Return GitHub's detected language or default
    return detectedLanguage || 'Multiple';
}

// Enhanced screenshot handling
function getProjectScreenshot(repoName) {
    const screenshotMap = {
        'safeshell': 'https://via.placeholder.com/400x200/4A90E2/white?text=SafeShell+Android+App',
        'movie': 'https://via.placeholder.com/400x200/50E3C2/white?text=Movie+Finder+Web+App',
        'stroke': 'https://via.placeholder.com/400x200/9013FE/white?text=AI+Stroke+Detection',
        'mictseta': 'https://via.placeholder.com/400x200/F5A623/white?text=Recruitment+System',
        'python': 'https://via.placeholder.com/400x200/417505/white?text=Python+Projects'
    };
    
    const repoLower = repoName.toLowerCase();
    for (const [key, url] of Object.entries(screenshotMap)) {
        if (repoLower.includes(key)) return url;
    }
    
    return `https://via.placeholder.com/400x200/333/fff?text=${encodeURIComponent(formatProjectName(repoName))}`;
}

// Format project names for better display
function formatProjectName(name) {
    const nameMap = {
        "Movie_Finding_Made_Easy": "Movie Finding Made Easy",
        "Movie-Finder": "Movie Finding Made Easy",
        "mictseta_recruitment_system": "MICT SETA Recruitment System",
        "Python-Learning": "Python Learning Projects",
        "python-learning": "Python Learning Projects",
        "AI-Stroke-Shield": "AI Stroke Shield",
        "SafeShell": "SafeShell Android App"
    };
    return nameMap[name] || name.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Determine project status
function determineProjectStatus(repo) {
    const name = repo.name;
    const nameLower = name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    
    // Always mark these as COMPLETED
    const completedKeywords = ["python-learning", "mictseta", "stroke", "recruitment", "learning", "tutorial"];
    if (completedKeywords.some(keyword => nameLower.includes(keyword))) {
        return false;
    }
    
    // Mark as IN PROGRESS based on various indicators
    const inProgressKeywords = ["safeshell", "movie", "chatbot", "app", "mobile", "web-app"];
    const inProgressDescriptions = ["in progress", "wip", "work in progress", "developing", "under development"];
    
    if (inProgressKeywords.some(keyword => nameLower.includes(keyword)) ||
        inProgressDescriptions.some(desc => description.includes(desc))) {
        return true;
    }
    
    // Default: Assume completed if it has meaningful activity
    const hasRecentActivity = new Date(repo.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const hasStars = repo.stargazers_count > 0;
    
    return !(hasRecentActivity || hasStars);
}

// Fetch ALL repositories dynamically from GitHub with pagination
async function fetchAllRepos() {
    try {
        console.log("Fetching ALL repositories from GitHub...");
        
        let allRepos = [];
        let page = 1;
        let hasMore = true;

        // Fetch all pages of repositories
        while (hasMore) {
            const response = await fetch(
                `https://api.github.com/users/${githubUsername}/repos?per_page=100&page=${page}&sort=updated`
            );
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const repos = await response.json();
            
            if (repos.length === 0) {
                hasMore = false;
            } else {
                allRepos = allRepos.concat(repos);
                page++;
                
                // Safety limit to prevent infinite loops
                if (page > 10) {
                    console.warn("Reached page limit, stopping fetch");
                    hasMore = false;
                }
            }
        }

        console.log(`Fetched ${allRepos.length} total repositories from GitHub`);

        // Filter out forked repositories
        const originalRepos = allRepos.filter(repo => !repo.fork);
        console.log(`Total original repositories: ${originalRepos.length}`);

        // Enhanced logging for debugging
        console.table(originalRepos.map(repo => ({
            Name: repo.name,
            Language: repo.language,
            Stars: repo.stargazers_count,
            Updated: new Date(repo.updated_at).toLocaleDateString()
        })));

        return originalRepos.length > 0 ? originalRepos : getSampleProjects();
        
    } catch (err) {
        console.error("Error fetching repos from GitHub:", err);
        console.log("Using sample projects as fallback...");
        return getSampleProjects();
    }
}

// Sample projects as fallback
function getSampleProjects() {
    return [
        {
            name: "SafeShell",
            full_name: "SIDNEY081/SafeShell",
            description: "Android safety application with emergency features and real-time location sharing",
            html_url: "https://github.com/SIDNEY081/SafeShell",
            stargazers_count: 2,
            forks_count: 1,
            language: "Java",
            updated_at: new Date().toISOString(),
            fork: false,
            size: 15240,
            private: false,
            topics: ["android", "safety", "emergency", "location"]
        },
        {
            name: "AI-Stroke-Shield",
            full_name: "SIDNEY081/AI-Stroke-Shield",
            description: "AI-powered stroke detection and prevention system using machine learning",
            html_url: "https://github.com/SIDNEY081/AI-Stroke-Shield", 
            stargazers_count: 3,
            forks_count: 1,
            language: "Python",
            updated_at: new Date().toISOString(),
            fork: false,
            size: 28760,
            private: false,
            topics: ["ai", "machine-learning", "healthcare", "stroke-detection"]
        },
        {
            name: "Movie_Finding_Made_Easy",
            full_name: "SIDNEY081/Movie_Finding_Made_Easy",
            description: "Web application for finding movie information with advanced search and filtering",
            html_url: "https://github.com/SIDNEY081/Movie_Finding_Made_Easy",
            stargazers_count: 1,
            forks_count: 0,
            language: "JavaScript",
            updated_at: new Date().toISOString(),
            fork: false,
            size: 12450,
            private: false,
            topics: ["web", "movies", "search", "javascript"]
        },
        {
            name: "mictseta_recruitment_system",
            full_name: "mictseta-recruitment-system/mictseta_recruitment_system",
            description: "MICT SETA Recruitment System - Educational project built with Python",
            html_url: "https://github.com/mictseta-recruitment-system/mictseta_recruitment_system",
            stargazers_count: 0,
            forks_count: 0,
            language: "Python",
            updated_at: new Date().toISOString(),
            fork: false,
            size: 18900,
            private: false,
            topics: ["python", "recruitment", "education", "system"]
        },
        {
            name: "Python-Learning",
            full_name: "SIDNEY081/Python-Learning",
            description: "Python programming learning projects, exercises, and mini-applications",
            html_url: "https://github.com/SIDNEY081/Python-Learning",
            stargazers_count: 0,
            forks_count: 0,
            language: "Python",
            updated_at: new Date().toISOString(),
            fork: false,
            size: 8760,
            private: false,
            topics: ["python", "learning", "exercises", "beginner"]
        }
    ];
}

// Load projects dynamically
async function loadProjects() {
    try {
        console.log('=== LOADING PROJECTS DEBUG ===');
        const allRepos = await fetchAllRepos();
        
        // Clear existing content
        completedContainer.innerHTML = '';
        inProgressContainer.innerHTML = '';
        
        console.log('Total repositories found:', allRepos.length);
        
        if (allRepos.length === 0) {
            console.log('No repositories found, showing placeholder');
            completedContainer.innerHTML = '<div class="project-placeholder"><p>No projects found. Check back soon!</p></div>';
            return;
        }

        // Sort by update date (newest first)
        allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        console.log('=== DISPLAYING PROJECTS ===');
        allRepos.forEach((repo, index) => {
            const isInProgress = determineProjectStatus(repo);
            const correctLanguage = getCorrectLanguage(repo.name, repo.language);
            
            console.log(`${index + 1}. ${repo.name}`);
            console.log(`   - Description: ${repo.description}`);
            console.log(`   - Language: ${repo.language} -> ${correctLanguage}`);
            console.log(`   - Status: ${isInProgress ? 'In Progress' : 'Completed'}`);
            console.log(`   - URL: ${repo.html_url}`);
            
            const card = createProjectCard(repo, isInProgress);
            const container = isInProgress ? inProgressContainer : completedContainer;
            container.appendChild(card);
            
            // Add animation with staggered delay
            setTimeout(() => card.classList.add("show"), index * 100);
        });

        console.log(`✅ Successfully loaded ${allRepos.length} projects`);
        
        // Check if containers have content
        console.log('In Progress container children:', inProgressContainer.children.length);
        console.log('Completed container children:', completedContainer.children.length);
        
    } catch (error) {
        console.error('❌ Error loading projects:', error);
        completedContainer.innerHTML = '<div class="project-placeholder"><p>Unable to load projects at the moment. Please check my GitHub directly.</p></div>';
    }
}

// ========== GitHub Portfolio Stats ==========
class GitHubPortfolio {
  constructor() {
    this.username = githubUsername;
    this.init();
  }

  async init() {
    await this.loadUserStats();
    this.updateLiveStats();
    this.loadContributionGraph();
  }

  async loadUserStats() {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${this.username}`),
        fetch(`https://api.github.com/users/${this.username}/repos?per_page=100`)
      ]);
      
      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to fetch GitHub data');
      }
      
      const userData = await userResponse.json();
      const repos = await reposResponse.json();
      const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const recentCommits = await this.getRecentCommitCount();
      
      this.updateStatsDisplay({
        followers: userData.followers,
        repos: userData.public_repos,
        stars: stars,
        commits: recentCommits,
        gists: userData.public_gists,
        following: userData.following
      });
      
    } catch (error) {
      console.error('Error loading GitHub stats:', error);
      // Set default values if API fails
      this.updateStatsDisplay({
        followers: 8,
        repos: 12,
        stars: 15,
        commits: 24,
        gists: 5,
        following: 12
      });
    }
  }

  async getRecentCommitCount() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.username}/events?per_page=100`);
      if (!response.ok) return 12;
      
      const events = await response.json();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return events
        .filter(event => event.type === 'PushEvent' && new Date(event.created_at) > thirtyDaysAgo)
        .reduce((acc, event) => acc + event.payload.commits.length, 0);
        
    } catch (error) {
      console.error('Error loading commit count:', error);
      return 12;
    }
  }

  loadContributionGraph() {
    const contributionGraph = document.getElementById('contributionGraph');
    if (contributionGraph) {
      contributionGraph.innerHTML = `
        <img src="https://ghchart.rshah.org/${this.username}" 
             alt="${this.username}'s GitHub contribution chart" 
             style="width: 100%; border-radius: 10px;">
      `;
    }
  }

  updateStatsDisplay(stats) {
    const statElements = {
      'followersCount': stats.followers,
      'reposCount': stats.repos,
      'starsCount': stats.stars,
      'commitsCount': stats.commits,
      'gistsCount': stats.gists,
      'followingCount': stats.following
    };
    
    Object.entries(statElements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        this.animateCounter(element, 0, value, 1500);
      }
    });
  }

  animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}

// ---------- Enhanced Smooth Scrolling ----------
function initSmoothScrolling() {
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle external links
            if (targetId.startsWith('http') || targetId.startsWith('mailto') || targetId.startsWith('tel')) {
                return; // Let default behavior handle external links
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ---------- Scroll to Top Functionality ----------
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Portfolio initializing...');
    
    // Initialize AOS
    AOS.init({ 
        duration: 800, 
        once: true,
        offset: 100 
    });
    
    // Set initial theme
    updateTheme();
    
    // Initialize functionality
    loadProjects();
    new GitHubPortfolio();
    initScrollToTop();
    initSmoothScrolling();
    
    console.log('✅ Portfolio initialized successfully!');
});
