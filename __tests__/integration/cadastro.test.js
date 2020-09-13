const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database/db');





describe('Register student', ()=> {
    beforeEach(async ()=> {
        db.serialize();
        db.run(`DELETE FROM alunos `, function(err){
            if(err){
                return console.log(err)
            } 
    
            console.log("in order to perform the tests properly, all records from table alunos were deleted!");
        });
    }

        
    );
    it('should be able to register a student with proper credentials', async ()=>{
        const response = await request(app)
        .post('/register').send({
            name:'teste', 
            instrument:'teste', 
            coment:'teste'
        });
        

        expect(response.status).toBe(201);
    })
})

describe('Unregister student', ()=>{
    beforeEach(async()=>{
        
        db.serialize();
                

            const queryInsert = `
            INSERT INTO alunos(
                name,
                instrument,
                coment
            )
            VALUES(?,?,?) 
        `
            const values = [
                "Lustosa",
                "bateria",
                "blablabla"
        ];

        db.run(queryInsert, values, function(err){
            if(err){
                return console.log("Error on insert a student!")
            }

            console.log('student sucessfully registered!');
            console.log(this);
        })
                
            });

            it('Should be able to unregister a student', async ()=>{
                const param = 1;
                const response = await request(app).delete(`/register/1`);

                expect(response.status).toBe(200);
                
            });
        })

        describe('Index students',()=>{
            it('Should list all students', async()=>{
                const response = await request(app).get('/register');

                expect(response.status).toBe(200);
            });
        })

        describe('Find a specific student', ()=>{
            it('Should be able to find a specific student from the records', async()=>{
                const param = 'asdw'
                const response = await request(app).get('/register/student/24');

                expect(response.status).toBe(200);
            })
        })