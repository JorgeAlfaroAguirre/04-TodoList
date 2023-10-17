const Task = require('./task')

class TaskList {
    
    _list = {
        'abc': 123
    };

    get listArr(){

        const list = [];
        Object.keys(this._list).forEach( key =>{
            const task = this._list[key];
            list.push(task);
        })

        return list;

    }

    constructor(){
        this._list = {};
    }

//Create

    createTask(desc = ''){

        const task = new Task(desc);
        this._list[task.id] = task;

    }

    loadTasks( TaskListData = [] ){
        
        TaskListData.forEach(task =>{
            this._list[task.id] = task;
        })

    }

//Read

    readTasks(){
        this.listArr.forEach((task, i) =>{
            
            const index = `${i+1}`.green;
            const { description, completionDate } = task;
            const status = (completionDate)?'Completed'.green:'Pending'.red;

            console.log(index+ " " + description +" : "+ status )

        })
    }

    readPendingOrCompleted( completed = true){
        
        console.log()
        let counter = 0;
        this.listArr.forEach((task, i) =>{
            
            const { description, completionDate } = task;
            const status = (completionDate)?`${completionDate}`.green:'Pending'.red;

            if(completed){
                if(completionDate){
                    counter += 1;
                    console.log(`${(counter + '.').green} ${description} : ${status}` )
                }
            }else{
                if(!completionDate){
                    counter++;
                    console.log(`${(counter + '.').green} ${description} : ${status}` )
                }
            }

        })
    }

    deleteTask(id=''){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    toggleCompleted( ids = []){
        
        ids.forEach( id => {

            const task = this._list[id];
            if( !task.completionDate ){
                task.completionDate = new Date().toISOString();
            }
        
        });

        this.listArr.forEach( task => {
            
            if( !ids.includes(task.id)){
                this._list[task.id].completionDate = null;
            }

        })

    }

}

module.exports = TaskList;