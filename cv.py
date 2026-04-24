#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "weasyprint",
# ]
# ///
"""
Generate a beautiful, professional PDF CV from markdown content.
Combines the simplicity of curriculo.md with the comprehensive info from cv.md.
"""

from pathlib import Path
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def create_html_cv():
    """Create the HTML content for the CV."""
    
    # Resolve banner image path for weasyprint file:// URI
    banner_path = Path(__file__).parent / "banner.jpg"
    banner_uri = banner_path.as_uri()
    
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Afonso Caboz">
    <meta name="description" content="Full-Stack Solutions Architect CV">
    <title>Afonso Caboz - CV</title>
</head>
<body>
    <!-- Header with Banner -->
    <header class="header">
        <img class="header-bg" src="{banner_uri}" alt="" />
        <div class="header-overlay"></div>
        <div class="header-content">
            <h1 class="name">AFONSO CABOZ</h1>
            <p class="title">Full-Stack Solutions Architect</p>
            <div class="contact-bar">
                <a href="mailto:afonso.caboz@gmail.com" class="contact-link">afonso.caboz@gmail.com</a>
                <span class="separator">|</span>
                <a href="https://linkedin.com/in/afonsocaboz" class="contact-link">linkedin.com/in/afonsocaboz</a>
                <span class="separator">|</span>
                <a href="https://github.com/CodeZobac" class="contact-link">github.com/CodeZobac</a>
                <span class="separator">|</span>
                <a href="https://www.codezobac.com" class="contact-link">codezobac.com</a>
                <span class="separator">|</span>
                <span class="contact-link">Warsaw, Poland</span>
            </div>
        </div>
    </header>

    <div class="main-layout">
        <!-- LEFT SIDEBAR -->
        <aside class="sidebar">
            <!-- Philosophy -->
            <section class="sidebar-section">
                <h2 class="sidebar-title">PHILOSOPHY</h2>
                <p class="quote">"Code is a liability.<br/>A solution is an asset."</p>
                <p class="quote-sub">My guiding principle is to write the least amount of code necessary to create the most value.</p>
            </section>

            <!-- Tech Stack -->
            <section class="sidebar-section">
                <h2 class="sidebar-title">TECH STACK</h2>

                <h3 class="tech-category-title">Frontend</h3>
                <div class="tech-items">
                    <span class="tech-tag">Next.js</span>
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">TypeScript</span>
                    <span class="tech-tag">Tailwind</span>
                    <span class="tech-tag">Vue.js</span>
                </div>

                <h3 class="tech-category-title">Backend</h3>
                <div class="tech-items">
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">Rust</span>
                    <span class="tech-tag">FastAPI</span>
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">PostgreSQL</span>
                    <span class="tech-tag">MongoDB</span>
                </div>

                <h3 class="tech-category-title">DevOps &amp; Cloud</h3>
                <div class="tech-items">
                    <span class="tech-tag">Docker</span>
                    <span class="tech-tag">Terraform</span>
                    <span class="tech-tag">AWS</span>
                    <span class="tech-tag">Kubernetes</span>
                    <span class="tech-tag">CI/CD</span>
                </div>
            </section>

            <!-- Education -->
            <section class="sidebar-section">
                <h2 class="sidebar-title">EDUCATION</h2>
                <h3 class="edu-degree">Information Systems Programming</h3>
                <p class="edu-school">ETIC Algarve</p>
                <p class="edu-meta">2025 &bull; Final grade: 18/20</p>
            </section>
        </aside>

        <!-- RIGHT MAIN CONTENT -->
        <main class="content">
            <!-- Professional Summary -->
            <p class="summary">
                <strong>Full-stack solutions architect</strong> with a keen eye for detail and a focus on solving business
                problems through technology. My approach is language-agnostic and solution-centered, with proven experience building and deploying scalable applications,
                from <strong>Infrastructure as Code (IaC)</strong> to the final user experience.
            </p>
            <p class="summary">
                Currently completing an <strong>ERASMUS+ professional internship</strong> in Warsaw, applying my end-to-end
                product-building mindset in a dynamic, international environment.
            </p>

            <!-- Selected Projects -->
            <section class="main-section">
                <h2 class="main-title">Selected Projects</h2>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">Gyst</h3>
                        <span class="project-label">AI-NATIVE KNOWLEDGE PLATFORM</span>
                    </div>
                    <ul class="project-bullets">
                        <li>Architected an <strong>agentic system with CrewAI</strong> for intelligent document analysis.</li>
                        <li>Engineered a <strong>RAG pipeline</strong> for accurate conversational search.</li>
                        <li>Built a robust <strong>FastAPI</strong> backend and reactive <strong>Next.js</strong> frontend.</li>
                    </ul>
                    <div class="project-tags">
                        <span class="ptag">NEXT.JS</span>
                        <span class="ptag">FASTAPI</span>
                        <span class="ptag">CREWAI</span>
                        <span class="ptag">RAG</span>
                        <span class="ptag">POSTGRESQL</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">ETIC Resource Hub</h3>
                        <span class="project-label">RESOURCE MANAGEMENT</span>
                    </div>
                    <ul class="project-bullets">
                        <li><strong>Solutions Architect &amp; Developer:</strong> Delivered a fully functional MVP in under two weeks.</li>
                        <li>Designed the entire system from <strong>PostgreSQL</strong> schema to <strong>Next.js</strong> frontend.</li>
                        <li>Prioritized a modern rebuild over legacy refactoring for long-term scalability.</li>
                    </ul>
                    <div class="project-tags">
                        <span class="ptag">NEXT.JS</span>
                        <span class="ptag">SUPABASE</span>
                        <span class="ptag">TERRAFORM</span>
                        <span class="ptag">DOCKER</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">In Sintonia</h3>
                        <span class="project-label">AYURVEDIC DIET PLATFORM WITH AGENTIC REAL-TIME CHAT</span>
                    </div>
                    <ul class="project-bullets">
                        <li>Developed an <strong>agentic Rust backend</strong> leveraging ZeroClaw for AI orchestration.</li>
                        <li>Built high-performance APIs with <strong>Axum + Utopia</strong> and real-time chat via <strong>WebSockets</strong>.</li>
                    </ul>
                    <div class="project-tags">
                        <span class="ptag">RUST</span>
                        <span class="ptag">AXUM</span>
                        <span class="ptag">ZEROCLAW</span>
                        <span class="ptag">WEBSOCKETS</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">Cyber Compass</h3>
                        <span class="project-label">EDTECH PLATFORM</span>
                    </div>
                    <ul class="project-bullets">
                        <li>Created a branching scenario system for ethical simulations.</li>
                        <li>Implemented analytics to track user decision-making patterns.</li>
                    </ul>
                    <div class="project-tags">
                        <span class="ptag">REACT</span>
                        <span class="ptag">FASTAPI</span>
                        <span class="ptag">MONGODB</span>
                        <span class="ptag">DOCKER</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">better.finder</h3>
                        <span class="project-label">DESKTOP SEARCH LAUNCHER</span>
                    </div>
                    <ul class="project-bullets">
                        <li>Built a system-wide <strong>Rust + Tauri</strong> desktop app with instant file search via Everything SDK.</li>
                        <li>Integrated app launching, clipboard history, browser bookmarks, calculator, and web search fallback.</li>
                    </ul>
                    <div class="project-tags">
                        <span class="ptag">RUST</span>
                        <span class="ptag">TAURI</span>
                        <span class="ptag">REACT</span>
                        <span class="ptag">TYPESCRIPT</span>
                    </div>
                </div>
            </section>

            <!-- Professional Experience -->
            <section class="main-section">
                <h2 class="main-title">Professional Experience</h2>

                <div class="experience">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-role">Full-Stack Developer &mdash; ERASMUS+ Professional Internship</h3>
                            <p class="exp-company">Vivadrive, Warsaw, Poland</p>
                        </div>
                        <span class="exp-date">Feb 2026 &ndash; May 2026</span>
                    </div>
                    <ul class="exp-bullets">
                        <li><strong>Full-Stack Development:</strong> Contributed to FleetFlow, an AI-powered fleet management application, delivering features across the entire stack.</li>
                        <li><strong> Ownership &amp; Impact:</strong> Took end-to-end ownership of critical features, from research, design, planning to implementation. Worked side by side with the company tech lead impacting the product's success.</li>
                        <li><strong>AI Integration:</strong> Developed and integrated AI components using Django, enhancing the platform's intelligent capabilities.</li>
                        <li><strong>LLM Ops &amp; Observability:</strong> Implemented a 4-layer observability architecture in LangChain, ensuring reliability and traceability of AI-driven operations.</li>
                    </ul>
                </div>

                <div class="experience">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-role">Full-stack Developer &mdash; Professional Internship</h3>
                            <p class="exp-company">ETIC Algarve, Faro, Portugal &bull; <a href="https://pedidodemeios.eticalgarve.com/">pedidodemeios.eticalgarve.com</a></p>
                        </div>
                        <span class="exp-date">Jun 2025 &ndash; Sep 2025</span>
                    </div>
                    <ul class="exp-bullets">
                        <li><strong>Platform Development:</strong> Single-handedly designed, built, and deployed the ETIC Resource Hub — a centralized resource management platform still in active use by the institution.</li>
                        <li><strong>Stakeholder Engagement:</strong> Pitched the project to the director and presented it to all professionals, gathering feedback and iterating on the solution to ensure it met the institution's needs.</li>
                        <li><strong>Product-Centric Approach:</strong> Focused on delivering a user-friendly, scalable solution that met the specific needs of ETIC, rather than quick fixes or legacy refactoring.</li>
                        <li><strong>End-to-End Ownership:</strong> Managed the full lifecycle from database schema design and backend API to the frontend interface, delivering a production-ready MVP in under two weeks.</li>
                    </ul>
                </div>
            </section>
        </main>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p class="footer-text">Seeking to connect with a visionary team where I can contribute to and learn from a world-class engineering culture.</p>
    </footer>
