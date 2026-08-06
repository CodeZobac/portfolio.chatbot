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

from weasyprint import CSS, HTML
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
            <p class="title">Systems Architect: AI &amp; Full-Stack Integration</p>
            <div class="contact-bar">
                <a href="mailto:afonso.caboz@gmail.com" class="contact-link">afonso.caboz@gmail.com</a>
                <span class="separator">|</span>
                <a href="https://linkedin.com/in/afonsocaboz" class="contact-link">linkedin.com/in/afonsocaboz</a>
                <span class="separator">|</span>
                <a href="https://github.com/CodeZobac" class="contact-link">github.com/CodeZobac</a>
                <span class="separator">|</span>
                <a href="https://www.codezobac.com" class="contact-link">codezobac.com</a>
                <span class="separator">|</span>
                <span class="contact-link">Faro, Portugal</span>
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

                <h3 class="tech-category-title">AI / LLM</h3>
                <div class="tech-items">
                    <span class="tech-tag">RAG Pipelines</span>
                    <span class="tech-tag">CrewAI</span>
                    <span class="tech-tag">Langfuse</span>
                    <span class="tech-tag">LiteLLM</span>
                    <span class="tech-tag">Observability</span>
                </div>

                <h3 class="tech-category-title">Backend &amp; Systems</h3>
                <div class="tech-items">
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">FastAPI</span>
                    <span class="tech-tag">Django</span>
                    <span class="tech-tag">Rust</span>
                    <span class="tech-tag">Axum</span>
                    <span class="tech-tag">Tauri</span>
                    <span class="tech-tag">PostgreSQL</span>
                </div>

                <h3 class="tech-category-title">Frontend</h3>
                <div class="tech-items">
                    <span class="tech-tag">Next.js</span>
                    <span class="tech-tag">Vite</span>
                    <span class="tech-tag">TypeScript</span>
                    <span class="tech-tag">Tailwind CSS</span>
                </div>

                <h3 class="tech-category-title">Infrastructure</h3>
                <div class="tech-items">
                    <span class="tech-tag">Docker</span>
                    <span class="tech-tag">Terraform</span>
                    <span class="tech-tag">CI/CD</span>
                </div>
            </section>

            <!-- Education -->
            <section class="sidebar-section">
                <h2 class="sidebar-title">EDUCATION</h2>
                <h3 class="edu-degree">Information Systems Programming</h3>
                <p class="edu-school">ETIC Algarve</p>
                <p class="edu-meta">2025 &bull; Final grade: 18/20</p>
                <p class="edu-desc">An incubator for my evolution into a Solutions Architect. I applied engineering rigor to institutional challenges, culminating in the independent architecture and deployment of a resource management system still in active use. Recognized by the School Director as a professional-grade asset rather than a student assignment, this project transformed the institution's infrastructure, bridging the gap between academic study and production-ready utility.</p>
            </section>
        </aside>

        <!-- RIGHT MAIN CONTENT -->
        <main class="content">
            <!-- Professional Summary -->
            <p class="summary">
                𝗜 𝗲𝗻𝗴𝗶𝗻𝗲𝗲𝗿 𝘀𝗰𝗮𝗹𝗮𝗯𝗹𝗲, 𝗼𝗯𝘀𝗲𝗿𝘃𝗮𝗯𝗹𝗲, 𝗮𝗻𝗱 𝗰𝗼𝘀𝘁-𝗼𝗽𝘁𝗶𝗺𝗶𝘇𝗲𝗱 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝗶𝗼𝗻 𝗲𝗻𝘃𝗶𝗿𝗼𝗻𝗺𝗲𝗻𝘁𝘀 𝗳𝗼𝗿 𝗔𝗜-𝗱𝗿𝗶𝘃𝗲𝗻 𝗮𝗽𝗽𝗹𝗶𝗰𝗮𝘁𝗶𝗼𝗻𝘀.
            </p>
            <p class="summary">
                <strong>Methodology:</strong> A dual-core engine of 𝗬𝗶𝗻 (𝗗𝗲𝗲𝗽 𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵/𝗨𝗫 𝗠𝗮𝗽𝗽𝗶𝗻𝗴) and 𝗬𝗮𝗻𝗴 (𝗔𝗜-𝗔𝘂𝗴𝗺𝗲𝗻𝘁𝗲𝗱 𝗘𝘅𝗲𝗰𝘂𝘁𝗶𝗼𝗻) to balance architectural integrity with high-velocity deployment.
            </p>
            <p class="summary">
                <strong>Objective:</strong> Transforming complex technical requirements into resilient, production-ready architectures.
            </p>

            <!-- Selected Projects -->
            <section class="main-section">
                <h2 class="main-title">Selected Projects</h2>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">FleetFlow: AI-Powered Autonomous Fleet Management Platform</h3>
                    </div>
                    <p class="project-role">My role. AI Solutions Architect: LLMOps &amp; Agentic Systems</p>
                    <p class="project-desc">Engineered the transition of FleetFlow from simple task-driven assistants to fully autonomous, <strong>RAG-powered agents</strong>. Implemented a multi-layer observability architecture using <strong>Langfuse</strong> and <strong>LiteLLM</strong>, utilizing an &ldquo;<strong>LLM-as-a-Judge</strong>&rdquo; framework to reduce API costs while increasing output precision. Developed a predictive &ldquo;<strong>Fuel Intelligence Layer</strong>&rdquo; for anomaly and fraud detection via advanced algorithmic modeling. Additionally, engineered an <strong>AI Automated Testing</strong> pipeline to mitigate model hallucinations, ensuring a self-correcting, reliable production environment.</p>
                    <p class="skills-label">Skills and deliverables</p>
                    <div class="project-tags">
                        <span class="ptag">MLOPS</span>
                        <span class="ptag">LANGFUSE</span>
                        <span class="ptag">AI AGENT DEVELOPMENT</span>
                        <span class="ptag">PREDICTIVE ANALYTICS</span>
                        <span class="ptag">AI IMPLEMENTATION</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">IN Sintonia: Agentic Ayurvedic Nutrition Platform</h3>
                    </div>
                    <p class="project-role">My role. Full-Stack AI Solutions Architect</p>
                    <p class="project-desc">Engineered an agentic real-time platform to align dietary interventions with Ayurvedic principles. Implemented a highly efficient <strong>Mixture-of-Experts (MoE)</strong> architecture using hierarchical prompts and a &ldquo;<strong>root-level</strong>&rdquo; verification layer to eliminate semantic drift. Architected a high-performance <strong>Rust</strong> backend leveraging <strong>ZeroClaw</strong> for AI orchestration, utilizing <strong>Axum</strong> and <strong>Utopia</strong> for high-throughput APIs. Integrated <strong>WebSockets</strong> to facilitate seamless, real-time nutritional guidance and continuous data streams via a modern <strong>Next.js/Tailwind</strong> frontend.</p>
                    <p class="skills-label">Skills and deliverables</p>
                    <div class="project-tags">
                        <span class="ptag">AI MODEL INTEGRATION</span>
                        <span class="ptag">AI AGENT DEVELOPMENT</span>
                        <span class="ptag">RUST</span>
                        <span class="ptag">LANGCHAIN</span>
                        <span class="ptag">AI COMPLIANCE</span>
                    </div>
                </div>

                <div class="project">
                    <div class="project-header">
                        <h3 class="project-name">ETIC_Algarve Resource Hub: Unified Institutional Management System</h3>
                    </div>
                    <p class="project-role">My role. Solutions Architect &amp; Lead Engineer</p>
                    <p class="project-desc">Engineered a high-performance ecosystem to unify fragmented institutional resources. The architecture features advanced search with intelligent autocomplete and secure identity management via <strong>Supabase/Google OAuth (RBAC)</strong>. To ensure operational integrity, I implemented automated communication via <strong>Resend API</strong> and validated system stability through <strong>k6 load testing</strong> (50+ concurrent users). Deployment is fully automated using <strong>Terraform</strong>, <strong>Docker Compose</strong>, and a <strong>Makefile</strong>-based CI/CD pipeline with <strong>Nginx SSL</strong> termination.</p>
                    <p class="skills-label">Skills and deliverables</p>
                    <div class="project-tags">
                        <span class="ptag">CI/CD</span>
                        <span class="ptag">PERFORMANCE TESTING</span>
                        <span class="ptag">LOAD TESTING</span>
                        <span class="ptag">TERRAFORM</span>
                        <span class="ptag">DOCKER</span>
                    </div>
                </div>
            </section>

            <!-- Employment History -->
            <section class="main-section">
                <h2 class="main-title">Employment History</h2>

                <div class="experience">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-role">AI Solutions Architect | LLMOps &amp; Agentic Systems</h3>
                            <p class="exp-company">VivaDrive</p>
                        </div>
                        <span class="exp-date">Feb 2026 &ndash; Present</span>
                    </div>
                    <p class="exp-overview"><strong>Project Overview:</strong> Scaling the FleetFlow AI-powered fleet management platform from reactive assistants to fully autonomous, RAG-driven agents.</p>
                    <p class="exp-sublabel">Key Interventions:</p>
                    <ul class="exp-bullets">
                        <li><strong>Unified Observability &amp; Cost Optimization:</strong> Engineered a multi-layer observability architecture using Langfuse and LiteLLM. Implemented an &ldquo;LLM-as-a-Judge&rdquo; framework, reducing API costs via gpt-4o-mini while increasing output precision through total request traceability.</li>
                        <li><strong>Predictive Intelligence Development:</strong> Developed the core &ldquo;Fuel Intelligence Layer,&rdquo; transitioning architecture from static data processing to a predictive Data Warehouse model for automated anomaly and fraud detection.</li>
                        <li><strong>Autonomous Reliability:</strong> Engineered an AI Automated Testing pipeline to mitigate model hallucinations, creating a self-correcting ecosystem where specialized models validate autonomous agent outputs.</li>
                    </ul>
                    <p class="exp-overview"><strong>Result:</strong> Transformed FleetFlow into a resilient, predictive architecture capable of managing complex logistics with minimal human intervention.</p>
                </div>

                <div class="experience">
                    <div class="exp-header">
                        <div>
                            <h3 class="exp-role">Solutions Architect | Systemic Debt Recovery &amp; MVP Deployment</h3>
                            <p class="exp-company">ETIC_Algarve</p>
                        </div>
                        <span class="exp-date">Aug 2025 &ndash; Sep 2025</span>
                    </div>
                    <p class="exp-overview"><strong>Project Overview:</strong> Rehabilitating a legacy resource management system at ETIC Algarve burdened by mounting technical debt and architectural entropy.</p>
                    <p class="exp-sublabel">Key Interventions:</p>
                    <ul class="exp-bullets">
                        <li><strong>Architectural Audit:</strong> Conducted deep-dive audits to identify root causes of systemic failure, addressing fundamental structural decay rather than superficial UI fixes.</li>
                        <li><strong>Strategic Rebuild Advocacy:</strong> Engineered a framework to pivot from high-maintenance refactoring toward a modern, scalable architecture for long-term maintainability.</li>
                        <li><strong>Rapid Prototyping (48-Hour Execution):</strong> Developed a functional, high-fidelity prototype within 48 hours to validate technical viability and secure stakeholder buy-in.</li>
                        <li><strong>Stakeholder Synchronization:</strong> Aligned complex engineering milestones with organizational objectives and institutional feedback loops.</li>
                    </ul>
                    <p class="exp-overview"><strong>Result:</strong> Delivered a production-ready MVP, transforming a failing legacy asset into a scalable, high-performance platform.</p>
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
    margin: 0.75cm 0;
}

