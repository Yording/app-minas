export class Multimedia{
    constructor(
        public nombreActividad: string = "",
        public idActividad: string = "",
        public idConexion?: number,
        public tipoDetalle: object = {},
        public conexion: object = {},
        public descripcion?: string
    ){

    }
}