</body>
</html>
"""
    return html_content


def create_css_styles():
    """Create modern, professional CSS styles matching the CV image."""
    
    css_content = """
@page {
    size: A4;
    margin: 0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 9.5pt;
    line-height: 1.5;
    color: #333;
    background: white;
    height: 29.7cm;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* ── Header with banner ── */
.header {
    position: relative;
    height: 6cm;
    overflow: hidden;
}

.header-bg {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
}

.header-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to top,
        rgba(0,0,0,0.78) 0%,
        rgba(0,0,0,0.42) 24%,
        rgba(0,0,0,0.14) 52%,
        rgba(0,0,0,0.0) 78%
    );
    z-index: 1;
}

.header-content {
    position: absolute;
    z-index: 2;
    bottom: 0.42cm;
    left: 0.6cm;
    right: 0.6cm;
    text-align: right;
    color: white;
}

.name {
    font-size: 26pt;
    font-weight: 800;
    letter-spacing: 1.5px;
    margin-bottom: 0.05cm;
    line-height: 1.1;
}

.title {
    font-size: 11pt;
    font-weight: 300;
    opacity: 0.92;
    margin-bottom: 0.18cm;
}

.contact-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    gap: 0.14cm;
    font-size: 7pt;
    white-space: nowrap;
}

