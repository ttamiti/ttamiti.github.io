(function () {
  const githubUser = "ttamiti";

  function formatDate(value) {
    const date = new Date(value + "T00:00:00");
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  async function renderUpdates(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const limit = Number(target.dataset.feedLimit || 0);
    try {
      const response = await fetch("updates.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Updates feed unavailable");
      const items = (await response.json())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      const visibleItems = limit > 0 ? items.slice(0, limit) : items;

      if (!visibleItems.length) {
        target.innerHTML = '<article class="status-card"><p>No updates have been posted yet.</p></article>';
        return;
      }

      target.innerHTML = visibleItems.map((item) => {
        const link = item.url ? `<a href="${escapeHtml(item.url)}">Read more</a>` : "";
        return `
          <article class="update-card">
            <span>${escapeHtml(item.type)} · ${formatDate(item.date)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            ${link}
          </article>
        `;
      }).join("");
    } catch (error) {
      target.innerHTML = '<article class="status-card"><p>Updates are temporarily unavailable.</p></article>';
    }
  }

  async function renderRepos() {
    const list = document.getElementById("repo-list");
    const status = document.getElementById("repo-status");
    if (!list || !status) return;

    try {
      const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`);
      if (!response.ok) throw new Error("GitHub repositories unavailable");
      const repos = (await response.json())
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      if (!repos.length) {
        status.textContent = "No public repositories were found for this profile yet.";
        list.innerHTML = `
          <article class="status-card">
            <h3>GitHub profile</h3>
            <p>Repositories will appear here automatically when public repositories are available.</p>
            <a href="https://github.com/${githubUser}">Visit GitHub profile</a>
          </article>
        `;
        return;
      }

      status.textContent = `${repos.length} public repositories loaded from GitHub.`;
      list.innerHTML = repos.map((repo) => {
        const language = repo.language ? `<span>${escapeHtml(repo.language)}</span>` : "";
        const description = repo.description || "No description provided.";
        const homepage = repo.homepage ? `<a href="${escapeHtml(repo.homepage)}">Project site</a>` : "";
        return `
          <article class="repo-card">
            <div>
              <h3>${escapeHtml(repo.name)}</h3>
              <p>${escapeHtml(description)}</p>
            </div>
            <div class="repo-meta">
              ${language}
              <span>Stars ${repo.stargazers_count}</span>
              <span>Forks ${repo.forks_count}</span>
              <span>Updated ${formatDate(repo.updated_at.slice(0, 10))}</span>
            </div>
            <div class="repo-links">
              <a href="${escapeHtml(repo.html_url)}">View repository</a>
              ${homepage}
            </div>
          </article>
        `;
      }).join("");
    } catch (error) {
      status.textContent = "GitHub repositories are temporarily unavailable.";
      list.innerHTML = `
        <article class="status-card">
          <h3>GitHub profile</h3>
          <p>Live repository loading failed. You can still visit the profile directly.</p>
          <a href="https://github.com/${githubUser}">Visit GitHub profile</a>
        </article>
      `;
    }
  }

  renderUpdates("home-updates");
  renderUpdates("updates-feed");
  renderRepos();
})();
