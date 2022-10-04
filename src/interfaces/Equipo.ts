export interface Equipo {
    id: number;
    name: string;
    patente: string;
    tipo: Tipo;
    chofer: string;
    info: string;
    estado: boolean;
}

export enum Tipo {
    Acoplado = 'Acoplado',
    Camion = 'Camion',
    Camioneta = 'Camioneta',
    Carreton = 'Carreton',
    Semirremolque = 'Semirremolque',
}