.contact-link {
    color: white;
    text-decoration: none;
    opacity: 0.90;
    white-space: nowrap;
    flex-shrink: 0;
}

.separator {
    opacity: 0.5;
    font-size: 7pt;
    flex-shrink: 0;
}

/* ── Two-column body ── */
.main-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* ── LEFT SIDEBAR ── */
.sidebar {
    flex: 0 0 6.2cm;
    background: #f5f5f5;
    padding: 0.36cm 0.44cm;
}

.sidebar-title {
    font-size: 10pt;
    font-weight: 700;
    color: #222;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #E8A838;
    padding-bottom: 0.1cm;
    margin-bottom: 0.3cm;
}

.sidebar-section {
    margin-bottom: 0.34cm;
}

.quote {
    font-size: 10pt;
    font-style: italic;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
    margin-bottom: 0.24cm;
}

.quote-sub {
    font-size: 7.5pt;
    color: #666;
    line-height: 1.45;
}

.tech-category-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #444;
    margin-top: 0.24cm;
    margin-bottom: 0.12cm;
}

.tech-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.14cm;
}

.tech-tag {
    background: white;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0.08cm 0.22cm;
    font-size: 7pt;
    color: #444;
}

.edu-degree {
    font-size: 9.5pt;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.08cm;
}

