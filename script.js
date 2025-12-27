/**
 * IDEAISER - AI Business Idea Coach v3.0
 * Advanced AI scoring engine + Strategic Business Coach
 */

// ============================================
// EXTENDED KNOWLEDGE BASE & RESOURCES
// ============================================

const RESOURCES_DB = {
    general: [
        { name: 'Lean Canvas', type: 'Tool', desc: 'One-page business plan template' },
        { name: 'Y Combinator Library', type: 'Learning', desc: 'Startup advice from top founders' },
        { name: 'Product Hunt', type: 'Launch', desc: 'Place to launch and test new products' }
    ],
    ecommerce: [
        { name: 'Shopify Academy', type: 'Learning', desc: 'Free courses on ecommerce business' },
        { name: 'Jungle Scout', type: 'Tool', desc: 'Market research for products' },
        { name: 'Oberlo', type: 'Sourcing', desc: 'Find products to sell' }
    ],
    saas: [
        { name: 'MicroConf', type: 'Community', desc: 'Community for bootstrapped SaaS founders' },
        { name: 'Stripe Atlas', type: 'Legal', desc: 'Incorporate your startup easily' },
        { name: 'Indie Hackers', type: 'Community', desc: 'Learn from profitable side projects' }
    ],
    marketplace: [
        { name: 'Sharetribe', type: 'Tool', desc: 'Build a marketplace without code' },
        { name: 'Marketplace Academy', type: 'Learning', desc: 'Guide to building chicken-and-egg businesses' }
    ],
    app: [
        { name: 'Bubble', type: 'Tool', desc: 'Build web apps without code' },
        { name: 'FlutterFlow', type: 'Tool', desc: 'Build native mobile apps visually' },
        { name: 'App Store Optimization Guide', type: 'Marketing', desc: 'How to get found in app stores' }
    ],
    content: [
        { name: 'Substack', type: 'Platform', desc: 'Start a paid newsletter' },
        { name: 'Trends.vc', type: 'Research', desc: 'Discover new market trends' }
    ]
};

const METRICS_DB = {
    ecommerce: [
        { name: 'CAC', desc: 'Customer Acquisition Cost' },
        { name: 'AOV', desc: 'Average Order Value' },
        { name: 'LTV', desc: 'Lifetime Value' },
        { name: 'Conversion Rate', desc: 'Visitors who buy' }
    ],
    saas: [
        { name: 'MRR', desc: 'Monthly Recurring Revenue' },
        { name: 'Churn Rate', desc: '% of customers cancelling' },
        { name: 'CAC', desc: 'Cost to acquire a customer' },
        { name: 'LTV/CAC', desc: 'Ratio (aim for >3x)' }
    ],
    marketplace: [
        { name: 'GMV', desc: 'Gross Merchandise Value (total sales)' },
        { name: 'Take Rate', desc: 'Your commission %' },
        { name: 'Liquidity', desc: '% of listings that sell' }
    ],
    app: [
        { name: 'DAU/MAU', desc: 'Daily vs Monthly Active Users' },
        { name: 'Retention', desc: '% users returning after Day 1/7/30' },
        { name: 'ARPDAU', desc: 'Avg Revenue Per Daily Active User' }
    ],
    general: [
        { name: 'Revenue', desc: 'Total income' },
        { name: 'Expenses', desc: 'Monthly burn rate' },
        { name: 'Profit Margin', desc: '% of revenue kept as profit' }
    ]
};

// ... (Previous KNOWLEDGE_BASE and BUSINESS_EXAMPLES remain, extended below)
const BUSINESS_EXAMPLES = {
    ecommerce: {
        successful: [
            { name: 'Shopify', desc: 'Empowered millions to sell online easily' },
            { name: 'Warby Parker', desc: 'Disrupted eyewear with home try-on model' },
            { name: 'Dollar Shave Club', desc: 'Viral marketing + subscription convenience' }
        ],
        failed: [
            { name: 'Fab.com', desc: 'Scaled too fast, lost focus on unit economics' },
            { name: 'Webvan', desc: 'Built massive infrastructure before having demand' }
        ]
    },
    saas: {
        successful: [
            { name: 'Slack', desc: 'Made work communication fun and focused on UX' },
            { name: 'Zoom', desc: 'It just worked when competitors were buggy' }
        ],
        failed: [
            { name: 'Quibi', desc: '$1.7B failure: Misunderstood user behavior' },
            { name: 'Color', desc: '41M raised pre-launch, confusing product' }
        ]
    },
    // ... basic mapping for other categories to general if needed
    general: {
        successful: [{ name: 'Zapier', desc: 'Connected apps, grew through SEO' }],
        failed: [{ name: 'Juicero', desc: 'Over-engineered a simple problem' }]
    }
};

