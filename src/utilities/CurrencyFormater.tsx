

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // currencyDisplay: 'code'
});

export function CurrencyFormatter(number: number): string {
    return CURRENCY_FORMATTER.format(number);
}