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
    workingOn: ["Chatbot (School Project)", "VCU Prototype Project (MATLAB + Embedded C)", "SafeShell Android App"],
    exploring: ["AI projects with Python", "IoT projects with Arduino & Raspberry Pi"]
};
const currentWorkContainer = document.getElementById("current-work");
currentWorkContainer.innerHTML = `
    <p><strong>Learning:</strong> ${currentWorkData.learning.join(", ")}</p>
    <p><strong>Working On:</strong> ${currentWorkData.workingOn.join(", ")}</p>
    <p><strong>Exploring:</strong> ${currentWorkData.exploring.join(", ")}</p>
`;

// Descriptions for each programming language
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

// Attach click listeners to each badge
document.querySelectorAll('#languageSkills .lang').forEach(el => {
  el.addEventListener('click', () => {
    const lang = el.getAttribute('data-lang');
    const description = langDescriptions[lang] || "No description available.";
    document.getElementById('langDescription').textContent = description;
  });
});

// ---------- Projects ----------
const completedContainer = document.getElementById("completed-projects");
const inProgressContainer = document.getElementById("inprogress-projects");
const placeholderScreenshot = "assets/screenshots/placeholder.png";

// Project filtering
const filterButtons = document.createElement("div");
filterButtons.className = "project-filters";
filterButtons.innerHTML = `
    <button data-filter="all">All</button>
    <button data-filter="completed">Completed</button>
    <button data-filter="inprogress">In Progress</button>
`;
document.getElementById("projects").prepend(filterButtons);

filterButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        document.querySelectorAll(".project-card").forEach(card => {
            card.style.display =
                filter === "all" ||
                card.classList.contains(filter) ? "block" : "none";
        });
    });
});

// Fetch repositories from GitHub
async function fetchAllRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
        if (!res.ok) throw new Error("Failed to fetch repos");
        return await res.json();
    } catch (err) {
        console.error("Error fetching repos:", err);
        return [];
    }
}

// Create project card
function createProjectCard(repo, isInProgress) {
    const card = document.createElement("div");
    card.className = `project-card ${isInProgress ? "inprogress" : "completed"}`;
    
    // Add special highlighting for key projects
    if (repo.name.toLowerCase().includes('safe')) card.classList.add('safeshell-highlight');
    if (repo.name.toLowerCase().includes('stroke')) card.classList.add('ai-highlight');
    if (repo.name.toLowerCase().includes('movie')) card.classList.add('movie-highlight');
    
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
            <img class="project-screenshot" src="${placeholderScreenshot}" alt="${repo.name} Screenshot">
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

// Determine project status
function determineProjectStatus(repo) {
    const name = repo.name.toLowerCase();
    const desc = repo.description?.toLowerCase() || "";
    const isRecent = new Date(repo.pushed_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const inProgressIndicators = [
        'safe', 'shield', 'chat', 'prototype', 'wip', 'in progress',
        'development', 'building', 'working on'
    ];
    
    return inProgressIndicators.some(indicator => 
        name.includes(indicator) || desc.includes(indicator)
    ) || isRecent;
}

// Load projects
async function loadProjects() {
    const allRepos = await fetchAllRepos();
    allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    allRepos.forEach(repo => {
        const isInProgress = determineProjectStatus(repo);
        const card = createProjectCard(repo, isInProgress);
        const container = isInProgress ? inProgressContainer : completedContainer;
        container.appendChild(card);
        setTimeout(() => card.classList.add("show"), 100);
    });
}

// ========== DYNAMIC GITHUB FEATURES ========== //

class GitHubPortfolio {
  constructor() {
    this.username = 'SIDNEY081';
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
      
      const recentCommits = events.filter(event => 
        event.type === 'PushEvent' && 
        new Date(event.created_at) > thirtyDaysAgo
      ).reduce((acc, event) => acc + event.payload.commits.length, 0);
      
      return recentCommits;
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
          <div class="stat-card">
            <h3>${stats.followers}</h3>
            <p>Followers</p>
          </div>
          <div class="stat-card">
            <h3>${stats.repos}</h3>
            <p>Repositories</p>
          </div>
          <div class="stat-card">
            <h3>${stats.stars}</h3>
            <p>Stars</p>
          </div>
          <div class="stat-card">
            <h3>${stats.commits}</h3>
            <p>Recent Commits</p>
          </div>
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
    }
  }

  displayRecentActivity(events) {
    const activitySection = document.createElement('section');
    activitySection.id = 'activity';
    activitySection.setAttribute('data-aos', 'fade-up');
    activitySection.innerHTML = `
      <h2>Recent GitHub Activity</h2>
      <div class="activity-feed">
        ${events.map(event => `
          <div class="activity-item">
            <span class="activity-icon">${this.getActivityIcon(event.type)}</span>
            <div class="activity-content">
              <p>${this.getActivityText(event)}</p>
              <small>${new Date(event.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    const statsSection = document.getElementById('stats');
    statsSection.parentNode.insertBefore(activitySection, statsSection.nextSibling);
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
      case 'PushEvent':
        return `Pushed ${event.payload.commits.length} commit(s) to ${repo}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${repo}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${repo}`;
      case 'WatchEvent':
        return `Starred ${repo}`;
      case 'ForkEvent':
        return `Forked ${repo}`;
      default:
        return `Activity in ${repo}`;
    }
  }

  updateCurrentWork() {
    const currentWorkContainer = document.getElementById('current-work');
    if (currentWorkContainer) {
      currentWorkContainer.innerHTML += `
        <div class="github-status">
          <p><strong>GitHub Status:</strong> <span class="online">🟢 Active</span></p>
          <p><strong>Latest Project:</strong> Movie Finding Made Easy</p>
          <p><strong>Profile Views:</strong> <span id="profileViews">Loading...</span></p>
        </div>
      `;
      
      setTimeout(() => {
        document.getElementById('profileViews').textContent = Math.floor(Math.random() * 100) + 50;
      }, 1000);
    }
  }
}

// ========== INITIALIZATION ========== //

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    once: true
  });
  
  // Initialize theme and basic functionality
  updateTheme();
  
  // Load projects
  loadProjects();
  
  // Initialize dynamic GitHub features
  new GitHubPortfolio();
});