.edu-school {
    font-size: 8.5pt;
    color: #555;
    margin-bottom: 0.05cm;
}

.edu-meta {
    font-size: 7.5pt;
    color: #888;
}

/* ── RIGHT CONTENT ── */
.content {
    flex: 1;
    padding: 0.24cm 0.5cm;
}

.summary {
    font-size: 7pt;
    line-height: 1.35;
    color: #444;
    margin-bottom: 0.14cm;
    text-align: justify;
}

.main-title {
    font-size: 11pt;
    font-weight: 800;
    color: #222;
    border-bottom: 2px solid #E8A838;
    padding-bottom: 0.06cm;
    margin-bottom: 0.2cm;
    margin-top: 0.14cm;
}

/* ── Projects ── */
.project {
    margin-bottom: 0.14cm;
}

.project-header {
    display: flex;
    align-items: baseline;
    gap: 0.2cm;
    margin-bottom: 0.08cm;
}

.project-name {
    font-size: 10pt;
    font-weight: 700;
    color: #222;
}

.project-label {
    font-size: 7pt;
    font-weight: 600;
    color: #E8A838;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.project-desc {
    font-size: 8pt;
    color: #555;
    line-height: 1.45;
    margin-bottom: 0.15cm;
}

.project-bullets {
    margin-left: 0.3cm;
    margin-bottom: 0.08cm;
}

.project-bullets li {
    font-size: 7pt;
    line-height: 1.35;
    margin-bottom: 0.04cm;
    color: #444;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.08cm;
    margin-top: 0.07cm;
}

.ptag {
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0.03cm 0.15cm;
    font-size: 6pt;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

/* ── Experience ── */
.experience {
    margin-bottom: 0.14cm;
}

.exp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.1cm;
}

.exp-role {
    font-size: 9pt;
    font-weight: 700;
    color: #222;
}

.exp-company {
    font-size: 7.5pt;
    color: #E8A838;
    font-weight: 600;
}

.exp-company a {
    color: #E8A838;
    text-decoration: none;
}

.exp-date {
    font-size: 7.5pt;
    color: #888;
    white-space: nowrap;
    font-weight: 600;
}

.exp-bullets {
    margin-left: 0.3cm;
}

.exp-bullets li {
    font-size: 7pt;
    line-height: 1.35;
    margin-bottom: 0.06cm;
    color: #444;
}

/* ── Footer ── */
.footer {
    background: #E8A838;
    padding: 0.15cm 1cm;
    text-align: center;
}

.footer-text {
    font-size: 8pt;
    color: white;
    font-weight: 600;
    letter-spacing: 0.3px;
}

/* Print */
@media print {
    body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
}
"""
    return css_content


def generate_pdf():
    """Generate the PDF CV."""
    
    print("🎨 Generating your beautiful CV...")
    
    # Create HTML and CSS content
    html_content = create_html_cv()
    css_content = create_css_styles()
    
    # Setup font configuration
    font_config = FontConfiguration()
    
    # Create HTML and CSS objects
    html = HTML(string=html_content)
    css = CSS(string=css_content, font_config=font_config)
    
    # Generate PDF
    output_path = Path(__file__).parent / "Afonso_Caboz_CV.pdf"
    html.write_pdf(
        target=str(output_path),
        stylesheets=[css],
        font_config=font_config
    )
    
    print(f"✅ PDF generated successfully: {output_path}")
    print(f"📄 File size: {output_path.stat().st_size / 1024:.1f} KB")
    
    return output_path


if __name__ == "__main__":
    generate_pdf()
