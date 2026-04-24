#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "weasyprint",
# ]
# ///
"""
Generate a beautiful, professional PDF Cover Letter.
"""

from pathlib import Path
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def create_html_cover_letter():
    """Create the HTML content for the Cover Letter."""
    
    base_dir = Path(__file__).parent
    
    banner_path = base_dir / "banner.jpg"
    banner_uri = banner_path.as_uri() if banner_path.exists() else ""
    
    def find_image(name_base):
        for ext in ['.jpg', '.jpeg', '.png', '.webp']:
            p = base_dir / f"{name_base}{ext}"
            if p.exists():
                return p.as_uri()
        return ""
    
    ayurveda_uri = find_image("ayurveda")
    portfolio_uri = find_image("portfolio")
    
    def img_tag(uri, alt):
        if uri:
            return f'<img src="{uri}" alt="{alt}" />'
        else:
            return f'<div class="placeholder-img"><p>Image: <b>{alt}</b></p><p>Please save as <code>{alt.lower().replace(" ", "")}.jpg</code> or <code>.png</code> in this directory and re-run.</p></div>'

    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Afonso Caboz">
    <title>Afonso Caboz - Cover Letter</title>
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
        <p class="paragraph">
            My development philosophy is built on a dual-core engine of reflection and expansion. I begin with the <strong>Yin</strong> phase: a period of deep research and empathetic UX mapping, where I inhabit the user's perspective to ensure every feature is necessary and intuitive. Once the architecture is solidified, I transition into the <strong>Yang</strong> phase: an aggressive, AI-augmented execution cycle focused on implementation, automated testing, and full-lifecycle ownership. Rather than getting lost in the minutiae of syntax, I act as a technical architect—directing AI agents with precise intent and verifying success through the only metric that matters: a seamless, functional, and high-performance user experience.
        </p>

        <p class="paragraph">
            My tenure at VivaDrive was defined by a singular mission: resolving high-stakes engineering bottlenecks through architectural transmutation. I did not merely fix errors; I re-engineered systems to turn volatility into stability. This was achieved through four critical pillars of innovation:
        </p>

        <div class="pillar">
            <h4 class="pillar-title">I. Cost Engineering &amp; LLM-as-a-Judge</h4>
            <p>When faced with the economic friction of API budget saturation, I re-architected our OpenAI integration. By implementing a strategic "LLM-as-a-Judge" framework using <code>gpt-4o-mini</code>, I transmuted a manual, expensive evaluation process into an automated, programmatic pipeline. This allowed us to achieve radical cost reduction while simultaneously elevating the precision of our output quality.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">II. Illuminating the Black Box: Traceability &amp; Observability</h4>
            <p>To resolve the opacity inherent in complex LLM workflows, I engineered a four-layer observability framework utilizing <strong>Langfuse</strong>. This architecture provided total visibility across the entire request lifecycle—tracing every movement from the "Root" (monitoring API expenditure and authorship) to the final "Generation." This brought much-needed transparency and accountability to our generative processes.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">III. From Static Data to Predictive Intelligence</h4>
            <p>I led the evolution of our data architecture from reactive, static file processing to a proactive <strong>"Fuel Intelligence Layer."</strong> By transitioning toward a predictive Data Warehouse model, I enabled the system to move beyond simple storage, empowering it to detect anomalies and identify fuel fraud patterns through advanced algorithmic modeling.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">IV. Managing Autonomy: The Self-Correcting Ecosystem</h4>
            <p>The most complex challenge was managing the inherent entropy of autonomous agents. As I worked side by side with the tech lead to drive the macro-refactoring of our platform from simple assistants to fully autonomous entities, I encountered the risk of model hallucinations. To neutralize this, we engineered an <strong>"AI Automated Testing"</strong> pipeline—a self-correcting production environment where specialized models are tasked with validating the outputs of others, ensuring that autonomy never comes at the expense of truth.</p>
        </div>

        <p class="paragraph">
            Prior to my work with distributed AI systems, my tenure at ETIC Algarve provided a profound lesson in the necessity of structural integrity when confronting systemic decay. I was tasked with managing a legacy resource management application that had reached a state of functional obsolescence—a system burdened by technical debt and incapable of scaling with institutional needs.
        </p>

        <div class="pillar">
            <h4 class="pillar-title">I. Architectural Audit &amp; The Rejection of Superficiality</h4>
            <p>Upon conducting a deep-dive technical audit, I identified that the existing architecture was suffering from terminal entropy; the lack of responsiveness was not a surface-level UI issue, but a fundamental failure in the underlying structure. While a superficial "patch" could have provided temporary relief, I made the strategic decision to advocate for a complete architectural rebuild—a move designed to ensure long presence and long-term maintainability.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">II. Rapid Manifestation via Prototyping</h4>
            <p>To validate this high-stakes pivot, I entered an intensive development cycle, engineering and presenting a functional prototype within just seventy-two hours. This phase required a high-velocity execution transforming abstract architectural concepts into a tangible, demonstrable reality to prove the viability of the rebuild.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">III. The Synthesis of Technical Truth and Stakeholder Alignment</h4>
            <p>This period served as my most critical lesson in professional engineering: that technical excellence is hollow without organizational resonance. I learned that for an architectural shift to succeed, the phase of stakeholder alignment, navigating feedback loops, managing institutional expectations, and refining communication protocols is just as vital as the code itself. True innovation requires that technical truth be synchronized with organizational objectives.</p>
        </div>

        <div class="pillar">
            <h4 class="pillar-title">IV. MVP Delivery &amp; Empirical Validation</h4>
            <p>With the institution's mandate secured, I transitioned into a full-scale development sprint, delivering a production-ready MVP within one week. The project culminated in a high-stakes defense before an assembly of industry professionals and educators, where the architecture was validated not merely by its code, but by its ability to resolve complex, real-world operational requirements with precision.</p>
        </div>

        <h2 class="main-title">🌀 Selected Works</h2>

        <div class="project-showcase" style="page-break-inside: avoid;">
            <div class="project-copy">
                <h3 class="project-name">I. In Sintonia <span class="project-label">| Ayurvedic Nutritional Intelligence</span></h3>
                <p class="project-desc"><em>An agentic real-time platform engineered to align dietary interventions with Ayurvedic principles through high-precision orchestration.</em></p>
                <ul class="project-bullets">
                    <li><strong>Minimalist Agentic Orchestration</strong>: Engineered a highly efficient, <strong>Mixture-of-Experts (MoE)</strong> architecture using a hierarchical system of prompts. Rather than managing the complexity of the final output, I focused on the precision of the input—implementing a "root-level" verification layer that ensures each sub-agent receives only the context necessary for deterministic relevance, effectively eliminating semantic drift.</li>
                    <li><strong>High-Performance Rust Infrastructure</strong>: Architected a robust backend using <strong>Rust</strong> and <strong>ZeroClaw</strong> for low-latency AI orchestration. The system utilizes <strong>Axum + Utopia</strong> for high-throughput API performance, integrated with <strong>WebSockets</strong> to facilitate seamless, real-time nutritional guidance and continuous data streams.</li>
                </ul>
            </div>
            <div class="project-image">
                {img_tag(ayurveda_uri, "Ayurveda")}
            </div>
        </div>

        <div class="project-showcase" style="page-break-inside: avoid;">
            <div class="project-copy">
                <h3 class="project-name">II. Personal Portfolio <span class="project-label">| Generative UI &amp; Dynamic Knowledge Interface</span></h3>
                <p class="project-desc"><em>An experimental implementation of a generative interface that transforms natural language queries into structured, component-based visual experiences.</em></p>
                <ul class="project-bullets">
                    <li><strong>Dynamic Component Manifestation</strong>: Engineered a "Generative UI" paradigm where the interface is not static but reactive. The system interprets user intent through an AI-driven layer, triggering the on-demand rendering of specific UI components (experience timelines, skill matrices, project deep-dives) based on the semantic requirements of the query.</li>
                    <li><strong>Intelligent Knowledge Orchestration</strong>: Integrated a dynamic, retrieval-augmented knowledge base that allows the agent to navigate my professional history with precision. This architecture ensures that every interaction—whether answering technical inquiries or presenting biographical data—is grounded in an authoritative and contextually accurate data layer.</li>
                </ul>
            </div>
            <div class="project-image">
                {img_tag(portfolio_uri, "Portfolio")}
            </div>
        </div>

        <div class="conclusion" style="page-break-inside: avoid;">
            <p>
                Ultimately, my trajectory in software engineering has been defined by a single, continuous cycle: the ability to identify structural entropy and transmute it into scalable, high-performance architecture. Whether I am auditing legacy systems to prevent technical decay or orchestrating complex, AI-driven ecosystems to drive unprecedented efficiency, my objective remains constant: <strong>to bridge the gap between profound technological complexity and intuitive, user-centric reality.</strong>
            </p>

            <p>
                I do not merely write code; I engineer environments where technology serves a clear, strategic purpose. My expertise lies in navigating the delicate tension between the <strong>Yin</strong> of deep, architectural research and the <strong>Yang</strong> of rapid, high-impact deployment. I bring to your team a commitment to technical excellence, experience with reducing operational friction, and a proven methodology for transforming ambitious digital visions into resilient, production-ready realities.
            </p>

            <p>
                I am prepared to apply this architectural rigor to your most complex challenges, ensuring that every system I touch is built not just to function, but to endure and evolve.
            </p>
        </div>
    </div>
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
    @bottom-center {
        content: counter(page) " / " counter(pages);
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        font-size: 8pt;
        color: #888;
        padding-bottom: 0.5cm;
    }
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    font-size: 9pt;
    line-height: 1.55;
    color: #333;
    background: white;
}

