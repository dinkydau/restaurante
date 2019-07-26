//+++++++++++++++++++++++++++++++++++++++++++
//PERMITE HABILITAR VARIABLES GLOBALES Y GENERAR
//  UN AMBIENTE DE DESARROLLO Y PRODUCTIVO
//+++++++++++++++++++++++++++++++++++++++++++
//===========================================
//               PUERTO
//===========================================
process.env.PORT = process.env.PORT || 3000;
//===========================================
//            CONEXION MONGOOSE
//===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
let urlDB;
if (process.env.NODE_ENV ==='dev'){
    urlDB='mongodb://localhost:27017/restaurante';
}else{
    urlDB=process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
//===========================================
//            DURACION DEL TOKEN    
//===========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = '48h';
//===========================================
//         SEED AUTENTICACION GOOGLE            
//===========================================
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'seed-desarrollo';
//===========================================
//         CLIENT ID DE GOOGLE AUTH
//===========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '568748756335-vp5i0lcofq66un2s5ev99pcubnsu3min.apps.googleusercontent.com';