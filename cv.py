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
    
    html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Afonso Caboz">
    <meta name="description" content="Full-Stack Solutions Architect CV">
    <meta name="keywords" content="Full-Stack, Solutions Architect, Python, TypeScript, FastAPI, Next.js">
    <title>Afonso Caboz - CV</title>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="header">
            <div class="header-content">
                <h1 class="name">Afonso Caboz</h1>
                <p class="title">Full-Stack Solutions Architect | ERASMUS+ Candidate</p>
                <div class="contact-bar">
                    <span class="contact-item">Faro, Portugal</span>
                    <span class="separator">•</span>
                    <span class="contact-item">afonso.caboz@gmail.com</span>
                    <span class="separator">•</span>
                    <span class="contact-item">linkedin.com/in/afonsocaboz</span>
                    <span class="separator">•</span>
                    <span class="contact-item">github.com/CodeZobac</span>
                </div>
            </div>
        </header>

        <!-- Philosophy Quote -->
        <div class="philosophy">
            <p class="quote">"Code is a liability. A solution is an asset."</p>
            <p class="quote-sub">My guiding principle is to write the least amount of code necessary to create the most value.</p>
        </div>

        <!-- Professional Summary -->
        <section class="section">
            <h2 class="section-title">Professional Summary</h2>
            <div class="section-content">
                <p>
                    Full-stack solutions architect with an obsessive focus on solving business problems through 
                    technology. My approach is language-agnostic and problem-centered, with proven experience 
                    building and deploying scalable applications, from infrastructure as code (IaC) to the final 
                    user experience.
                </p>
                <p>
                    With formal training in Web Programming, my true passion lies in translating concepts into 
                    functional, high-impact products. I operate from the infrastructure layer (Terraform, Docker) 
                    through robust backends to intuitive frontend experiences. I am now seeking a challenging 
                    ERASMUS+ internship to apply my end-to-end product-building mindset in a dynamic, international 
                    environment.
                </p>
            </div>
        </section>

        <!-- Two Column Layout: Tech Stack + Projects -->
        <div class="two-column-section">
            <!-- Tech Stack -->
            <section class="section tech-section">
                <h2 class="section-title">Tech Stack</h2>
                <div class="tech-grid">
                    <div class="tech-category">
                        <h3 class="tech-category-title">Frontend</h3>
                        <div class="tech-items">
                            <span class="tech-tag">React</span>
                            <span class="tech-tag">Next.js</span>
                            <span class="tech-tag">Vue.js</span>
                            <span class="tech-tag">TypeScript</span>
                            <span class="tech-tag">JavaScript (ES6+)</span>
                            <span class="tech-tag">HTML5</span>
                            <span class="tech-tag">CSS3/Sass</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 class="tech-category-title">Backend</h3>
                        <div class="tech-items">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">FastAPI</span>
                            <span class="tech-tag">Node.js</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 class="tech-category-title">Databases</h3>
                        <div class="tech-items">
                            <span class="tech-tag">PostgreSQL</span>
                            <span class="tech-tag">MongoDB</span>
                            <span class="tech-tag">SQL</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 class="tech-category-title">Infrastructure &amp; DevOps</h3>
                        <div class="tech-items">
                            <span class="tech-tag">Docker</span>
                            <span class="tech-tag">Terraform (IaC)</span>
                            <span class="tech-tag">AWS</span>
                            <span class="tech-tag">Kubernetes</span>
                            <span class="tech-tag">Git</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Projects Portfolio -->
            <section class="section projects-section">
                <h2 class="section-title">Selected Projects Portfolio</h2>
            
            <div class="project">
                <div class="project-header">
                    <h3 class="project-title">Gyst - Your AI-Powered Knowledge Brain</h3>
                    <p class="project-subtitle">AI-Native Knowledge Management Platform</p>
                </div>
                <p class="project-description">
                    An AI-native knowledge management platform that transforms static documents into a dynamic, 
                    conversational knowledge network for teams.
                </p>
                <div class="project-details">
                    <h4 class="details-title">Contribution and Architecture Decisions:</h4>
                    <ul class="project-list">
                        <li>Architecture and implementation of an agentic system with CrewAI for intelligent document analysis and tagging</li>
                        <li>Development of a RAG (Retrieval-Augmented Generation) pipeline for accurate conversational search</li>
                        <li>Built a robust API with FastAPI and reactive frontend with Next.js</li>
                    </ul>
                    <p class="project-insight">
                        <em>This project was a deep dive into building agentic AI systems, proving that complex knowledge 
                        management can be made intuitive through a well-architected RAG pipeline.</em>
                    </p>
                    <div class="tech-stack-label">
                        <strong>Tech Stack:</strong> Next.js • FastAPI • TypeScript • CrewAI • RAG • NLP • PostgreSQL • Docker
                    </div>
                </div>
            </div>

            <div class="project">
                <div class="project-header">
                    <h3 class="project-title">ETIC Resource Hub</h3>
                    <p class="project-subtitle">Centralized Resource Management Platform</p>
                </div>
                <p class="project-description">
                    A full-stack web application architected from the ground up to streamline and centralize the 
                    management of ETIC Algarve's creative resources, from equipment to studios.
                </p>
                <div class="project-details">
                    <h4 class="details-title">Contribution and Architecture Decisions:</h4>
                    <ul class="project-list">
                        <li>As the sole developer, made the strategic decision to rebuild the system on a modern, scalable foundation rather than refactor legacy code, ensuring long-term value for the institution</li>
                        <li>Designed and implemented the entire system, from the PostgreSQL database schema and the robust backend API to the intuitive frontend for students and staff</li>
                        <li>Delivered a fully functional MVP in under two weeks, demonstrating an extreme capacity for rapid, high-impact development and end-to-end project ownership</li>
                    </ul>
                    <p class="project-insight">
                        <em>This project was a masterclass in pragmatic execution, proving that a single, focused architect 
                        can deliver immense value by taking full ownership of a business problem.</em>
                    </p>
                    <div class="tech-stack-label">
                        <strong>Tech Stack:</strong> Next.js • Terraform • Supabase • Docker
                    </div>
                </div>
            </div>

            <div class="project">
                <div class="project-header">
                    <h3 class="project-title">Cyber Compass</h3>
                    <p class="project-subtitle">Digital Ethics Educational Platform</p>
                </div>
                <p class="project-description">
                    An educational platform focused on teaching digital ethics through interactive dilemmas and simulations.
                </p>
                <div class="project-details">
                    <h4 class="details-title">Contribution and Architecture Decisions:</h4>
                    <ul class="project-list">
                        <li>Created a branching scenario system for ethical simulations</li>
                        <li>Backend development to manage user progress and analyze decision patterns</li>
                    </ul>
                    <p class="project-insight">
                        <em>This platform was a fascinating exercise in user psychology, architecting a system that not only 
                        teaches but also analyzes the user's ethical decision-making process.</em>
                    </p>
                    <div class="tech-stack-label">
                        <strong>Tech Stack:</strong> React • Python (FastAPI) • MongoDB • Docker
                    </div>
                </div>
            </div>
        </section>
        </div>

        <!-- Professional Experience -->
        <section class="section">
            <h2 class="section-title">Professional Experience and Interpersonal Skills</h2>
            
            <div class="experience">
                <div class="experience-header">
                    <h3 class="experience-title">High-Volume Hospitality Roles</h3>
                    <p class="experience-meta">Various Establishments, Faro | 2020-2023</p>
                </div>
                <ul class="experience-list">
                    <li>
                        <strong>Direct Client Interface and Expectation Management:</strong> 
                        Responsible for client experience in high-pressure environments, solving problems in real-time 
                        to ensure satisfaction and retention. This direct experience with the "end user" informs my 
                        product-centered approach.
                    </li>
                    <li>
                        <strong>Coordinated Execution and Resilience Under Pressure:</strong> 
                        Synchronized operations with teams to ensure smooth service during demand peaks. Developed 
                        high stress tolerance and ability to maintain execution excellence when systems are at their limit.
                    </li>
                    <li>
                        <strong>Emotional Intelligence and Adaptive Communication:</strong> 
                        Reading and managing team dynamics and client needs to adapt communication, prevent conflicts, 
                        and ensure a collaborative environment.
                    </li>
                </ul>
            </div>
        </section>

        <!-- Education -->
        <section class="section">
            <h2 class="section-title">Education</h2>
            <div class="education">
                <h3 class="education-title">Technical Specialization Course in Information Systems Programming</h3>
                <p class="education-meta">Level 5 | ETIC Algarve, Faro | 2025</p>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <p class="footer-text">
                Seeking to connect with a visionary team where I can contribute to and learn from a world-class engineering culture.
            </p>
        </footer>
    </div>
