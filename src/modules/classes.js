class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    set setName(name) {
        this.name = name
    }  
    
    createTask(title, desc, priority, dueDate) { //create a new task and add it to this project's task list 
        const task = new Task(title, desc, priority, dueDate)
        this.tasks.push(task)
    }
}

//create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
    constructor(title, desc, priority, date) {
        this.title = title
        this.desc = desc
        this.priority= priority
        this.date = date
        this.isComplete = 0
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
        this.date = date
    }  
    
    // set isComplete(complete) {
    //     this.isComplete = complete
    // }
}

export { Project, Task }