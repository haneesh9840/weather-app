const fs = require('fs')
const chalk = require('chalk')
    // const getNotes = () => 'get notes'
const addNote = (title, body) => {
    const notes = loadnotes()
        //adding a feature to check if the title already exists or not!
        // const check = notes.filter(function(note) {
        //     return note.title === title
        // })
        //const check = notes.filter((note) => note.title === title) using filter it will return all he values but we want to stop even if we get 1 value
        //hence we use find where it returns the first value it finds satisfying the condition!
    debugger
    const check = notes.find((note) => note.title === title)
    if (!check) {
        notes.push({
            title: title,
            body: body
        })
        savenotes(notes)
        console.log(chalk.green.inverse("Notes added successfully!"))
    } else {
        console.log(chalk.red.inverse("title Already taken!"))
    }

}
const removeNote = (title) => {
    const notes = loadnotes()
    const filtereddata = notes.filter((note) => note.title != title)
    if (filtereddata.length !== notes.length) {
        console.log(chalk.green.inverse("Note removed"))
        savenotes(filtereddata)
    } else {
        console.log(chalk.red.inverse("Note not removed"))
    }

}
const listNote = () => {
    const notes = loadnotes()
    console.log(chalk.blue("YOur notes"))
    notes.forEach((note) => {
        console.log(note.title)
    });
    //console.log(notes)
}
const readNote = (title) => {
    const notes = loadnotes()
    const check = notes.find((note) => note.title === title)
    if (check) {
        console.log(chalk.blue.italic(check.title))
        console.log(chalk.yellow(check.body))
    } else {
        console.log(chalk.red.bold("Not Found!"))
    }
}
const savenotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}
const loadnotes = () => {
    try {
        const note = fs.readFileSync('notes.json')
        const notejson = note.toString()
        const parsenote = JSON.parse(notejson)
        return parsenote
    } catch (e) {
        return []
    }
}
module.exports = {
    //getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}