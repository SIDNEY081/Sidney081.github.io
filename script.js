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
    document.getElementById("githubStats").src = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${theme}`;
    document.getElementById("topLangs").src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${theme}`;
    document.getElementById("streak").src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${theme}`;
}

// ---------- Programming Language Descriptions ----------
const langDescriptions = {
  "C": "Low-level language used for system programming and embedded systems.",
  "C++": "Object-oriented extension of C, great for performance-critical applications.",
  "Java": "Versatile language used in Android development and enterprise systems.",
  "JavaScript": "Core language of the web, used for dynamic front-end behavior.",
  "Python": "Popular for AI, ML, scripting, and rapid development.",
  "PHP": "Server-side scripting language for web development.",
  "SQL": "Language for managing and querying relational databases.",
  "MATLAB": "Used for numerical computing, simulations, and engineering applications."
};

document.querySelectorAll('#languageSkills .skill').forEach(el => {
  el.addEventListener('click', () => {
    const lang = el.getAttribute('data-lang');
    const description = langDescriptions[lang] || "No description available.";
    const descElement = document.getElementById('langDescription');
    descElement.textContent = description;
    descElement.classList.add('show');
  });
});

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "https://via.placeholder.com/400x200/333/fff?text=Project+Screenshot";

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
    "Movie_Finding_Made_Easy": "JavaScript",
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

    card.innerHTML = `
        <div class="badge">${isInProgress ? "In Progress" : "Completed"}</div>
        <div class="repo-header">
            <h3>${formatProjectName(repo.name)}</h3>
            <div class="repo-stats">
                <span class="stars">⭐ ${repo.stargazers_count}</span>
                <span class="forks">🍴 ${repo.forks_count}</span>
            </div>
        </div>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${placeholderScreenshot}" alt="${repo.name} Screenshot">
            <a class="overlay-link" href="${repo.html_url}" target="_blank">View Repository</a>
        </div>
        <p class="repo-description">${repo.description || "No description provided."}</p>
        <div class="repo-footer">
            <span class="language">${correctLanguage}</span>
            <span class="timestamp">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
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
    
    // Always mark these as COMPLETED
    if (completedProjects.includes(name) || completedProjects.includes(nameLower)) {
        return false; // false = Completed
    }
    
    // Mark SafeShell and Movie projects as IN PROGRESS
    const inProgressProjects = ["safeshell", "movie", "chatbot"];
    if (inProgressProjects.some(project => nameLower.includes(project))) {
        return true; // true = In Progress
    }
    
    // Default to Completed for everything else
    return false;
}

// Fetch ALL repositories dynamically from GitHub
async function fetchAllRepos() {
    try {
        console.log("Fetching ALL repositories from GitHub...");
        
        // Fetch personal repositories
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        let allRepos = await response.json();
        console.log(`Fetched ${allRepos.length} repositories from GitHub`);

        // Filter out forked repositories
        const originalRepos = allRepos.filter(repo => !repo.fork);
        console.log(`Total original repositories: ${originalRepos.length}`);

        // Log all found repositories
        console.log("All repositories found:");
        originalRepos.forEach(repo => {
            console.log(`- ${repo.name} (${repo.language || 'No language'}) - ${repo.html_url}`);
        });

        // If no repos found, use sample data
        if (originalRepos.length === 0) {
            console.log("No repositories found, using sample data");
            return getSampleProjects();
        }

        return originalRepos;
        
    } catch (err) {
        console.error("Error fetching repos from GitHub:", err);
        console.log("Using sample projects instead...");
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
            fork: false
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
            fork: false
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
            fork: false
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
            fork: false
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
            fork: false
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
        commits: recentCommits
      });
      
    } catch (error) {
      console.error('Error loading GitHub stats:', error);
      // Set default values if API fails
      this.updateStatsDisplay({
        followers: 8,
        repos: 12,
        stars: 15,
        commits: 24
      });
    }
  }

  async getRecentCommitCount() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.username}/events?per_page=50`);
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

  updateStatsDisplay(stats) {
    document.getElementById('followersCount').textContent = stats.followers;
    document.getElementById('reposCount').textContent = stats.repos;
    document.getElementById('starsCount').textContent = stats.stars;
    document.getElementById('commitsCount').textContent = stats.commits;
  }

  updateLiveStats() {
    // Animate counter for engagement
    setTimeout(() => {
      const counters = document.querySelectorAll('.stat-card h3');
      counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        this.animateCounter(counter, 0, target, 2000);
      });
    }, 1000);
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

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initializing...');
    AOS.init({ 
        duration: 800, 
        once: true,
        offset: 100
    });
    updateTheme();
    loadProjects();
    new GitHubPortfolio();
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    console.log('Portfolio initialized successfully!');
});