@page :first {
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
    display: table;
    width: 21cm;
    table-layout: fixed;
}

/* ── LEFT SIDEBAR ── */
.sidebar {
    display: table-cell;
    width: 6.2cm;
    background: #f5f5f5;
    padding: 0.36cm 0.44cm;
    vertical-align: top;
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

.edu-desc {
    font-size: 6.5pt;
    font-weight: 700;
    color: #555;
    line-height: 1.45;
    margin-top: 0.12cm;
}

/* ── RIGHT CONTENT ── */
.content {
    display: table-cell;
    vertical-align: top;
    padding: 0.24cm 0.5cm;
}

.summary {
    font-size: 7pt;
    line-height: 1.45;
    color: #444;
    margin-bottom: 0.2cm;
    text-align: justify;
}

.main-title {
    font-size: 11pt;
    font-weight: 800;
    color: #222;
    border-bottom: 2px solid #E8A838;
    padding-bottom: 0.06cm;
    margin-bottom: 0.28cm;
    margin-top: 0.3cm;
    break-after: avoid;
}

/* ── Projects ── */
.project {
    margin-bottom: 0.35cm;
    break-inside: avoid;
    page-break-inside: avoid;
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

.project-role {
    font-size: 7.5pt;
    font-weight: 600;
    color: #E8A838;
    margin-bottom: 0.06cm;
}

.skills-label {
    font-size: 6.5pt;
    font-weight: 700;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 0.04cm;
    margin-top: 0.06cm;
}

.project-desc {
    font-size: 7pt;
    color: #555;
    line-height: 1.5;
    margin-bottom: 0.1cm;
    text-align: justify;
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
    margin-bottom: 0.4cm;
    break-inside: avoid;
    page-break-inside: avoid;
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

.exp-overview {
    font-size: 7pt;
    color: #444;
    line-height: 1.45;
    margin-bottom: 0.1cm;
    margin-left: 0.3cm;
    text-align: justify;
}

.exp-sublabel {
    font-size: 7pt;
    font-weight: 700;
    color: #555;
    margin-left: 0.3cm;
    margin-bottom: 0.04cm;
    margin-top: 0.04cm;
}

.exp-bullets {
    margin-left: 0.3cm;
}

.exp-bullets li {
    font-size: 7pt;
    line-height: 1.45;
    margin-bottom: 0.1cm;
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
    output_dir = Path.home() / "Documents"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "Afonso_Caboz_CV.pdf"
    html.write_pdf(target=str(output_path), stylesheets=[css], font_config=font_config)

    print(f"✅ PDF generated successfully: {output_path}")
    print(f"📄 File size: {output_path.stat().st_size / 1024:.1f} KB")

    return output_path


if __name__ == "__main__":
    generate_pdf()
