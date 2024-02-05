import { Project } from "./classes"

export default class ToDoList {
    constructor() {
        this.projects = []
        this.projects.push(new Project('All'))
        this.projects.push(new Project('Priority'))
        this.projects.push(new Project('Completed'))
    }

createProject(name) { //create new project class and add it to the project array
    const project = new Project(name)
    this.projects.push(project)
    return project
}

get getProjects() { //return the array with all projects
    return this.projects
}

findProject(name) { //return a project in the project array using an inputted project name
    return this.projects.find((project) => project.getName == name)
}

deleteProject(name) { //removes the inputted project by using splice to remove thh 1 element at the given project's index
    this.projects.splice(this.projects.indexOf(this.findProject(name)), 1)
}

}
