1. Comandos p/ Ejecución.

Cluster (Node JS).
- Fork.
npx nodemon server.js --port 3000 
OR
npx nodemon server.js --port 3000 --mode FORK
- Cluster.
npx nodemon server.js --port 3000 --mode CLUSTER

2. Funcionamiento DAO.

Products DAO -> Products DAO Mongo DB (Extends Products DAO) (Singleton) -> Products DAO Factory -> Controllers.

