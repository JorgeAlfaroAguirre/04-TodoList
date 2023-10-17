
require('colors');
const inquirer =  require('inquirer');


const questions = [ 
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices: [
            {value: '1', name:`${'1.'.green} Create a Task`},
            {value: '2', name: `${'2.'.green} Show Tasks`},
            {value: '3', name: `${'3.'.green} Show Completed Tasks`},
            {value: '4', name: `${'4.'.green} Show Pending Tasks`},
            {value: '5', name: `${'5.'.green} Complete a Task`},
            {value: '6', name: `${'6.'.green} Delete a Task`},
            {value: '0', name: `${'0.'.green} Exit`},
        ]
    }    
]

const inquirerMenu = async()=>{

    console.clear()

    console.log(('================================================'.green));
    console.log('                    TODO APP                    '.white);
    console.log('                Select an option:               '.white);
    console.log('================================================\n'.green);

    const {options} = await inquirer.prompt(questions);

    return options
}


const pause = async()=>{

    const question = [
            {type: 'input', name: 'enter', message: `\nPress ${'Enter'.blue} to continue\n`}
    ]

    await inquirer.prompt(question);

}


const readInput = async(message)=>{

    const question = {
        type: 'input',
        name: 'description',
        message, // => message: message 
        validate( value ){
            if(value.length === 0){
                return 'Please enter a value';
            }
            return true;
        }
    };

    const { description } = await inquirer.prompt(question);
    return description
}

//Check To Update

const showListCheckList = async (TaskList = [])=>{

    const choices = TaskList.map((task, i ) => {

        const index = `${ i + 1 }.`.green;

        return {

            value: task.id,
            name:  `${ index } ${ task.description }`,
            checked: (task.completionDate)? true : false

        }

    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selected',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(questions);
    return ids;
}

//Detele
const listTasksToDelete = async (TaskList = [])=>{

    const choices = TaskList.map((task, i ) => {

        const index = `${ i + 1 }.`.green;

        return {

            value: task.id,
            name:  `${ index } ${ task.description }`

        }

    });


    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });


    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirmDeleteTask = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    showListCheckList,
    listTasksToDelete,
    confirmDeleteTask
}