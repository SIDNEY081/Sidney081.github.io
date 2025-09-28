const username = "Sidney081"; // your GitHub username
const projectsContainer = document.getElementById("projects"); // Completed
const inProgressContainer = document.getElementById("in-progress"); // In Progress

async function fetchRepos() {
  try {
    // 1. Fetch personal repos
    const userReposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const userRepos = await userReposRes.json();

    // 2. Fetch organizations you belong to
    const orgsRes = await fetch(`https://api.github.com/users/${username}/orgs`);
    const orgs = await orgsRes.json();

    let orgRepos = [];

    for (const org of orgs) {
      const orgReposRes = await fetch(`https://api.github.com/orgs/${org.login}/repos?per_page=100`);
      const repos = await orgReposRes.json();
      orgRepos = orgRepos.concat(repos);
    }

    // 3. Merge all repos (personal + orgs)
    const allRepos = [...userRepos, ...orgRepos];

    // 4. Sort by last updated date (newest first)
    allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // 5. Render projects
    displayRepos(allRepos);
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

function displayRepos(repos) {
  repos.forEach(repo => {
    const repoCard = document.createElement("div");
    repoCard.classList.add("repo-card");

    repoCard.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description available."}</p>
      <p><strong>Last Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;

    // Separate repos: if topic/tag "in-progress" → In Progress, else Completed
    if (repo.topics && repo.topics.includes("in-progress")) {
      inProgressContainer.appendChild(repoCard);
    } else {
      projectsContainer.appendChild(repoCard);
    }
  });
}

// Load everything
fetchRepos();
