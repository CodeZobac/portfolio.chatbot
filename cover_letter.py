#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "weasyprint",
# ]
# ///
"""
Generate a professional PDF Cover Letter matching the CV style.
Reuses the same header, yellow (#E8A838) accents, and typography.
"""

from pathlib import Path
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration


def create_html_cover_letter():
    """Create the HTML content for the cover letter."""

    base = Path(__file__).parent
    banner_uri = (base / "banner.jpg").as_uri()
    ayurveda_uri = (base / "ayurveda.webp").as_uri()
    portfolio_uri = (base / "portfolio.webp").as_uri()

    html_content = f"""\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Afonso Caboz">
    <meta name="description" content="Cover Letter — Afonso Caboz">
    <title>Afonso Caboz — Cover Letter</title>
</head>
<body>

    <!-- ═══════════ PAGE 1 ═══════════ -->
    <!-- Header (same as CV) -->
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

    <div class="body-content">

        <!-- ── Development Philosophy ── -->
        <section class="section">
            <p class="body-text">
                My development philosophy is built on a dual-core engine of reflection and expansion.
                I begin with the <strong>Yin</strong> phase: a period of deep research and empathetic UX
                mapping, where I inhabit the user's perspective to ensure every feature is necessary and
                intuitive. Once the architecture is solidified, I transition into the <strong>Yang</strong>
                phase: an aggressive, AI-augmented execution cycle focused on implementation, automated
                testing, and full-lifecycle ownership. Rather than getting lost in the minutiae of syntax,
                I act as a technical architect—directing AI agents with precise intent and verifying success
                through the only metric that matters: a seamless, functional, and high-performance user
                experience.
            </p>
        </section>

        <!-- ── VivaDrive ── -->
        <div class="company-separator">
            <span class="company-separator-text">VivaDrive</span>
        </div>
        <section class="section">
            <p class="body-text">
                My tenure at VivaDrive was defined by a singular mission: resolving high-stakes engineering
                bottlenecks through architectural transmutation. I did not merely fix errors; I re-engineered
                systems to turn volatility into stability. This was achieved through four critical pillars of
                innovation:
            </p>

            <h3 class="pillar-title">I. Cost Engineering &amp; LLM-as-a-Judge</h3>
            <p class="body-text">
                When faced with the economic friction of API budget saturation, I re-architected our OpenAI
                integration. By implementing a strategic "LLM-as-a-Judge" framework using
                <code>gpt-4o-mini</code>, I transmuted a manual, expensive evaluation process into an
                automated, programmatic pipeline. This allowed us to achieve radical cost reduction while
                simultaneously elevating the precision of our output quality.
            </p>

            <h3 class="pillar-title">II. Illuminating the Black Box: Traceability &amp; Observability</h3>
            <p class="body-text">
                To resolve the opacity inherent in complex LLM workflows, I engineered a four-layer
                observability framework utilizing <strong>Langfuse</strong>. This architecture provided total
                visibility across the entire request lifecycle—tracing every movement from the "Root"
                (monitoring API expenditure and authorship) to the final "Generation." This brought
                much-needed transparency and accountability to our generative processes.
            </p>

            <h3 class="pillar-title">III. From Static Data to Predictive Intelligence</h3>
            <p class="body-text">
                I led the evolution of our data architecture from reactive, static file processing to a
                proactive <strong>"Fuel Intelligence Layer."</strong> By transitioning toward a predictive
                Data Warehouse model, I enabled the system to move beyond simple storage, empowering it to
                detect anomalies and identify fuel fraud patterns through advanced algorithmic modeling.
            </p>

            <h3 class="pillar-title">IV. Managing Autonomy: The Self-Correcting Ecosystem</h3>
            <p class="body-text">
                The most complex challenge was managing the inherent entropy of autonomous agents. As I
                worked side by side with the tech lead to drive the macro-refactoring of our platform from
                simple assistants to fully autonomous entities, I encountered the risk of model
                hallucinations. To neutralize this, we engineered an <strong>"AI Automated Testing"</strong>
                pipeline—a self-correcting production environment where specialized models are tasked with
                validating the outputs of others, ensuring that autonomy never comes at the expense of truth.
            </p>
        </section>

        <!-- ── ETIC Algarve ── -->
        <div class="company-separator">
            <span class="company-separator-text">ETIC Algarve</span>
        </div>
        <section class="section">
            <p class="body-text">
                Prior to my work with distributed AI systems, my tenure at ETIC Algarve provided a profound
                lesson in the necessity of structural integrity when confronting systemic decay. I was tasked
                with managing a legacy resource management application that had reached a state of functional
                obsolescence—a system burdened by technical debt and incapable of scaling with institutional
                needs.
            </p>

            <h3 class="pillar-title">I. Architectural Audit &amp; The Rejection of Superficiality</h3>
            <p class="body-text">
                Upon conducting a deep-dive technical audit, I identified that the existing architecture was
                suffering from terminal entropy; the lack of responsiveness was not a surface-level UI issue,
                but a fundamental failure in the underlying structure. While a superficial "patch" could have
                provided temporary relief, I made the strategic decision to advocate for a complete
                architectural rebuild—a move designed to ensure long presence and long-term maintainability.
            </p>

            <h3 class="pillar-title">II. Rapid Manifestation via Prototyping</h3>
            <p class="body-text">
                To validate this high-stakes pivot, I entered an intensive development cycle, engineering and
                presenting a functional prototype within just seventy-two hours. This phase required a
                high-velocity execution transforming abstract architectural concepts into a tangible,
                demonstrable reality to prove the viability of the rebuild.
            </p>

            <h3 class="pillar-title">III. The Synthesis of Technical Truth and Stakeholder Alignment</h3>
            <p class="body-text">
                This period served as my most critical lesson in professional engineering: that technical
                excellence is hollow without organizational resonance. I learned that for an architectural
                shift to succeed, the phase of stakeholder alignment, navigating feedback loops, managing
                institutional expectations, and refining communication protocols is just as vital as the code
                itself. True innovation requires that technical truth be synchronized with organizational
                objectives.
            </p>

            <h3 class="pillar-title">IV. MVP Delivery &amp; Empirical Validation</h3>
            <p class="body-text">
                With the institution's mandate secured, I transitioned into a full-scale development sprint,
                delivering a production-ready MVP within one week. The project culminated in a high-stakes
                defense before an assembly of industry professionals and educators, where the architecture
                was validated not merely by its code, but by its ability to resolve complex, real-world
                operational requirements with precision.
            </p>
        </section>

        <!-- ── Selected Works ── -->
        <section class="section">
            <h2 class="section-title">🌀 Selected Works</h2>

            <!-- In Sintonia -->
            <div class="showcase">
                <div class="showcase-text">
                    <h3 class="showcase-name">I. In Sintonia</h3>
                    <p class="showcase-subtitle">Ayurvedic Nutritional Intelligence</p>
                    <p class="showcase-desc-italic">
                        An agentic real-time platform engineered to align dietary interventions with
                        Ayurvedic principles through high-precision orchestration.
                    </p>
                    <ul class="showcase-bullets">
                        <li>
                            <strong>Minimalist Agentic Orchestration</strong>: Engineered a highly efficient,
                            <strong>Mixture-of-Experts (MoE)</strong> architecture using a hierarchical
                            system of prompts. Rather than managing the complexity of the final output, I
                            focused on the precision of the input—implementing a "root-level" verification
                            layer that ensures each sub-agent receives only the context necessary for
                            deterministic relevance, effectively eliminating semantic drift.
                        </li>
                        <li>
                            <strong>High-Performance Rust Infrastructure</strong>: Architected a robust
                            backend using <strong>Rust</strong> and <strong>ZeroClaw</strong> for low-latency
                            AI orchestration. The system utilizes <strong>Axum + Utopia</strong> for
                            high-throughput API performance, integrated with <strong>WebSockets</strong> to
                            facilitate seamless, real-time nutritional guidance and continuous data streams.
                        </li>
                    </ul>
                </div>
                <div class="showcase-image-card">
                    <div class="showcase-image">
                        <img src="{ayurveda_uri}" alt="In Sintonia — Ayurvedic Nutritional Intelligence" />
                    </div>
                </div>
            </div>

            <!-- Personal Portfolio -->
            <div class="showcase">
                <div class="showcase-text">
                    <h3 class="showcase-name">II. Personal Chatbot</h3>
                    <p class="showcase-subtitle">Generative UI &amp; Dynamic Knowledge Interface</p>
                    <p class="showcase-desc-italic">
                        An experimental implementation of a generative interface that transforms natural
                        language queries into structured, component-based visual experiences.
                    </p>
                    <ul class="showcase-bullets">
                        <li>
                            <strong>Dynamic Component Manifestation</strong>: Engineered a "Generative UI"
                            paradigm where the interface is not static but reactive. The system interprets
                            user intent through an AI-driven layer, triggering the on-demand rendering of
                            specific UI components (experience timelines, skill matrices, project deep-dives)
                            based on the semantic requirements of the query.
                        </li>
                        <li>
                            <strong>Intelligent Knowledge Orchestration</strong>: Integrated a dynamic,
                            retrieval-augmented knowledge base that allows the agent to navigate my
                            professional history with precision. This architecture ensures that every
                            interaction—whether answering technical inquiries or presenting biographical
                            data—is grounded in an authoritative and contextually accurate data layer.
                        </li>
                    </ul>
                </div>
                <div class="showcase-image-card">
                    <div class="showcase-image">
                        <img src="{portfolio_uri}" alt="Personal Portfolio — Generative UI" />
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Visual divider ── -->
        <div class="section-divider"></div>

        <!-- ── Closing ── -->
        <section class="section">
            <p class="body-text">
                Ultimately, my trajectory in software engineering has been defined by a single, continuous
                cycle: the ability to identify structural entropy and transmute it into scalable,
                high-performance architecture. Whether I am auditing legacy systems to prevent technical
                decay or orchestrating complex, AI-driven ecosystems to drive unprecedented efficiency, my
                objective remains constant: <strong>to bridge the gap between profound technological
                complexity and intuitive, user-centric reality.</strong>
            </p>
            <p class="body-text">
                I do not merely write code; I engineer environments where technology serves a clear,
                strategic purpose. My expertise lies in navigating the delicate tension between the
                <strong>Yin</strong> of deep, architectural research and the <strong>Yang</strong> of rapid,
                high-impact deployment. I bring to your team a commitment to technical excellence, experience
                with reducing operational friction, and a proven methodology for transforming ambitious
                digital visions into resilient, production-ready realities.
            </p>
            <p class="body-text">
                I am prepared to apply this architectural rigor to your most complex challenges, ensuring
                that every system I touch is built not just to function, but to endure and evolve.
            </p>
        </section>

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
    """Create CSS styles matching the CV's visual identity."""

    css_content = """\
@page {
    size: A4;
    margin: 0;
    margin-top: 1.2cm;
}

@page :first {
    margin-top: 0;
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
}

/* ── Header with banner (same as CV) ── */
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

/* ── Body content ── */
.body-content {
    padding: 0.5cm 0.8cm;
}

.section {
    margin-bottom: 0.35cm;
}

/* ── Company separator ── */
.company-separator {
    display: flex;
    align-items: center;
    gap: 0.35cm;
    margin-top: 0.3cm;
    margin-bottom: 0.35cm;
}

.company-separator::before,
.company-separator::after {
    content: "";
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, transparent, #E8A838, transparent);
}

.company-separator-text {
    font-size: 12pt;
    font-weight: 800;
    color: #E8A838;
    text-transform: uppercase;
    letter-spacing: 2px;
    white-space: nowrap;
}

.section-title {
    font-size: 13pt;
    font-weight: 800;
    color: #222;
    border-bottom: 2px solid #E8A838;
    padding-bottom: 0.08cm;
    margin-bottom: 0.3cm;
    margin-top: 0.1cm;
}

.body-text {
    font-size: 8.5pt;
    line-height: 1.55;
    color: #333;
    margin-bottom: 0.25cm;
    text-align: justify;
}

.pillar-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: #E8A838;
    margin-top: 0.22cm;
    margin-bottom: 0.1cm;
}

code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 8pt;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0.03cm 0.12cm;
    color: #444;
}

/* ── Showcase (side-by-side project + image) ── */
.showcase {
    display: flex;
    gap: 0.5cm;
    margin-bottom: 0.4cm;
    align-items: flex-start;
    page-break-inside: avoid;
}

.showcase-text {
    flex: 1;
}

.showcase-image-card {
    flex: 0 0 7.8cm;
    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0.25cm;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06);
}

.showcase-image {
    overflow: hidden;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.showcase-image img {
    width: 100%;
    height: auto;
    display: block;
}

.showcase-name {
    font-size: 11pt;
    font-weight: 700;
    color: #222;
    margin-bottom: 0.04cm;
}

.showcase-subtitle {
    font-size: 8.5pt;
    font-weight: 600;
    color: #E8A838;
    font-style: italic;
    margin-bottom: 0.12cm;
}

.showcase-desc-italic {
    font-size: 8pt;
    font-style: italic;
    color: #555;
    line-height: 1.45;
    margin-bottom: 0.15cm;
}

.showcase-bullets {
    margin-left: 0.3cm;
}

.showcase-bullets li {
    font-size: 7.5pt;
    line-height: 1.45;
    margin-bottom: 0.1cm;
    color: #444;
}

/* ── Section divider ── */
.section-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent 5%, #E8A838 30%, #E8A838 70%, transparent 95%);
    margin: 0.6cm 1.5cm;
    opacity: 0.6;
}

/* ── Footer ── */
.footer {
    background: #E8A838;
    padding: 0.15cm 1cm;
    text-align: center;
    position: running(footer);
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
    """Generate the PDF cover letter."""

    print("🎨 Generating your cover letter...")

    html_content = create_html_cover_letter()
    css_content = create_css_styles()

    font_config = FontConfiguration()
    html = HTML(string=html_content)
    css = CSS(string=css_content, font_config=font_config)

    output_path = Path(__file__).parent / "Afonso_Caboz_Cover_Letter.pdf"
    html.write_pdf(
        target=str(output_path),
        stylesheets=[css],
        font_config=font_config,
    )

    print(f"✅ PDF generated successfully: {output_path}")
    print(f"📄 File size: {output_path.stat().st_size / 1024:.1f} KB")

    return output_path


if __name__ == "__main__":
    generate_pdf()
