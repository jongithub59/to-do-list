/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

const dialog = document.getElementById('task-dialog')
const addTask = document.querySelector('.add-project')

addTask.addEventListener('click', (event) => {
    event.preventDefault()
    dialog.showModal()
})


//organize all tasks based on when they are due, if they are important, and completion status



//DOM Logic

//display all projects from project array in the main section

//add project button that calls new project class to make project

//add task button that calls new task class to create a task

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQXBwIExvZ2ljXHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IFtdXHJcbi8vY3JlYXRlIG5ldyBwcm9qZWN0IGNsYXNzL29iamVjdCB3aXRoIHByb2plY3QgbmFtZSBhbmQgdGFza3MgYXJyYXlcclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxyXG4gICAgICAgIHRoaXMudGFza3MgPSBbXVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRUb1Byb2plY3RzKCkgeyAvL2FkZCBuZXcgcHJvamVjdCB0byBhbiBhcnJheSB0aGF0IHdpbGwgYmUgbGF0ZXIgZGlzcGxheWVkIHRvIHRoZSBET01cclxuICAgICAgICBwcm9qZWN0cy5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHsgLy9jcmVhdGUgYSBuZXcgdGFzayBhbmQgYWRkIGl0IHRvIHRoaXMgcHJvamVjdCdzIHRhc2sgbGlzdCBcclxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2NyZWF0ZSBuZXcgdGFzayBjbGFzcy9vYmplY3Qgd2l0aCB0aXRsZSwgZGVzY3JpcHRpb24sIHByaW9yaXR5LCBhbmQgZHVlIGRhdGUgY29sbGVjdGVkIGZyb20gdGhlIHVzZXIgYW5kIGFkZCB0byB0aGUgdGFzayBhcnJheVxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgICAgICB0aGlzLnByaW9yaXR5PSBwcmlvcml0eVxyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZXRUaXRsZSh0aXRsZSkge1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXREZXNjcmlwdGlvbihkZXNjKSB7XHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXRQcmlvcml0eShwcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgfSAgIFxyXG5cclxuICAgIHNldCBzZXREYXRlKGRhdGUpIHtcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkYXRlXHJcbiAgICB9ICBcclxuICAgIFxyXG4gICAgc2V0IGlzQ29tcGxldGUoY29tcGxldGUpIHtcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGUgPSBjb21wbGV0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kaWFsb2cnKVxyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0JylcclxuXHJcbmFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGRpYWxvZy5zaG93TW9kYWwoKVxyXG59KVxyXG5cclxuXHJcbi8vb3JnYW5pemUgYWxsIHRhc2tzIGJhc2VkIG9uIHdoZW4gdGhleSBhcmUgZHVlLCBpZiB0aGV5IGFyZSBpbXBvcnRhbnQsIGFuZCBjb21wbGV0aW9uIHN0YXR1c1xyXG5cclxuXHJcblxyXG4vL0RPTSBMb2dpY1xyXG5cclxuLy9kaXNwbGF5IGFsbCBwcm9qZWN0cyBmcm9tIHByb2plY3QgYXJyYXkgaW4gdGhlIG1haW4gc2VjdGlvblxyXG5cclxuLy9hZGQgcHJvamVjdCBidXR0b24gdGhhdCBjYWxscyBuZXcgcHJvamVjdCBjbGFzcyB0byBtYWtlIHByb2plY3RcclxuXHJcbi8vYWRkIHRhc2sgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHRhc2sgY2xhc3MgdG8gY3JlYXRlIGEgdGFza1xyXG5cclxuLy9hbGwgdGFza3Mgc2VjdGlvbiB0aGF0IGRpc3BsYXlzIGFsbCB0YXNrIGFycmF5IGVsZW1lbnRzIGZyb20gYWxsIHByb2plY3RzXHJcblxyXG4vL290aGVyIHRhYnMgdGhhdCBkaXNwbGF5IHRhc2tzIGZyb20gYWxsIHByb2plY3RzIGJhc2VkIG9uIHNvbWUgY3JpdGVyaWFcclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=