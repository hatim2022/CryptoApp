export interface Investment {
  investmentId : number;
  portfolioId : number;
  cryptoName : string;
  investedAmount : number;
  shares : number;
  cryptoRate: number;
  cryptoList: Crypto[];
}
