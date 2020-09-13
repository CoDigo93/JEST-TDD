
const sqlite3 = require("sqlite3").verbose();


const db = new sqlite3.Database("./src/database/database.sql");



 db.serialize(()=>{
     db.run(`DROP TABLE alunos`, function(err){
         if(err){
             console.log(err.message);
         }
         console.log('Table deleted!');
     });

    db.run(`CREATE TABLE IF NOT EXISTS alunos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        instrument TEXT,
        coment TEXT
    )`);
    console.log('Creating table!')

})
 
 



/*
db.serialize(()=>{
    //Criar tabela
    
    db.run(`
        CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            instrument TEXT,
            coment TEXT
        );
    `);
/*
    //inserir aluno na tabela

    const query = `
        INSERT INTO alunos (
            name,
            instrument,
            coment
        
        ) VALUES (?,?,?);
  
    `

    const values = [
        "Rodrigo Lustosa",
        "bateria",
        "Aluno só pode frequentar aulas no verão"
        ];
        
    db.run(query, values,function(err){
        if(err) {return console.log(err)}
        
        

         console.log('Aluno cadastrado com sucesso!');
         console.log(this);
    })
 */
    //selecionar todos alunos da tabela
    db.all(`SELECT * FROM alunos`, function(err,rows){
        if(err){
            return console.log(err)
        } 

        console.log('segue a lista de alunos: ',rows)
    })
       
   
        
module.exports = db;