/* ── Header with banner ── */
.header {
    position: relative;
    height: 6cm;
    overflow: hidden;
    page-break-after: avoid;
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
    left: 1.2cm;
    right: 1.2cm;
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
    font-size: 7.5pt;
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

/* ── Main Layout ── */
.main-layout {
    padding: 0.8cm 1.5cm 1.5cm 1.5cm;
}

.paragraph {
    margin-bottom: 0.4cm;
    text-align: justify;
}

.pillar {
    margin-left: 0.5cm;
    margin-bottom: 0.35cm;
}

.pillar-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.1cm;
}

.pillar p {
    font-size: 9pt;
    line-height: 1.55;
    color: #444;
    text-align: justify;
}

code {
    background: #f0f0f0;
    padding: 0.05cm 0.15cm;
    border-radius: 3px;
    font-family: monospace;
    font-size: 8pt;
    color: #E8A838;
}

.main-title {
    font-size: 12pt;
    font-weight: 800;
    color: #222;
    border-bottom: 2px solid #E8A838;
    padding-bottom: 0.1cm;
    margin-bottom: 0.4cm;
    margin-top: 0.6cm;
}

/* ── Projects ── */
.project-showcase {
    display: flex;
    gap: 0.8cm;
    margin-bottom: 0.6cm;
    align-items: flex-start;
}

