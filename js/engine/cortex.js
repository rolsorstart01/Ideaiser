import { CORTEX_KNOWLEDGE, SIMULATIONS } from '../data/knowledge.js';
import { COMPETITOR_DB } from '../data/competitors.js';
import { FinancialModeler } from './financial.js';

class DeterministicRandom {
    constructor(seed) {
        this.seed = this.cyrb128(seed);
    }
    cyrb128(str) {
        let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        return (h1 + h2 + h3 + h4) >>> 0;
    }
    // Returns number between 0 and 1
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    // Returns integer between min and max (inclusive)
    range(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

export class CortexEngine {
    constructor() {
        this.knowledge = CORTEX_KNOWLEDGE;
    }

    async analyze(idea) {
        const analysis = this.extractContext(idea);
        const rng = new DeterministicRandom(idea); // Seed with text for unique-but-consistent results

        // 2. "Thinking" Simulation Steps
        const thoughtProcess = [
            `Parsing semantics: Identified key entity "${analysis.prospects[0] || 'Unknown'}"...`,
            `Detected Business Model: ${analysis.model.toUpperCase()} (${analysis.modelData.type})...`,
            `Benchmarking against ${analysis.industry.toUpperCase()} sector standards...`,
            `Searching competitor database for ${analysis.industry} rivals...`,
            `Generating projected P&L using Monte Carlo simulation (Seed: ${rng.seed})...`,
            `Calculating addressable market size (TAM)...`,
            `Synthesizing investor feedback profile...`
        ];

        // 3. Deep Scoring
        const successProbability = this.calculateProbability(analysis);

        // 4. Financial Modeling
        const finance = new FinancialModeler(rng, analysis.industry, analysis.model);
        const pnlTable = finance.generatePL();

        // 5. Competitor Extraction
        const comps = COMPETITOR_DB[analysis.industry] || COMPETITOR_DB['ai'];
        const specificComps = [
            comps[rng.range(0, comps.length - 1)],
            comps[rng.range(0, comps.length - 1)],
            comps[rng.range(0, comps.length - 1)]
        ]; // Pick 3 random but consistent competitors

        return {
            meta: analysis,
            score: successProbability,
            thoughts: thoughtProcess,
            content: this.generateHyperContent(analysis, successProbability, rng, pnlTable, specificComps)
        };
    }

    extractContext(text) {
        const lower = text.toLowerCase();

        // Industry Detection
        let industry = 'general';
        let industryScore = 0;
        for (const [key, data] of Object.entries(this.knowledge.industries)) {
            const matches = data.keywords.reduce((acc, k) => acc + (lower.includes(k) ? 1 : 0), 0);
            if (matches > industryScore) {
                industry = key;
                industryScore = matches;
            }
        }

        // Business Model Detection
        let model = 'transactional';
        if (lower.includes('subscribe') || lower.includes('monthly') || lower.includes('recur')) model = 'subscription';
        else if (lower.includes('connect') && lower.includes('buy') && lower.includes('sell')) model = 'marketplace';
        else if (lower.includes('ad') || lower.includes('free')) model = 'freemium';
        else if (lower.includes('brand') || lower.includes('ship')) model = 'd2c';

        // Prose Concept Extraction (Simple Noun Phrase extraction mock)
        const commonWords = ['the', 'a', 'an', 'is', 'to', 'for', 'of', 'in', 'and'];
        const prospects = lower.split(' ')
            .filter(w => w.length > 4 && !commonWords.includes(w) && !this.knowledge.industries[industry]?.keywords.includes(w))
            .slice(0, 3);

        return {
            text,
            industry,
            model,
            prospects,
            industryData: this.knowledge.industries[industry] || { weight: 1.0, cagr: '5%' },
            modelData: this.knowledge.business_models[model] || { score: 50, desc: 'Standard Business', type: 'General' }
        };
    }

    calculateProbability(analysis) {
        const textLen = analysis.text.length;
        const detailScore = Math.min(textLen / 3, 30);
        const industryWeight = analysis.industryData.weight * 20;
        const modelScore = analysis.modelData.score * 0.3;
        let multiplier = 1.0;
        if (analysis.industry === 'ai') multiplier += 0.1;

        let total = (detailScore + industryWeight + modelScore) * multiplier;
        return Math.min(Math.round(total), 98);
    }

    generateHyperContent(analysis, score, rng, pnl, comps) {
        const isHigh = score > 80;
        const industry = analysis.industry.charAt(0).toUpperCase() + analysis.industry.slice(1);
        const prospect = analysis.prospects[0] ? `focusing on "${analysis.prospects[0]}"` : 'in this sector';

        // Dynamic Variable Prose Generation
        const summaries = [
            `This concept leveraging ${analysis.model} mechanics ${prospect} is remarkably timed. With the ${industry} sector seeing ${analysis.industryData.cagr} CAGR, you are entering a tailwind market.`,
            `A tactical entry into the ${industry} landscape. By exploiting the ${analysis.model} model, you can bypass traditional gatekeepers. However, ${comps[0]} is a key threat to watch.`,
            `The signal-to-noise ratio in this idea is high. Your focus on ${prospect} differentiates you from incumbents like ${comps[1]}. Execution will be your primary variable.`
        ];

        return {
            summary: summaries[rng.range(0, summaries.length - 1)],

            competitors: comps,
            financials: pnl,

            strengths: [
                `Structural advantage in ${industry} due to ${analysis.model} compounding.`,
                `Defensibility against ${comps[0]} via niche specialization.`,
                `Projected gross margins align with top-quartile ${industry} performers.`
            ],

            improvements: [
                `Directly attack ${comps[1]}'s weakness: Customer Support.`,
                `Shorten time-to-value for the "${analysis.prospects[1] || 'primary user'}" persona.`,
                `Implement a "Viral Loop" at the point of transaction.`
            ],

            validation_steps: [
                `Step 1: manually scrape data related to ${analysis.prospects[0] || 'the problem'}.`,
                `Step 2: Cold DM 50 users who follow ${comps[0]} on Twitter/X.`,
                `Step 3: Pre-sell the ${analysis.modelData.type} offering at a 50% discount.`
            ],

            metrics: SIMULATIONS.metrics[analysis.model === 'subscription' ? 'saas' : analysis.model === 'marketplace' ? 'marketplace' : 'ecommerce'] || SIMULATIONS.metrics['saas'],

            funding: {
                estimate: `$${rng.range(25, 150)}k`,
                strategy: "Target Angel Investors who missed out on " + comps[0],
                pitch: `We are building the ${comps[0]} for ${analysis.prospects[0] || 'the new economy'}. While they focus on mass market, we capture the premium ${industry} segment with superior unit economics.`
            }
        };
    }
}