const KNOWLEDGE_BASE_v2 = {
    // Re-using the logic from v2 but simplified structure for the Coach
    market_keywords: ['market', 'demand', 'billion', 'growing', 'customers'],
    // ... (rest implied from logic)
};

// ============================================
// AI COACH ENGINE
// ============================================

class IdeaCoach {
    constructor() {
        // Core weights
        this.weights = {
            marketPotential: 0.18, uniqueness: 0.15, scalability: 0.15,
            feasibility: 0.17, competition: 0.12, targetAudience: 0.12, riskAssessment: 0.11
        };
    }

    normalize(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    // --- Scoring Logic (Efficient Version) ---
    calculateScore(text) {
        const norm = this.normalize(text);
        const len = norm.split(' ').length;

        // Contextual keywords
        const keywords = {
            market: ['billion', 'growing', 'market', 'demand', 'need', 'pain point', 'customers'],
            unique: ['first', 'unique', 'patent', 'proprietary', 'different', 'innovative', 'ai', 'smart'],
            scale: ['software', 'app', 'platform', 'subscription', 'global', 'online', 'scale', 'automated'],
            feasible: ['mvp', 'simple', 'team', 'skill', 'ready', 'prototype', 'easy', 'start'],
            audience: ['millennials', 'businesses', 'gamers', 'parents', 'niche', 'specific', 'target'],
            risk_low: ['low cost', 'validation', 'pre-sales', 'waiting list', 'lean'],
            risk_high: ['regulation', 'legal', 'lawsuit', 'hardware', 'storefront', 'inventory']
        };

        const check = (keys) => keys.reduce((acc, k) => acc + (norm.includes(k) ? 1 : 0), 0);

        // Base Scores
        const scores = {
            marketPotential: 50 + (check(keywords.market) * 8),
            uniqueness: 45 + (check(keywords.unique) * 9),
            scalability: 50 + (check(keywords.scale) * 8),
            feasibility: 60 + (check(keywords.feasible) * 6) - (norm.includes('hardware') ? 15 : 0),
            competition: 50 + (norm.includes('competitor') ? 5 : 0) + (check(keywords.unique) * 5),
            targetAudience: 45 + (check(keywords.audience) * 9),
            riskAssessment: 50 + (check(keywords.risk_low) * 8) - (check(keywords.risk_high) * 10)
        };

        // Length Bonus
        const bonus = Math.min(len / 10, 15);
        Object.keys(scores).forEach(k => scores[k] = Math.min(99, Math.max(30, scores[k] + bonus)));

        // Weighted Total
        let total = 0;
        for (let k in this.weights) total += scores[k] * this.weights[k];

        return { total: Math.round(total), categories: scores };
    }

    // --- Category Detection ---
    detectCategory(text) {
        const norm = this.normalize(text);
        if (norm.match(/shop|store|sell|product|item|e-commerce/)) return 'ecommerce';
        if (norm.match(/software|app|platform|saas|tool/)) return 'saas';
        if (norm.match(/marketplace|connect|buyer|seller/)) return 'marketplace';
        return 'general';
    }

    // --- Content Generators ---

    getSummary(text, score) {
        const tone = score > 75 ? "exciting" : score > 50 ? "solid" : "early-stage";
        if (tone === "exciting") return "Your idea has massive potential! You've identified a clear opportunity with strong mechanics.";
        if (tone === "solid") return "This is a great foundation. With some refinement in differentiation and marketing, this could be a winner.";
        return "You're onto something, but the concept needs more definition. Let's focus on clarifying the problem and solution.";
    }

    getActionPlan(category, score) {
        const plan = [];

        // Phase 1: Validation
        plan.push({
            phase: 'Week 1: Validation',
            style: 'week1',
            tasks: [
                'Create a simple landing page describing your value proposition',
                'Interview 10 potential customers (ask about their problems, not your solution)',
                'Try to get 5 pre-orders or email signups before building anything'
            ]
        });

        // Phase 2: MVP
        plan.push({
            phase: 'Week 2-3: MVP Prototype',
            style: 'week2',
            tasks: [
                category === 'app' ? 'Sketch screens on paper or use Figma' :
                    category === 'ecommerce' ? 'Source 5 sample products and take photos' :
                        'Map out the core user journey on a whiteboard',
                'Build a "Wizard of Oz" version (manual backend) to test the flow',
                'Set up basic analytics (Google Analytics or Mixpanel)'
            ]
        });

        // Phase 3: Launch
        plan.push({
            phase: 'Month 1: Soft Launch',
            style: 'month1',
            tasks: [
                'Launch to your waiting list',
                'Personally onboard your first 10 users',
                'Collect feedback aggressively and iterate daily'
            ]
        });

        return plan;
    }

    getValidationQuestions(category) {
        const questions = [
            "What is the hardest part about [problem] for you?",
            "How do you execute this task right now?",
            "How much money/time do you currently spend solving this?",
            "What have you tried before that didn't work?"
        ];
        if (category === 'saas') questions.push("If I had a magic wand to solve this, what would it look like?");
        if (category === 'ecommerce') questions.push("What's your favorite brand in this space and why?");
        return questions;
    }

    getPivotIdeas(text, category) {
        const ideas = [];
        if (category === 'saas' || category === 'app') {
            ideas.push({ title: 'Service-First Approach', desc: 'Start by offering this as a manual service to learn exactly what customers need before coding.' });
            ideas.push({ title: 'Niche Down', desc: 'Instead of "for everyone", make it exclusively for a specific profession (e.g., "for dentists").' });
        } else if (category === 'ecommerce') {
            ideas.push({ title: 'Subscription Box', desc: 'Turn one-time purchases into a recurring monthly mystery box.' });
            ideas.push({ title: 'Pre-order Model', desc: 'Validate demand by taking orders before manufacturing inventory.' });
        } else {
            ideas.push({ title: 'Community Community', desc: 'Build a community around the problem first, then sell the solution.' });
            ideas.push({ title: 'Digital Course', desc: 'Teach people how to solve the problem themselves first.' });
        }
        return ideas;
    }

    getGTMStrategy(category) {
        if (category === 'saas') {
            return [
                { title: 'Content Marketing', desc: 'Write helpful articles solving small parts of the problem.' },
                { title: 'Cold Outreach', desc: 'Email/DM potential customers directly with a personalized value add.' }
            ];
        }
        if (category === 'ecommerce') {
            return [
                { title: 'Influencer Seeding', desc: 'Send free product to micro-influencers in your niche.' },
                { title: 'Instagram/TikTok Ads', desc: 'Visual storytelling works best for physical products.' }
            ];
        }
        return [
            { title: 'Waitlist Launch', desc: 'Build hype by collecting emails on a landing page.' },
            { title: 'Communities', desc: 'Engage in Reddit/Facebook groups where your users hang out (add value, don\'t just spam).' }
        ];
    }

    // --- Funding Logic ---
    getCapitalEstimate(category, phase) {
        if (category === 'saas' || category === 'app') {
            return { range: "$10k - $50k", desc: "For MVP development & initial marketing. High variance based on tech complexity." };
        }
        if (category === 'ecommerce') {
            return { range: "$5k - $20k", desc: "For inventory, branding, and Shopify/platform setup costs." };
        }
        if (category === 'marketplace') {
            return { range: "$15k - $75k", desc: "Higher cost due to need to balance supply/demand marketing simultaneously." };
        }
        return { range: "$1k - $10k", desc: "Lean startup approach suitable for service/content businesses." };
    }

    getFundingStrategy(score, category) {
        if (score > 75 && (category === 'saas' || category === 'marketplace')) {
            return "<p><strong>🚀 Venture Capital Path:</strong> Your high scalability score makes this attractive to VCs. Focus on growth metrics (MoM) over immediate profit.</p>";
        }
        if (score > 60) {
            return "<p><strong>😇 Angel / Pre-Seed:</strong> Good fit for Angel investors who know this specific industry. Create a pitch deck focusing on your unique insight.</p>";
        }
        return "<p><strong>🥾 Bootstrapping:</strong> Best path currently. Focus on generating revenue from Day 1 to fund growth. This gives you full control and forces discipline.</p>";
    }

    getInvestorPitch(text, category) {
        const norm = this.normalize(text);
        const shortDesc = text.split('.')[0] + '.';
        return `Subject: Building the next big thing in ${category === 'general' ? 'our industry' : category}

Hi [Investor Name],

I'm building a ${category} startup that addresses a key gap in the market: ${shortDesc}

Unlike existing solutions, we focus specifically on [Unique Value Prop], which we believe allows us to capture the underserved [Target Audience] segment.

We are currently in the validation phase and seeing promising early signals. I'd love to get your feedback on our approach given your experience in this space.

Best,
[Your Name]`;
    }

    getInvestorLinks(category) {
        const links = [
            { name: "AngelList", url: "https://angel.co" },
            { name: "Crunchbase", url: "https://crunchbase.com" },
            { name: "Y Combinator", url: "https://www.ycombinator.com/apply" }
        ];
        if (category === 'saas') links.push({ name: "MicroAcquire", url: "https://microacquire.com" });
        if (category === 'ecommerce') links.push({ name: "Clearco", url: "https://clear.co" });
        return links;
    }

    // --- Main Evaluate Function ---
    evaluate(ideaText) {
        if (!ideaText || ideaText.length < 10) return null;

        const category = this.detectCategory(ideaText);
        const { total, categories } = this.calculateScore(ideaText);

        // Generate Dynamic Content
        const summary = this.getSummary(ideaText, total);
        const strengths = this.generateStrengths(categories);
        const improvements = this.generateImprovements(categories);
        const actionPlan = this.getActionPlan(category, total);
        const resources = RESOURCES_DB[category] || RESOURCES_DB.general;
        const metrics = METRICS_DB[category] || METRICS_DB.general;
        const pivotIdeas = this.getPivotIdeas(ideaText, category);
        const gtm = this.getGTMStrategy(category);
        const validation = this.getValidationQuestions(category);
        const examples = BUSINESS_EXAMPLES[category] || BUSINESS_EXAMPLES.general;

        // Funding Content
        const capital = this.getCapitalEstimate(category);
        const fundingStrategy = this.getFundingStrategy(total, category);
        const pitch = this.getInvestorPitch(ideaText, category);
        const investorLinks = this.getInvestorLinks(category);

        // Verdict Text
        let verdict = { text: "Needs Work", subtext: "Let's refine this." };
        if (total >= 80) verdict = { text: "Excellent", subtext: "Investor ready potential!" };
        else if (total >= 60) verdict = { text: "Promising", subtext: "Solid, but polish needed." };

        return {
            overallScore: total,
            verdict,
            categories,
            quickSummary: summary,
            strengths,
            improvements, // Renamed from weaknesses/improvements to just improvement actions
            actionPlan,
            resources,
            metrics,
            pivotIdeas,
            gtm,
            validation,
            examples,
            funding: {
                capital,
                strategy: fundingStrategy,
                pitch,
                links: investorLinks
            }
        };
    }

    generateStrengths(cats) {
        const s = [];
        if (cats.marketPotential > 60) s.push("Strong market demand signals");
        if (cats.uniqueness > 60) s.push("Unique value proposition detected");
        if (cats.scalability > 60) s.push("High growth potential (Scalable)");
        if (cats.feasibility > 60) s.push("Realistic and achievable scope");
        return s.length ? s : ["Idea shows ambition and initiative"];
    }

    generateImprovements(cats) {
        const i = [];
        if (cats.marketPotential < 60) i.push("Research Market Size: Look for competitors and customer count.");
        if (cats.uniqueness < 60) i.push("Differentiate: specific features competitors lack.");
        if (cats.riskAssessment < 60) i.push("Reduce Risk: Can you test this without building the full product?");
        i.push("Talk to Users: Validate your assumptions with real people.");
        return i;
    }
}

// ============================================
// UI CONTROLLER
// ============================================

class UIController {
    constructor() {
        this.coach = new IdeaCoach();
        this.init();
    }

