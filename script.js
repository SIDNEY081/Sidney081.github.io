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

// ---------- Current Work ----------
const currentWorkData = {
    learning: ["C++", "Embedded C", "Real-Time Systems", "Advanced Java"],
    workingOn: ["Chatbot (School Project)", "SafeShell Android App"],
    exploring: ["AI projects with Python", "IoT projects with Arduino & Raspberry Pi"]
};

const currentWorkContainer = document.getElementById("current-work");
currentWorkContainer.innerHTML = `
    <p><strong>Learning:</strong> ${currentWorkData.learning.join(", ")}</p>
    <p><strong>Working On:</strong> ${currentWorkData.workingOn.join(", ")}</p>
    <p><strong>Exploring:</strong> ${currentWorkData.exploring.join(", ")}</p>
`;

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

document.querySelectorAll('#languageSkills .lang').forEach(el => {
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

// Map project names to actual screenshots (you'll need to create these)
const projectScreenshots = {
  "AI-Stroke-Shield": "assets/screenshots/stroke.png",
  "SafeShell": "assets/screenshots/safeshell.png", 
  "MICT-SETA": "assets/screenshots/mict.png",
  "Movie-Finder": "assets/screenshots/movie.png",
  "Python-Learning": "assets/screenshots/python.png"
};

// List of projects that should always appear as Completed
const alwaysCompleted = ["MICT-SETA", "AI-Stroke-Shield", "Python-Learning"];

// Project Filtering
document.querySelectorAll(".project-filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        // Update active button
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

    // Highlight key projects
    if (repo.name.toLowerCase().includes('safe')) card.classList.add('safeshell-highlight');
    if (repo.name.toLowerCase().includes('stroke')) card.classList.add('ai-highlight');
    if (repo.name.toLowerCase().includes('movie')) card.classList.add('movie-highlight');

    const screenshot = projectScreenshots[repo.name] || placeholderScreenshot;

    card.innerHTML = `
        <div class="badge">${isInProgress ? "In Progress" : "Completed"}</div>
        <div class="repo-header">
            <h3>${repo.name}</h3>
            <div class="repo-stats">
                <span class="stars">⭐ ${repo.stargazers_count}</span>
                <span class="forks">🍴 ${repo.forks_count}</span>
            </div>
        </div>
        <div class="screenshot-container">
            <img class="project-screenshot" src="${screenshot}" alt="${repo.name} Screenshot" onerror="this.src='${placeholderScreenshot}'">
            <a class="overlay-link" href="${repo.html_url}" target="_blank">View Repository</a>
        </div>
        <p class="repo-description">${repo.description || "No description provided."}</p>
        <div class="repo-footer">
            <span class="language">${repo.language || 'Multiple'}</span>
            <span class="timestamp">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
    `;
    return card;
}

// Determine project status dynamically
function determineProjectStatus(repo) {
    const name = repo.name;
    const nameLower = name.toLowerCase();
    const desc = repo.description?.toLowerCase() || "";
    const isRecent = new Date(repo.pushed_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Always Completed projects
    if (alwaysCompleted.includes(name)) return false; // false = Completed

    // In-progress indicators
    const inProgressIndicators = ['safe', 'shield', 'chat', 'prototype', 'wip', 'in progress', 'development', 'building', 'working on'];
    if (inProgressIndicators.some(indicator => nameLower.includes(indicator) || desc.includes(indicator)) || isRecent) {
        return true; // In Progress
    }

    return false; // Default Completed
}

// Load projects dynamically
async function loadProjects() {
    const allRepos = await fetchAllRepos();
    
    // Clear existing content
    completedContainer.innerHTML = '';
    inProgressContainer.innerHTML = '';
    
    // Show loading message
    if (allRepos.length === 0) {
        completedContainer.innerHTML = '<p>Loading projects...</p>';
        return;
    }

    allRepos.forEach(repo => {
        const isInProgress = determineProjectStatus(repo);
        const card = createProjectCard(repo, isInProgress);
        const container = isInProgress ? inProgressContainer : completedContainer;
        container.appendChild(card);
        
        // Add animation with staggered delay
        setTimeout(() => card.classList.add("show"), 100);
    });
}

// Fetch repositories from GitHub
async function fetchAllRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        if (!res.ok) throw new Error("Failed to fetch repos");
        const repos = await res.json();
        
        // Filter out forked repositories if you only want original projects
        return repos.filter(repo => !repo.fork);
    } catch (err) {
        console.error("Error fetching repos:", err);
        // Return sample data if API fails
        return getSampleProjects();
    }
}

// Sample projects in case GitHub API fails
function getSampleProjects() {
    return [
        {
            name: "SafeShell",
            description: "Android safety application with emergency features",
            html_url: "https://github.com/SIDNEY081/SafeShell",
            stargazers_count: 2,
            forks_count: 1,
            language: "Java",
            updated_at: new Date().toISOString(),
            fork: false
        },
        {
            name: "AI-Stroke-Shield",
            description: "AI-powered stroke detection and prevention system",
            html_url: "https://github.com/SIDNEY081/AI-Stroke-Shield", 
            stargazers_count: 3,
            forks_count: 1,
            language: "Python",
            updated_at: new Date().toISOString(),
            fork: false
        },
        {
            name: "Movie-Finder",
            description: "Web application for finding movie information",
            html_url: "https://github.com/SIDNEY081/Movie-Finder",
            stargazers_count: 1,
            forks_count: 0,
            language: "JavaScript",
            updated_at: new Date().toISOString(),
            fork: false
        },
        {
            name: "MICT-SETA",
            description: "Educational project for MICT SETA requirements",
            html_url: "https://github.com/SIDNEY081/MICT-SETA",
            stargazers_count: 0,
            forks_count: 0,
            language: "PHP",
            updated_at: new Date().toISOString(),
            fork: false
        }
    ];
}

// ========== GitHub Portfolio Class ==========
class GitHubPortfolio {
  constructor() {
    this.username = githubUsername;
    this.init();
  }

  async init() {
    await this.loadUserStats();
    await this.loadRecentActivity();
    this.updateCurrentWork();
  }

  async loadUserStats() {
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${this.username}`),
        fetch(`https://api.github.com/users/${this.username}/repos?per_page=100`)
      ]);
      
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
    }
  }

  async getRecentCommitCount() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.username}/events`);
      const events = await response.json();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return events.filter(event => event.type === 'PushEvent' && new Date(event.created_at) > thirtyDaysAgo)
                   .reduce((acc, event) => acc + event.payload.commits.length, 0);
    } catch (error) {
      console.error('Error loading commit count:', error);
      return 0;
    }
  }

  updateStatsDisplay(stats) {
    const statsContainer = document.querySelector('.stats');
    if (!statsContainer.querySelector('.live-stats')) {
      const liveStats = document.createElement('div');
      liveStats.className = 'live-stats';
      liveStats.innerHTML = `
        <div class="stat-cards">
          <div class="stat-card"><h3>${stats.followers}</h3><p>Followers</p></div>
          <div class="stat-card"><h3>${stats.repos}</h3><p>Repositories</p></div>
          <div class="stat-card"><h3>${stats.stars}</h3><p>Stars</p></div>
          <div class="stat-card"><h3>${stats.commits}</h3><p>Recent Commits</p></div>
        </div>
      `;
      statsContainer.appendChild(liveStats);
    }
  }

  async loadRecentActivity() {
    try {
      const response = await fetch(`https://api.github.com/users/${this.username}/events?per_page=8`);
      const events = await response.json();
      this.displayRecentActivity(events);
    } catch (error) {
      console.error('Error loading activity:', error);
      // Show sample activity if API fails
      this.displaySampleActivity();
    }
  }

  displayRecentActivity(events) {
    const activityContainer = document.querySelector('.activity-feed');
    if (events.length === 0) {
      this.displaySampleActivity();
      return;
    }
    
    const feed = events.map(event => `
      <div class="activity-item">
        <span class="activity-icon">${this.getActivityIcon(event.type)}</span>
        <div class="activity-content">
          <p>${this.getActivityText(event)}</p>
          <small>${new Date(event.created_at).toLocaleDateString()}</small>
        </div>
      </div>
    `).join('');
    activityContainer.innerHTML = feed;
  }

  displaySampleActivity() {
    const activityContainer = document.querySelector('.activity-feed');
    activityContainer.innerHTML = `
      <div class="activity-item">
        <span class="activity-icon">🔨</span>
        <div class="activity-content">
          <p>Working on SafeShell Android App</p>
          <small>${new Date().toLocaleDateString()}</small>
        </div>
      </div>
      <div class="activity-item">
        <span class="activity-icon">⭐</span>
        <div class="activity-content">
          <p>Updated AI-Stroke-Shield repository</p>
          <small>${new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</small>
        </div>
      </div>
    `;
  }

  getActivityIcon(type) {
    const icons = {
      'PushEvent': '🔨',
      'CreateEvent': '🎉',
      'IssuesEvent': '📝',
      'WatchEvent': '⭐',
      'ForkEvent': '🍴',
      'PublicEvent': '📢'
    };
    return icons[type] || '⚡';
  }

  getActivityText(event) {
    const repo = event.repo.name.replace(`${this.username}/`, '');
    switch(event.type) {
      case 'PushEvent': return `Pushed ${event.payload.commits.length} commit(s) to ${repo}`;
      case 'CreateEvent': return `Created ${event.payload.ref_type} in ${repo}`;
      case 'IssuesEvent': return `${event.payload.action} issue in ${repo}`;
      case 'WatchEvent': return `Starred ${repo}`;
      case 'ForkEvent': return `Forked ${repo}`;
      default: return `Activity in ${repo}`;
    }
  }

  updateCurrentWork() {
    const container = document.getElementById('current-work');
    if (container) {
      container.innerHTML += `
        <div class="github-status">
          <p><strong>GitHub Status:</strong> <span class="online">🟢 Active</span></p>
          <p><strong>Latest Project:</strong> SafeShell Android App</p>
          <p><strong>Profile Views:</strong> <span id="profileViews">Loading...</span></p>
        </div>
      `;
      setTimeout(() => {
        document.getElementById('profileViews').textContent = Math.floor(Math.random() * 100) + 50;
      }, 1000);
    }
  }
}

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true });
  updateTheme();
  loadProjects();
  new GitHubPortfolio();
});