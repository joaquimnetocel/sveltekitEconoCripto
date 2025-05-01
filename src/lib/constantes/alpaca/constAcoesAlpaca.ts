const aux = ['TSLA'] as const;
type tipo = (typeof aux)[number];
export const constAcoesAlpaca: tipo[] = [...aux]; // array mutável com valores fixos
