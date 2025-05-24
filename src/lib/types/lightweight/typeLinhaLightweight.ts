import {
	type DeepPartial,
	type LineStyleOptions,
	type SeriesOptionsCommon,
} from 'lightweight-charts';

type typeOpcoes = DeepPartial<LineStyleOptions & SeriesOptionsCommon> | undefined;
type typeDados = {
	time: number;
	value: number;
}[];

export type typeLinhaLightweight = {
	opcoes: typeOpcoes;
	dados: typeDados;
};