</body>
</html>
"""
    return html_content


def create_css_styles():
    """Create modern, professional CSS styles for the CV."""
    
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
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: #2c3e50;
    background: white;
}

.container {
    padding: 1.2cm 1.8cm;
}

/* Header Styles - Improved */
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1cm 1.8cm;
    margin: -1.2cm -1.8cm 0.8cm -1.8cm;
    border-radius: 0 0 15px 15px;
}

.header-content {
    text-align: center;
}

.name {
    font-size: 28pt;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 0.2cm;
}

.title {
    font-size: 13pt;
    font-weight: 400;
    opacity: 0.95;
    margin-bottom: 0.5cm;
}

.contact-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 9pt;
    line-height: 1.4;
    gap: 0.3cm;
}

.contact-item {
    opacity: 0.95;
}

.separator {
    opacity: 0.6;
    font-size: 8pt;
}

/* Philosophy Quote */
.philosophy {
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 0.4cm 0.6cm;
    margin: 0.6cm 0;
    border-radius: 5px;
}

.quote {
    font-size: 11pt;
    font-weight: 600;
    color: #667eea;
    font-style: italic;
    margin-bottom: 0.2cm;
}

.quote-sub {
    font-size: 8.5pt;
    color: #666;
}

/* Section Styles */
.section {
    margin-bottom: 0.7cm;
}

.section-title {
    font-size: 14pt;
    font-weight: 700;
    color: #667eea;
    border-bottom: 2px solid #667eea;
    padding-bottom: 0.15cm;
    margin-bottom: 0.4cm;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.section-content p {
    margin-bottom: 0.3cm;
    text-align: justify;
    font-size: 9.5pt;
}

/* Two Column Layout for Tech Stack and Projects */
.two-column-section {
    display: flex;
    gap: 0.8cm;
    margin-bottom: 0.7cm;
}

.tech-section {
    flex: 0 0 35%;
    margin-bottom: 0;
}

.projects-section {
    flex: 1;
    margin-bottom: 0;
}

/* Tech Stack Grid - More Compact */
.tech-grid {
    display: flex;
    flex-direction: column;
    gap: 0.3cm;
}

.tech-category {
    background: #f8f9fa;
    padding: 0.3cm;
    border-radius: 6px;
    border-left: 3px solid #667eea;
}

.tech-category-title {
    font-size: 10pt;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.25cm;
}

.tech-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.15cm;
}

.tech-tag {
    background: white;
    padding: 0.1cm 0.25cm;
    border-radius: 3px;
    font-size: 7.5pt;
    border: 1px solid #e0e0e0;
    color: #555;
}

/* Project Styles - More Compact */
.project {
    background: #f8f9fa;
    padding: 0.4cm;
    border-radius: 6px;
    margin-bottom: 0.4cm;
    border-left: 4px solid #764ba2;
    page-break-inside: avoid;
}

.project-header {
    margin-bottom: 0.2cm;
}

.project-title {
    font-size: 11pt;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.1cm;
}

.project-subtitle {
    font-size: 9pt;
    color: #667eea;
    font-weight: 600;
}

.project-description {
    margin-bottom: 0.3cm;
    color: #555;
    line-height: 1.4;
    font-size: 8.5pt;
}

.project-details {
    background: white;
    padding: 0.3cm;
    border-radius: 4px;
}

.details-title {
    font-size: 9pt;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.2cm;
}

.project-list {
    margin-left: 0.4cm;
    margin-bottom: 0.25cm;
}

.project-list li {
    margin-bottom: 0.15cm;
    font-size: 8pt;
    line-height: 1.4;
}

.project-insight {
    margin: 0.3cm 0 0.25cm 0;
    padding: 0.25cm;
    background: #f0f4ff;
    border-left: 3px solid #667eea;
    border-radius: 3px;
    font-size: 8pt;
    line-height: 1.5;
    color: #555;
}

.project-insight em {
    font-style: italic;
    color: #444;
}

.tech-stack-label {
    font-size: 7.5pt;
    color: #666;
    padding-top: 0.25cm;
    border-top: 1px solid #e0e0e0;
}

/* Experience Styles */
.experience {
    margin-bottom: 0.5cm;
    page-break-inside: avoid;
}

.experience-header {
    margin-bottom: 0.25cm;
}

.experience-title {
    font-size: 11pt;
    font-weight: 700;
    color: #2c3e50;
}

.experience-meta {
    font-size: 9pt;
    color: #667eea;
    font-weight: 600;
}

.experience-list {
    margin-left: 0.4cm;
}

.experience-list li {
    margin-bottom: 0.35cm;
    font-size: 8.5pt;
    line-height: 1.5;
}

.experience-list li strong {
    color: #667eea;
    display: block;
    margin-bottom: 0.1cm;
}

/* Education Styles */
.education {
    background: #f8f9fa;
    padding: 0.4cm;
    border-radius: 6px;
    border-left: 4px solid #667eea;
}

.education-title {
    font-size: 10pt;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.15cm;
}

.education-meta {
    font-size: 8.5pt;
    color: #666;
}

/* Footer Styles - Dramatic CTA */
.footer {
    margin-top: 0.8cm;
    padding: 0.6cm 1cm;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.footer-text {
    font-size: 10pt;
    color: white;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 1.6;
}

/* Print Optimization */
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
