const aux = ['BTC/USD'] as const;
type tipo = (typeof aux)[number];
export const constMoedasAlpaca: tipo[] = [...aux]; // array mutável com valores fixos
