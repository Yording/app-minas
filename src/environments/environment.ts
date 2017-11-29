// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

//Desarrollo:
//apiOdata: "http://seguimientominasdllobk.azurewebsites.net/odata",
//api: "http://seguimientominasdllobk.azurewebsites.net/api",

//QA:
//apiOdata: "http://sistemaseguimientominasqa.azurewebsites.net/odata",
//api: "http://sistemaseguimientominasqa.azurewebsites.net/api",

//Producción:
apiOdata: "http://sistemaseguimientominas.azurewebsites.net/odata",
api: "http://sistemaseguimientominas.azurewebsites.net/api",

};