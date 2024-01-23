//App Logic

const projects = []
//create new project class/object with project name and tasks array
class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
    
    addToProjects() { //add new project to an array that will be later displayed to the DOM
        projects.push(this)
    }

    createTask(title, desc, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, desc, priority, dueDate)
        this.tasks.push(task)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, desc, priority, dueDate) {
        this.title = title
        this.desc = desc
        this.priority= priority
        this.dueDate = dueDate
        this.isComplete = false
    }

    set setTitle(title) {
        this.title = title
    }   

    set setDescription(desc) {
        this.desc = desc
    }   

    set setPriority(priority) {
        this.priority = priority
    }   

    set setDate(date) {
        this.dueDate = date
    }  
    
    set isComplete(complete) {
        this.isComplete = complete
    }
}


//user selects their tasks for their created projects to add, edit or delete

//organize all tasks based on when they are due, if they are important, and completion status



//DOM Logic

//display all projects from project array in the main section

//add project button that calls new project class to make project

//add task button that calls new task class to create a task

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria


