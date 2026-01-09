import { CortexEngine } from '../engine/cortex.js';

export class UIController {
    constructor(authService) {
        this.coach = new CortexEngine();
        this.auth = authService;
        this.init();
    }

    init() {
        this.els = {
            input: document.getElementById('ideaInput'),
            btn: document.getElementById('evaluateBtn'),
            results: document.getElementById('resultsSection'),
        };

        if (this.els.input) {
            this.els.input.addEventListener('input', () => {
                const count = document.getElementById('charCount');
                if (count) count.innerText = this.els.input.value.length;
            });
        }

        if (this.els.btn) this.els.btn.addEventListener('click', () => this.runAnalysis());

        const newBtn = document.getElementById('newAnalysisBtn');
        if (newBtn) newBtn.addEventListener('click', () => {
            this.els.results.classList.add('hidden');
            this.els.input.value = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportReport());

        // Delegate tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-btn')) {
                const btn = e.target.closest('.tab-btn');
                const tabs = document.querySelectorAll('.tab-btn');
                const panels = document.querySelectorAll('.tab-panel');
                tabs.forEach(x => x.classList.remove('active'));
                panels.forEach(x => x.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            }
        });
    }

    async runAnalysis() {
        if (!this.auth.checkPlanLimit()) return;

        const ideaText = this.els.input.value;
        if (ideaText.length < 10) {
            alert("Please enter a bit more detail about your idea!");
            return;
        }

        this.els.btn.classList.add('loading');

        // 1. Prepare UI for "Thinking" Mode
        this.els.results.classList.remove('hidden');
        this.els.results.innerHTML = `
            <div class="thinking-console glass-card">
                <div class="console-header">CORTEX AI ENGINE v4.0</div>
                <div id="thoughtLog" class="thought-log"></div>
            </div>
        `;
        this.els.results.scrollIntoView({ behavior: 'smooth' });

        // 2. Run Analysis
        const data = await this.coach.analyze(ideaText);

        // 3. Replay Thoughts
        const log = document.getElementById('thoughtLog');
        for (const thought of data.thoughts) {
            const line = document.createElement('div');
            line.className = 'console-line';
            line.innerHTML = `<span class="timestamp">[${new Date().toLocaleTimeString().split(' ')[0]}]</span> ${thought}`;
            log.appendChild(line);
            log.scrollTop = log.scrollHeight;
            await new Promise(r => setTimeout(r, 800));
        }

        await new Promise(r => setTimeout(r, 1000));

        // 4. Render Final Dashboard
        await this.auth.incrementAnalysis();
        this.renderDashboard(data);
        this.els.btn.classList.remove('loading');
        this.currentData = data;
    }

    renderDashboard(data) {
        this.els.results.innerHTML = this.getDashboardHTML(data);

        setTimeout(() => {
            const ring = document.getElementById('scoreRing');
            if (ring) {
                const offset = 534 - (534 * data.score / 100);
                ring.style.strokeDashoffset = offset;
                ring.style.stroke = data.score > 80 ? '#10b981' : data.score > 60 ? '#f59e0b' : '#ef4444';
            }
        }, 100);

        const copyBtn = document.getElementById('copyPitchBtn');
        if (copyBtn) {
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(data.content.funding.pitch).then(() => {
                    const original = copyBtn.innerHTML;
                    copyBtn.innerHTML = '✅';
                    setTimeout(() => copyBtn.innerHTML = original, 2000);
                });
            };
        }
    }

    getDashboardHTML(data) {
        const c = data.content;
        const meta = data.meta;

        return `
            <!-- Score Header -->
            <div class="score-card glass-card">
                <div class="score-ring-container">
                    <svg class="score-ring" viewBox="0 0 200 200">
                        <circle class="score-ring-bg" cx="100" cy="100" r="85" />
                        <circle id="scoreRing" class="score-ring-progress" cx="100" cy="100" r="85" />
                    </svg>
                    <div class="score-content">
                        <span class="score-value">${data.score}</span>
                        <span class="score-label">CORTEX SCORE</span>
                    </div>
                </div>
                <div class="score-verdict">
                    <div class="verdict-badges">
                        <span class="badge">${meta.industry.toUpperCase()}</span>
                        <span class="badge secondary">${meta.model.toUpperCase()}</span>
                    </div>
                    <h2 class="verdict-text">${data.score > 80 ? 'Unicorn Potential' : data.score > 60 ? 'Viable Business' : 'High Risk Venture'}</h2>
                    <p class="verdict-subtext">${c.summary}</p>
                </div>
            </div>

            <!-- Deep Analysis Grid -->
            <div class="analysis-grid">
                <div class="grid-card glass-card">
                    <h3>🚀 Growth Engines</h3>
                    <ul>${c.strengths.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
                <div class="grid-card glass-card warning">
                    <h3>⚠️ Critical Risk Factors</h3>
                    <ul>${c.improvements.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
            </div>

            <!-- Financials & Competitors Row -->
            <div class="analysis-grid">
                <div class="grid-card glass-card">
                    <h3>💰 Pro-Forma P&L (Year 1)</h3>
                    <div class="financial-table">
                        ${c.financials}
                    </div>
                </div>
                <div class="grid-card glass-card">
                    <h3>⚔️ Key Competitors</h3>
                    <div class="competitor-list">
                        ${c.competitors.map(comp => `
                            <div class="comp-tag">${comp}</div>
                        `).join('')}
                    </div>
                    <p style="font-size:0.8rem; margin-top:1rem; color:#888">Strategy: ${c.funding.strategy}</p>
                </div>
            </div>

            <!-- Tabs Section -->
            <div class="feedback-card glass-card">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="roadmap">🗺️ Execution Roadmap</button>
                    <button class="tab-btn" data-tab="funding">💰 VC Pitch Logic</button>
                </div>
                
                <div class="tabs-content">
                    <div id="tab-roadmap" class="tab-panel active">
                         <div class="timeline">
                            ${c.validation_steps.map((step, i) => `
                                <div class="timeline-item">
                                    <div class="step-num">${i + 1}</div>
                                    <div class="step-content">${step}</div>
                                </div>
                            `).join('')}
                         </div>
                    </div>

                    <div id="tab-funding" class="tab-panel">
                        <div class="funding-box">
                            <div class="funding-meta">
                                <div><strong>Est. Capital:</strong> ${c.funding.estimate}</div>
                                <div><strong>Unfair Advantage:</strong> Niche Dominance</div>
                            </div>
                            <div class="email-preview">${c.funding.pitch}</div>
                            <button class="action-btn primary sm" id="copyPitchBtn" style="margin-top:10px; width:100%">Copy Pitch</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
             <div class="action-buttons">
                <a href="#" onclick="location.reload()" class="action-btn secondary">New Analysis</a>
                <button id="exportBtn" class="action-btn primary">Download Report</button>
            </div>
        `;
    }

    exportReport() {
        if (!this.currentData) return;
        const d = this.currentData;
        const txt = `CORTEX AI REPORT\nScore: ${d.score}\n\nSUMMARY\n${d.content.summary}\n\nSTRATEGY\n${d.content.funding.pitch}`;
        const blob = new Blob([txt], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'cortex_report.txt';
        a.click();
    }
}
