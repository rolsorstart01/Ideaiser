export const SIMULATIONS = {
    metrics: {
        'saas': [
            { name: 'LTV/CAC', formula: 'Target > 3.0x', desc: 'The golden ratio of efficiency' },
            { name: 'Magic Number', formula: '> 0.75', desc: 'Sales efficiency indicator' },
            { name: 'Net Dollar Retention', formula: '> 110%', desc: 'Growth from existing customers' }
        ],
        'marketplace': [
            { name: 'Liquidity', formula: '> 30% fill rate', desc: 'Matching efficiency' },
            { name: 'GmvToRevenue', formula: '10-15%', desc: 'Take rate benchmark' }
        ],
        'ecommerce': [
            { name: 'AOV', formula: 'Industry optimized', desc: 'Average Order Value' },
            { name: 'Repeat Purchase Rate', formula: '> 25%', desc: 'Brand stickiness' }
        ]
    }
};

export const CORTEX_KNOWLEDGE = {
    industries: {
        'fintech': { weight: 1.4, cagr: '18%', keywords: ['finance', 'money', 'invest', 'bank', 'crypto', 'wallet', 'payment', 'stock'] },
        'healthtech': { weight: 1.5, cagr: '25%', keywords: ['health', 'doctor', 'patient', 'medical', 'care', 'fitness', 'wellness', 'hospital'] },
        'edtech': { weight: 1.2, cagr: '16%', keywords: ['learn', 'course', 'school', 'student', 'teach', 'education', 'exam', 'skill'] },
        'ecommerce': { weight: 1.1, cagr: '10%', keywords: ['shop', 'store', 'sell', 'product', 'brand', 'fashion', 'retail', 'clothing'] },
        'saas': { weight: 1.6, cagr: '22%', keywords: ['software', 'tool', 'platform', 'b2b', 'enterprise', 'workflow', 'automate', 'data'] },
        'agritech': { weight: 1.3, cagr: '12%', keywords: ['farm', 'crop', 'agriculture', 'food', 'plant', 'soil', 'harvest'] },
        'logistics': { weight: 1.2, cagr: '8%', keywords: ['delivery', 'ship', 'transport', 'supply chain', 'fleet', 'truck', 'warehouse'] },
        'social': { weight: 1.8, cagr: '15%', keywords: ['community', 'connect', 'social', 'network', 'chat', 'media', 'friend'] },
        'realestate': { weight: 1.1, cagr: '5%', keywords: ['house', 'home', 'property', 'rent', 'buy', 'estate', 'apartment'] },
        'ai': { weight: 1.9, cagr: '38%', keywords: ['ai', 'gpt', 'llm', 'intelligence', 'bot', 'neural', 'automation'] }
    },
    business_models: {
        'subscription': { score: 90, desc: 'Recurring Revenue (High Valuation)', type: 'B2B/B2C' },
        'marketplace': { score: 85, desc: 'Network Effects (Hard start, huge scale)', type: 'Network' },
        'ecommerce': { score: 70, desc: 'Transactional (Low margin, high volume)', type: 'B2C' },
        'freemium': { score: 88, desc: 'User Acquisition Engine', type: 'B2C' },
        'usage_based': { score: 92, desc: 'Aligned Incentives (Modern SaaS)', type: 'B2B' },
        'd2c': { score: 75, desc: 'Brand Building Heavy', type: 'B2C' }
    },
    vc_personas: [
        { name: "Sequoia Cap", focus: "Market Size > $10B", style: "Ruthless Growth" },
        { name: "a16z", focus: "Network Effects & Moats", style: "Software Eating World" },
        { name: "Y Combinator", focus: "User Love & Iteration", style: "Make something people want" }
    ]
};
