export class Connection{
    constructor(
        public nombreConexion: string="",
        public periodoSincronizacion: number = 5,
        // public idTipoConexion: number = 0,
        public descripcion?: string,
    ){

    }
}