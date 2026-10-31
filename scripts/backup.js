// Sauvegarde complète : DATA_DIR=./data node scripts/backup.js [dossier-de-destination]
const{DatabaseSync}=require('node:sqlite'),fs=require('fs'),path=require('path');
const D=path.resolve(process.env.DATA_DIR||path.join(__dirname,'..','data')),dest=path.resolve(process.argv[2]||path.join(D,'..','sauvegardes'),new Date().toISOString().slice(0,10));
fs.mkdirSync(dest,{recursive:true});const f=path.join(dest,'site.db');fs.rmSync(f,{force:true});
new DatabaseSync(path.join(D,'site.db')).exec(`VACUUM INTO '${f.replace(/'/g,"''")}'`);
fs.cpSync(path.join(D,'uploads'),path.join(dest,'uploads'),{recursive:true});console.log('Sauvegarde créée :',dest);
