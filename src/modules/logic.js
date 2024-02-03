import { Project, Task } from "./classes";
import ToDoList from "./toDoList";

export default function createToDoList() {
    console.log('test demo')
    console.log('variables initialized')
    console.log('')
    const toDoList = new ToDoList
    const project1 = toDoList.createProject('Project 4')
    const module1 = project1.createTask('Create Module 1', 'description', 'High', 'tomorrow')
    const module2 = project1.createTask('Create Module 2', 'description', 'Medium', 'tomorrow')
    const module3 = project1.createTask('Create Module 3', 'description', 'Low', 'tomorrow')
    const module4 = project1.createTask('Create Module 4', 'description', 'High', 'tomorrow')
    module4.setCompletion = true
    project1.deleteTask(module4.title)
    module2.setCompletion = true
    module1.setCompletion = true
    console.log(module1.setTitle = 'create module 2')
    toDoList.deleteProject(project1.name)

    console.log(project1.tasks)
    console.log(toDoList.projects)
    console.log('priority',toDoList.findProject('Priority').tasks)
    console.log('completed', toDoList.findProject('Completed').tasks)
    
    const addToArray = function(task) { //adds the task to one of the below arrays if it meets any of the conditions
        if(task.priority == 'High') toDoList.findProject('Priority').tasks.push(task)
        if(task.completion == true) toDoList.findProject('Completed').tasks.push(task)
    }
    addToArray(module1)
    addToArray(module2)
    addToArray(module3)
    // addToArray(module4)
    console.log('')
    console.log('added to arrays')
    console.log('')
    console.log(project1.tasks)
    console.log('priority', toDoList.findProject('Priority').tasks)
    console.log('completed', toDoList.findProject('Completed').tasks)
}