    init() {
        this.els = {
            input: document.getElementById('ideaInput'),
            btn: document.getElementById('evaluateBtn'),
            results: document.getElementById('resultsSection'),
            score: document.getElementById('scoreValue'),
            ring: document.getElementById('scoreRing'),
            charCount: document.getElementById('charCount'),
            verdict: document.getElementById('verdictText'),
            subtext: document.getElementById('verdictSubtext'),
            summary: document.getElementById('quickSummary'),
            catGrid: document.getElementById('categoriesGrid'),
            tabs: document.querySelectorAll('.tab-btn'),
            panels: document.querySelectorAll('.tab-panel')
        };

        this.els.input.addEventListener('input', () => {
            this.els.charCount.innerText = this.els.input.value.length;
        });

        this.els.btn.addEventListener('click', () => this.runAnalysis());

        document.getElementById('newAnalysisBtn').addEventListener('click', () => {
            this.els.results.classList.add('hidden');
            this.els.input.value = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('exportBtn').addEventListener('click', () => this.exportReport());

        this.els.tabs.forEach(t => t.addEventListener('click', (e) => {
            const tabs = document.querySelectorAll('.tab-btn');
            const panels = document.querySelectorAll('.tab-panel');
            tabs.forEach(x => x.classList.remove('active'));
            panels.forEach(x => x.classList.remove('active'));
            e.currentTarget.classList.add('active');
            document.getElementById(`tab-${e.currentTarget.dataset.tab}`).classList.add('active');
        }));
    }

    async runAnalysis() {
        if (!checkPlanLimit()) return;
        if (this.els.input.value.length < 10) return alert("Please enter more details!");

        this.els.btn.classList.add('loading');
        await new Promise(r => setTimeout(r, 1500)); // Fake think time

        const data = this.coach.evaluate(this.els.input.value);
        incrementAnalysis();
        this.renderpResults(data);

        this.els.btn.classList.remove('loading');
        this.currentData = data;
    }

    renderpResults(data) {
        this.els.results.classList.remove('hidden');
        this.els.results.scrollIntoView({ behavior: 'smooth' });

        // Score
        this.els.score.innerText = data.overallScore;
        const offset = 534 - (534 * data.overallScore / 100);
        this.els.ring.style.strokeDashoffset = offset;
        this.els.ring.style.stroke = data.overallScore > 75 ? '#10b981' : data.overallScore > 50 ? '#f59e0b' : '#ef4444';

        this.els.verdict.innerText = data.verdict.text;
        this.els.subtext.innerText = data.verdict.subtext;
        this.els.summary.innerText = data.quickSummary;

        // Categories
        this.els.catGrid.innerHTML = Object.entries(data.categories).map(([k, v]) => `
            <div class="category-item">
                <div class="category-header">
                    <span class="category-name">${k.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span class="category-score">${v}</span>
                </div>
                <div class="category-bar">
                    <div class="category-bar-fill" style="width:${v}%; background:${v > 70 ? '#10b981' : v > 50 ? '#f59e0b' : '#ef4444'}"></div>
                </div>
            </div>
        `).join('');

        // Lists
        const fillList = (id, items) => {
            document.getElementById(id).innerHTML = items.map(i => `<li>${i}</li>`).join('');
        };
        fillList('strengthsList', data.strengths);
        fillList('improvementsList', data.improvements);

        // Action Plan
        document.getElementById('actionPlanContainer').innerHTML = data.actionPlan.map(p => `
            <div class="action-phase ${p.style}">
                <div class="phase-header">
                    <span class="phase-badge">${p.phase}</span>
                </div>
                <ul class="phase-tasks">
                    ${p.tasks.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Funding Tab Content
        document.getElementById('capitalRange').innerText = data.funding.capital.range;
        document.getElementById('capitalDesc').innerText = data.funding.capital.desc;
        document.getElementById('fundingStrategy').innerHTML = data.funding.strategy;
        document.getElementById('investorPitch').innerText = data.funding.pitch;

        document.getElementById('investorLinks').innerHTML = data.funding.links.map(l =>
            `<li><a href="${l.url}" target="_blank">${l.name} ↗</a></li>`
        ).join('');

        // Copy Pitch Button
        const copyBtn = document.getElementById('copyPitchBtn');
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(data.funding.pitch).then(() => {
                const original = copyBtn.innerHTML;
                copyBtn.innerHTML = '✅';
                setTimeout(() => copyBtn.innerHTML = original, 2000);
            });
        };

        // Resources
        document.getElementById('resourcesContainer').innerHTML = data.resources.map(r => `
            <div class="resource-category">
                <h4>${r.name} <span style="font-weight:400; font-size:0.8em; color:#ddd">(${r.type})</span></h4>
                <p style="font-size:0.9rem; color:#aaa">${r.desc}</p>
            </div>
        `).join('');

        // Pivot Ideas
        document.getElementById('pivotIdeasContainer').innerHTML = data.pivotIdeas.map(p => `
            <div class="pivot-idea">
                <h4>${p.title}</h4>
                <p>${p.desc}</p>
            </div>
        `).join('');

        // Metrics
        document.getElementById('metricsGrid').innerHTML = data.metrics.map(m => `
            <div class="metric-item">
                <div class="metric-name">${m.name}</div>
                <div class="metric-desc">${m.desc}</div>
            </div>
        `).join('');

        // GTM
        document.getElementById('gtmContent').innerHTML = data.gtm.map(g => `
            <div class="gtm-strategy">
                <h4>${g.title}</h4>
                <p>${g.desc}</p>
            </div>
        `).join('');

        // Validation
        document.getElementById('validationList').innerHTML = data.validation.map(v => `<li>${v}</li>`).join('');

        // Examples
        fillExampleList('successExamples', data.examples.successful);
        fillExampleList('failureExamples', data.examples.failed);
    }

    exportReport() {
        if (!this.currentData) return;
        const d = this.currentData;
        const txt = `IDEA EVALUATION REPORT\n\nScore: ${d.overallScore}\nVerdict: ${d.verdict.text}\n\nSUMMARY\n${d.quickSummary}\n\nSTRENGTHS\n${d.strengths.join('\n')}\n\nACTION PLAN\n${d.actionPlan.map(p => p.phase + ':\n' + p.tasks.join('\n- ')).join('\n\n')}`;
        const blob = new Blob([txt], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'idea_report.txt';
        a.click();
    }
}

function fillExampleList(id, items) {
    document.getElementById(id).innerHTML = items ? items.map(i => `
        <li>
            <div class="example-name">${i.name}</div>
            <div class="example-desc">${i.desc}</div>
        </li>
    `).join('') : '';
}

document.addEventListener('DOMContentLoaded', () => {
    new UIController();
    initPayments();

    // Gradient definition for SVG
    const svg = document.querySelector('.score-ring');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#667eea"/>
                <stop offset="100%" style="stop-color:#f093fb"/>
            </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
    }
});

// --- Persistence & Plan Logic ---
let isPro = localStorage.getItem('ideaiser_pro') === 'true';
let analysisCount = parseInt(localStorage.getItem('ideaiser_count') || '0');
const MAX_FREE_ANALYSES = 3;

function updatePlanUI() {
    const proBtn = document.getElementById('proPlanBtn');
    const pricingSection = document.getElementById('pricingSection');

    if (isPro) {
        if (proBtn) {
            proBtn.innerText = "Pro Member ✨";
            proBtn.disabled = true;
            proBtn.classList.add('pro-active');
        }
        // Optionally hide pricing grid if Pro
        const pricingGrid = document.querySelector('.pricing-grid');
        if (pricingGrid) pricingGrid.style.opacity = "0.7";
    }
}

function incrementAnalysis() {
    analysisCount++;
    localStorage.setItem('ideaiser_count', analysisCount.toString());
}

function checkPlanLimit() {
    if (!isPro && analysisCount >= MAX_FREE_ANALYSES) {
        alert("Free limit reached! Please upgrade to Pro for unlimited analyses. 🚀");
        document.getElementById('pricingSection').scrollIntoView({ behavior: 'smooth' });
        return false;
    }
    return true;
}

function initPayments() {
    const RAZORPAY_KEY_ID = 'rzp_live_RuaMsQ3mGUXGtH';

    const proBtn = document.getElementById('proPlanBtn');
    const donateBtn = document.getElementById('donateBtn');
    const donateAmountInput = document.getElementById('donationAmount');

    updatePlanUI();

    if (proBtn) {
        proBtn.addEventListener('click', () => {
            if (isPro) return;

            const options = {
                "key": RAZORPAY_KEY_ID,
                "amount": "50000", // ₹500 in paise
                "currency": "INR",
                "name": "Ideaiser Pro",
                "description": "3 Months Special Offer",
                "handler": function (response) {
                    isPro = true;
                    localStorage.setItem('ideaiser_pro', 'true');
                    updatePlanUI();
                    alert("Welcome to Pro! Your access is now permanent on this browser. ✨");
                },
                "theme": { "color": "#667eea" }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        });
    }

    if (donateBtn) {
        donateBtn.addEventListener('click', () => {
            const amount = donateAmountInput ? donateAmountInput.value : 500;
            if (amount < 1) return alert("Please enter at least ₹1");

            const options = {
                "key": RAZORPAY_KEY_ID,
                "amount": (amount * 100).toString(), // Convert to paise
                "currency": "INR",
                "name": "Support Ideaiser",
                "description": "Project Development Support",
                "handler": function (response) {
                    alert("Thank you for your generosity! Payment ID: " + response.razorpay_payment_id);
                },
                "theme": { "color": "#f59e0b" }
            };
            const rzp = new Razorpay(options);
            rzp.open();
        });
    }
}

