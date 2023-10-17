require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    showListCheckList,
    listTasksToDelete,
    confirmDeleteTask
} = require('./helpers/inquirer');

const { saveToDB, readDB } = require('./helpers/saveFile');
const TaskList = require('./models/taskList');


const main = async()=>{

    let opt = '';
    const taskList = new TaskList();
    const tasksDB = readDB();

    if(tasksDB){
        taskList.loadTasks( tasksDB );
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                
                const description = await readInput('Description:');
                taskList.createTask(description);

            break;
            
            case '2':

                taskList.readTasks()
            
            break;

            case '3':

                taskList.readPendingOrCompleted(true);

            break;

            case '4':

                taskList.readPendingOrCompleted(false);

            break;

            case '5':

                const ids = await showListCheckList( taskList.listArr);
                taskList.toggleCompleted(ids)

            break;

            case '6':

                const id = await listTasksToDelete( taskList.listArr );

                if( id !== '0'){
                    const ok = await confirmDeleteTask('Are you sure?');
                    if( ok === true){
                        taskList.deleteTask(id);
                        console.log(id)
                        console.log(`Task deleted correctly`);
                    }
                }

            break;

            default:
                break;
        }

        saveToDB(taskList.listArr);

        await pause();

    } while (opt !== '0');
    
    
}

main();