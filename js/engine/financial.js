export class FinancialModeler {
    constructor(rng, industry, model) {
        this.rng = rng;
        this.industry = industry;
        this.model = model;
    }

    generatePL() {
        // Base multipliers based on industry
        let baseRev = this.rng.range(5000, 15000); // Month 12 revenue
        if (this.industry === 'saas') baseRev *= 1.5;
        if (this.industry === 'ecommerce') baseRev *= 0.8;

        const grossMargin = this.industry === 'saas' ? 0.85 : this.industry === 'ecommerce' ? 0.40 : 0.60;
        const marketingSpend = Math.floor(baseRev * 0.4);
        const serverCost = this.industry === 'ai' ? Math.floor(baseRev * 0.15) : Math.floor(baseRev * 0.02);

        const rows = [
            { item: 'Revenue (Month 12)', val: baseRev },
            { item: 'COGS / Hosting', val: Math.floor(baseRev * (1 - grossMargin)) + serverCost },
            { item: 'Marketing (CAC)', val: marketingSpend },
            { item: 'Operations', val: Math.floor(baseRev * 0.2) },
            { item: 'EBITDA (Est)', val: Math.floor(baseRev * grossMargin) - marketingSpend - Math.floor(baseRev * 0.2) }
        ];

        return rows.map(r => `
            <div class="fin-row">
                <span class="fin-item">${r.item}</span>
                <span class="fin-val ${r.val < 0 ? 'negative' : ''}">$${Math.abs(r.val).toLocaleString()}</span>
            </div>
        `).join('');
    }
}
