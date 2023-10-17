require('colors');


const showMenu = ()=>{

    return new Promise(resolve =>{

        console.clear()
    
        console.log(('================================================'.green));
        console.log('                    TODO APP                    '.green);
        console.log('                Select an option:               '.green);
        console.log('================================================\n'.green);
    
        console.log(`${'1.'.green} Create a Task`);
        console.log(`${'2.'.green} Show Tasks`);
        console.log(`${'3.'.green} Show Completed Tasks`);
        console.log(`${'4.'.green} Show Pending Tasks`);
        console.log(`${'5.'.green} Complete a Task`); 
        console.log(`${'6.'.green} Delete a Task`);
        console.log(`${'0.'.green} Exit`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question('Select an option: ', (opt)=>{
            readLine.close();
            resolve(opt);
        })

    });


}

const pause =()=>{

    return new Promise( resolve =>{

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`\nPress ${'Enter'.blue} to continue\n`, ()=>{
            readLine.close();
            resolve()
        })

    })
}

module.exports = {
    showMenu,
    pause
}