.project-copy {
    flex: 1;
}

.project-image {
    flex: 0 0 6cm;
}

.project-image img {
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border: 1px solid #eaeaea;
}

.placeholder-img {
    width: 100%;
    height: 4cm;
    border: 2px dashed #ccc;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5cm;
    text-align: center;
    color: #888;
    background-color: #f9f9f9;
    font-size: 8pt;
}

.project-name {
    font-size: 11pt;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.05cm;
}

.project-label {
    font-size: 9pt;
    font-weight: 600;
    color: #E8A838;
}

.project-desc {
    font-size: 9pt;
    color: #555;
    line-height: 1.5;
    margin-bottom: 0.2cm;
}

.project-bullets {
    margin-left: 0.5cm;
    margin-bottom: 0.1cm;
}

.project-bullets li {
    font-size: 8.5pt;
    line-height: 1.5;
    margin-bottom: 0.15cm;
    color: #444;
    text-align: justify;
}

.conclusion {
    margin-top: 0.8cm;
    border-top: 1px solid #eee;
    padding-top: 0.6cm;
}

.conclusion p {
    margin-bottom: 0.4cm;
    text-align: justify;
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
    """Generate the PDF Cover Letter."""
    
    print("🎨 Generating your beautiful Cover Letter...")
    
    # Create HTML and CSS content
    html_content = create_html_cover_letter()
    css_content = create_css_styles()
    
    # Setup font configuration
    font_config = FontConfiguration()
    
    # Create HTML and CSS objects
    html = HTML(string=html_content)
    css = CSS(string=css_content, font_config=font_config)
    
    # Generate PDF
    output_path = Path(__file__).parent / "Afonso_Caboz_Cover_Letter.pdf"
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
