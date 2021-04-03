const express = require('express');
const routes = express.Router()

const views = __dirname +  "/views/"

const profile ={
    name: "Ticiana",
    avatar: "https://github.com/ticianacapris.png",
    "monthly-budget": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const Job = {
    data :  [

        {
            id:1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            
            
        },
        {
            id:2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
           
        }
    ],

    controllers:{
        index(req, res) {
        
                const updatedJob =  Job.data.map((job)=>{
                    //ajustes do job
                    const remaining = Job.services.remainingDays(job)
                    const status = remaining <= 0 ? 'done':'progress'
               
                    return {
                        ...job,
                        remaining,
                        status,
                        budget:profile["value-hour"] * job["total-hours"]
                    }
                })
            
            
            
            return res.render( views +"index",{jobs: updatedJob})
            },
        create(req, res){
           return res.render(views + "job")

        },    

        save(req, res) {
            const lastId = Job.data[Job.data.length - 1] ? jobs[jobs.length - 1].id : 1

            jobs.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() //atribuindo a data de hoje
           })
            return res.redirect('/')
        }
    
        },

        services:{
             remainingDays(job){
                //ajustes  no job
           
               //calcular o tempo restante
               const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
                   
               const createdDate = new Date(job.created_at)
           
               const dueDay = createdDate.getDay() + Number(remainingDays);
           
               const dueDateinMs = createdDate.setDate(dueDay)
           
               const timeDiffinMs = dueDateinMs - Date.now()
           
               // transformar milli em dias
               const dayInMs = 1000 * 60 * 60 * 24
           
               const dayDiff = Math.floor(timeDiffinMs / dayInMs)
           
               //restam x dias
               return dayDiff
           
           }

        }
       
    }


routes.get('/',  Job.controllers.index)

routes.get('/job', Job.controllers.create)

routes.post('/job', Job.controllers.save)

routes.get('/job/edit', (req, res) => res.render( views +"job-edit"))

routes.get('/profile', (req, res) => res.render( views +"profile", {profile}))

module.exports = routes;
