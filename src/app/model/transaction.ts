export interface Transaction{
    transactionId?: number;
    portfolioId: number;
    timestamp?: string;
    transactionAmount?: number;
    cryptoName: string;
    transactionType: string;
    shares?: number;
    cryptoRate?: number;
}