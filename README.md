# Sidney081.github.io
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sidney Mpenyana Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg-color: #f5f5f5;
    --text-color: #000;
    --heading-color: #1f1f1f;
  }
  body {
    font-family: 'Roboto', sans-serif;
    margin:0; padding:0;
    background: #0d1117;
    color: #fff;
    line-height: 1.6;
    transition: background 0.4s ease, color 0.4s ease;
  }
  body.light {
    background: var(--bg-color);
    color: var(--text-color);
  }
  header {background:#1f1f1f; color:#fff; padding:50px 20px; text-align:center;}
  body.light header {background: var(--heading-color); color: #fff;}
  header img {width:150px; border-radius:50%; margin-bottom:15px; border:3px solid #fff;}
  header h1 {font-size:2.5rem; margin-bottom:10px;}
  header p {font-size:1.2rem;}
  nav {display:flex; justify-content:center; background:#333; position:sticky; top:0; z-index:1000;}
  body.light nav {background:#555;}
  nav a {color:#fff; text-decoration:none; padding:15px 20px; transition:0.3s;}
  nav a:hover {background:#555;}
  section {padding:60px 20px; max-width:1000px; margin:auto;}
  h2 {text-align:center; margin-bottom:40px; font-size:2rem; color:#58a6ff;}
  body.light h2 {color:#1f1f1f;}
  .skills {display:flex; flex-wrap:wrap; justify-content:center; gap:15px;}
  .skill {background:#fff; padding:15px 20px; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1); transition:0.3s; color:#1f1f1f;}
  .skill:hover {transform:translateY(-5px); box-shadow:0 8px 12px rgba(0,0,0,0.2);}
  .projects {display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px;}
  .project-card {background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.1); transition:0.4s; position:relative; overflow:hidden; color:#1f1f1f;}
  .project-card::after {content:''; position:absolute; width:100%; height:100%; top:0; left:-100%; background:linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1)); transition:0.5s;}
  .project-card:hover::after {left:100%;}
  .project-card:hover {transform:translateY(-10px); box-shadow:0 12px 20px rgba(0,0,0,0.2);}
  .project-card h3 {margin-bottom:10px; color:#1f1f1f;}
  .project-card p {font-size:0.95rem;}
  .project-card a {display:inline-block; margin-top:10px; text-decoration:none; color:#fff; background:#1f1f1f; padding:8px 15px; border-radius:5px; transition:0.3s;}
  .project-card a:hover {background:#555;}
  .current-work {display:flex; flex-direction:column; align-items:center; gap:15px; background:#fff; padding:30px 20px; border-radius:10px; box-shadow:0 6px 10px rgba(0,0,0,0.1); max-width:800px; margin:20px auto; color:#1f1f1f;}
  .contact-info {display:flex; flex-direction:column; align-items:center; gap:10px;}
  footer {text-align:center; padding:20px; background:#1f1f1f; color:#fff;}
  body.light footer {background: var(--heading-color); color:#fff;}
  .stats, .graph-container {display:flex; flex-wrap:wrap; justify-content:center; gap:20px; margin-bottom:50px;}
  .stats img, .graph-container img {flex:1 1 300px; max-width:100%; border-radius:10px; box-shadow:0 4px 15px rgba(0,0,0,0.5); transition: transform 0.3s ease;}
  .stats img:hover, .graph-container img:hover {transform: scale(1.03);}
  .animate-on-scroll {opacity:0; transform: translateY(40px); transition: all 0.8s ease-out;}
  .animate-on-scroll.visible {opacity:1; transform:translateY(0);}

  /* Dark/Light Toggle Button */
  .theme-toggle {
    position: fixed;
    top: 15px;
    right: 15px;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #58a6ff;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    transition: background 0.3s ease, transform 0.2s ease, top 0.3s ease;
    z-index: 1100;
  }
  .theme-toggle:hover {transform: scale(1.05);}
  #themeIcon {display:inline-block; transition: transform 0.5s ease; margin-right:8px;}
  .theme-toggle.rotate #themeIcon {transform: rotate(360deg) scale(1.2);}

  /* Back to Top Button */
  #backToTop {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1200;
    background: #58a6ff;
    color: #fff;
    border: none;
    padding: 12px 16px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
  }
  #backToTop.show {
    opacity: 1;
    transform: translateY(0);
  }
  #backToTop:hover {background: #1f78d1; transform: translateY(-3px);}
  body.light #backToTop {background: #1f1f1f; color: #fff;}

  @media(max-width:600px){
    nav {flex-direction:column;}
    .theme-toggle {top:70px;} /* below nav */
  }
  @media(min-width:768px){
    .stats img{flex:1 1 30%; max-width:30%;}
    .graph-container img{max-width:90%;}
  }
</style>
</head>
<body>

<button class="theme-toggle" id="themeToggle"><span id="themeIcon">🌙</span> Dark Mode</button>

<header>
    <img src="assets/profile.jpg" alt="Sidney Mpenyana">
    <h1>Sidney Mpenyana</h1>
    <p>Final-year IT Student | Software Development & Embedded Systems</p>
</header>

<nav>
    <a href="#about">About Me</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#stats">GitHub Stats</a>
    <a href="#current">Currently Learning</a>
    <a href="#contact">Contact</a>
</nav>

<section id="about">
    <h2>About Me</h2>
    <p>Hello! I’m Sidney, a final-year IT student at VUT, passionate about software development and embedded systems. I love building practical projects, from chatbots to embedded vehicle control prototypes. I’m seeking internships where I can apply my skills and continue learning.</p>
</section>

<section id="skills">
    <h2>Skills</h2>
    <div class="skills">
        <div class="skill">C</div><div class="skill">C++</div><div class="skill">Java</div><div class="skill">Python</div>
        <div class="skill">PHP</div><div class="skill">HTML5</div><div class="skill">CSS3</div><div class="skill">SQL</div>
        <div class="skill">Arduino</div><div class="skill">Raspberry Pi</div><div class="skill">MATLAB</div><div class="skill">Linux</div>
        <div class="skill">Git</div><div class="skill">NetBeans</div><div class="skill">VS Code</div><div class="skill">Notepad++</div>
    </div>
</section>

<section id="projects">
    <h2>Projects</h2>
    <div class="projects" id="project-list"></div>
</section>

<section id="stats">
    <h2>GitHub Stats</h2>
    <div class="stats">
        <img class="animate-on-scroll" id="githubStats" src="https://github-readme-stats.vercel.app/api?username=Sidney081&show_icons=true&theme=radical" alt="GitHub Stats">
        <img class="animate-on-scroll" id="topLangs" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Sidney081&layout=compact&theme=radical" alt="Top GitHub Languages">
        <img class="animate-on-scroll" id="streak" src="https://github-readme-streak-stats.herokuapp.com/?user=Sidney081&theme=radical" alt="GitHub Streak">
    </div>
    <div class="graph-container">
        <img class="animate-on-scroll" id="contribGraph" src="https://github-readme-activity-graph.vercel.app/graph?username=Sidney081&theme=radical&hide_border=true" alt="GitHub Contribution Graph">
    </div>
</section>

<section id="current">
    <h2>Currently Learning & Working On</h2>
    <div class="current-work" id="current-work"></div>
</section>

<section id="contact">
    <h2>Contact</h2>
    <div class="contact-info">
        <p>Email: sidneympenyana@gmail.com</p>
        <p>Phone: +27 81 056 5675</p>
        <p>LinkedIn: <a href="#">linkedin.com/in/sidney-mpenyana</a

