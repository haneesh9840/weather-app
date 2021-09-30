//const val = require('validator')
const notes = require('./notes.js')
    //console.log(val.isEmail('dabbiruhaneesh@gmail.com'))
    //console.log(val.isURL("https://www.google.com"))
const chalk = require('chalk')
const yargs = require('yargs')
yargs.command({
    command: 'add',
    describe: 'adding a new note!',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'

        },
        body: {
            describe: 'main content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})
yargs.command({
    command: 'remove',
    describe: 'removing a note!',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'

        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})
yargs.command({
    command: 'list',
    describe: 'it lists the notes',
    handler: () => notes.listNote()


})
yargs.command({
    command: 'read',
    describe: 'it reads all the notes',
    builder: {
        title: {
            describe: 'read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
})
yargs.parse()
    //console.log(yargs.argv)
    // const command = process.argv[2]
    // if (command === "add") {
    //     console.log("Adding note!")
    // }
    // else if (command === "remove") {
    //     console.log("removing note!")
    // }
    //console.log(chalk.yellow.bold("sukhibava!"))
    //console.log(chalk.green.bold(process.argv[2]))