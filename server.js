/*----------------------------------IMPORTS EXTERNOS:----------------------------------*/

import koa from 'koa';
import koaBody from 'koa-body';
import dotenv from 'dotenv';
import Yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';

/*----------------------------------IMPORTS INTERNOS:----------------------------------*/

import { logger } from './src/logger/logger.js';
import { productsRouter } from './src/routers/products.router.js';

const yargs = Yargs(process.argv.slice(2)).argv;

if(cluster.isPrimary){

    /*----------------------------------LÓGICA FORK O CLUSTER:----------------------------------*/

    const numberOfCPUS = os.cpus().length;
    console.log(`La cantidad de CPUS/Procesadores es ${numberOfCPUS}.`);
    console.log(`El Process ID (PID) del PROCESO MÁSTER es ${process.pid}.`);

    if(yargs.mode === "FORK" || yargs.mode === undefined){
        console.log("Fork Mode Activated.");
        for(let i = 1; i < 2; i++){
            cluster.fork()
        };
    }

    if(yargs.mode === "CLUSTER"){
        console.log("Cluster Mode Activated.");
        for(let i = 0; i < numberOfCPUS; i++){
            cluster.fork()
        };
    }

    cluster.on("exit", (worker, code, signal)=>{
        console.log(`El proceso que murió es el del Process ID (PID) ${worker.process.pid}.`);
        cluster.fork(); //Sirve para que si se muere un proceso hijo, se levante automáticamente uno nuevo. Se puede probar matar uno intencionalmente desde el administrador de tareas.
    })

}
else{

    /*----------------------------------SERVIDOR:----------------------------------*/

    dotenv.config();
    const app = new koa();
    app.use(koaBody());

    /*-------------------------RUTAS Y RESPUESTAS:-------------------------*/

    app.use(productsRouter.routes());
                                                                                    
    /*-----------------------------------INICIAR SERVIDOR:------------------------------------*/

    const PORT = process.env.PORT || 8080;

    const server = app.listen(PORT, ()=>{ 
        logger.info(`Server started on PORT ${process.env.PORT}!`)
    });

    server.on('error', (error)=>{
        logger.error(error)
    });

};