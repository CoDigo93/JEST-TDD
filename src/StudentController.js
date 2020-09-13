const db = require('./database/db');

class StudentController{
   async insert(request, response){
       try{
        const {name, instrument, coment} = request.body;
       
        const query = `INSERT INTO alunos(
            name,
            instrument,
            coment
            )
            VALUES(?,?,?)`
        
        const values = [name, instrument, coment];     
        
        db.run(query, values, function(err){
            if(err){
                console.log('could not register a student ')
                return response.status(400).json({"error":err.message})
                
            } 
            console.log(this);
            return response.status(201).json(this);
        })
        
      
    
    }catch(err){
         return response.status(400).send("Creation error, try again!");
    }
   }

   async delete(request, response) {
       const queryDelete = `
       DELETE FROM alunos WHERE id = ?`
       
       const id = request.params.id;
       const querySelect = `SELECT * FROM alunos`
       
       db.all(querySelect, function(err,rows){
        if(err){
            console.log('error when selecting a student');
            return response.status(400).send('error when selecting a student');
                
           }
           
           const students = rows;
           console.log(students);
           const indice = id - 1;
           console.log(rows[indice]);

        if(!(students[indice].id == id)){
            console.log('student not found!');
            return response.status(404).send('student not found!');
        }else{
            db.run(queryDelete, id, function(err){
                if(err){
                    console.log("could not delete this record!");
                    return response.status(400).send("could not delete this record!");
    
                }
                console.log(`student with id: ${id} deleted sucessfully!`);
                return response.status(200).send("student deleted sucessfully!");
            
       })
        }
           
           
           
       })
       
        

      
   }

   async index(request, response){
       const query = `SELECT * FROM alunos`

       db.all(query,function(err,rows){
        if(err){
            console.log('could not list the records from table')
            return response.status(400).send('could not list the records from table')
        }
        console.log('data:', rows)
        return response.status(200).send('query success!');
       })
   }

   async findOne(request, response){
       const query = `SELECT * FROM alunos WHERE id = ?`
       const id = [2];

       db.all(query, id, function(err, rows){
           if(err){
               console.log('could not find the student');
               return response.status(400).send('could not find the student')
           }
           console.log('data:', rows);
           return response.status(200).send('student found!');
       })
   }

   async update(request, response){
       const {name, instrument, coment} = request.body;
       const id = request.params.id;
       const query = `
       UPDATE alunos SET
       name = COALESCE(?,name),
       instrument = COALESCE(?,instrument),
       coment = COALESCE(?,coment)
       WHERE id = ?
       `
       db.run(query, [name, instrument, coment, id], function(err, result){
           if(err){
               console.log('could not update the record');
               return response.status(400).send('could not update the record');
           }
           console.log('data:',result);
           return response.status(200).send('record updated!', result)
       })
   }
}


module.exports = new StudentController();