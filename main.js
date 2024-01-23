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


//user selects their tasks for their created projects to add, edit or delete

//organize all tasks based on when they are due, if they are important, and completion status



//DOM Logic

//display all projects from project array in the main section

//add project button that calls new project class to make project

//add task button that calls new task class to create a task

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0FwcCBMb2dpY1xyXG5cclxuY29uc3QgcHJvamVjdHMgPSBbXVxyXG4vL2NyZWF0ZSBuZXcgcHJvamVjdCBjbGFzcy9vYmplY3Qgd2l0aCBwcm9qZWN0IG5hbWUgYW5kIHRhc2tzIGFycmF5XHJcbmNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLnRhc2tzID0gW11cclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkVG9Qcm9qZWN0cygpIHsgLy9hZGQgbmV3IHByb2plY3QgdG8gYW4gYXJyYXkgdGhhdCB3aWxsIGJlIGxhdGVyIGRpc3BsYXllZCB0byB0aGUgRE9NXHJcbiAgICAgICAgcHJvamVjdHMucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkdWVEYXRlKSB7IC8vY3JlYXRlIGEgbmV3IHRhc2sgYW5kIGFkZCBpdCB0byB0aGlzIHByb2plY3QncyB0YXNrIGxpc3QgXHJcbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSlcclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzaylcclxuICAgIH1cclxufVxyXG5cclxuLy9jcmVhdGUgbmV3IHRhc2sgY2xhc3Mvb2JqZWN0IHdpdGggdGl0bGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0eSwgYW5kIGR1ZSBkYXRlIGNvbGxlY3RlZCBmcm9tIHRoZSB1c2VyIGFuZCBhZGQgdG8gdGhlIHRhc2sgYXJyYXlcclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgICAgICB0aGlzLmRlc2MgPSBkZXNjXHJcbiAgICAgICAgdGhpcy5wcmlvcml0eT0gcHJpb3JpdHlcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlXHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZGF0ZVxyXG4gICAgfSAgXHJcbiAgICBcclxuICAgIHNldCBpc0NvbXBsZXRlKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlID0gY29tcGxldGVcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vdXNlciBzZWxlY3RzIHRoZWlyIHRhc2tzIGZvciB0aGVpciBjcmVhdGVkIHByb2plY3RzIHRvIGFkZCwgZWRpdCBvciBkZWxldGVcclxuXHJcbi8vb3JnYW5pemUgYWxsIHRhc2tzIGJhc2VkIG9uIHdoZW4gdGhleSBhcmUgZHVlLCBpZiB0aGV5IGFyZSBpbXBvcnRhbnQsIGFuZCBjb21wbGV0aW9uIHN0YXR1c1xyXG5cclxuXHJcblxyXG4vL0RPTSBMb2dpY1xyXG5cclxuLy9kaXNwbGF5IGFsbCBwcm9qZWN0cyBmcm9tIHByb2plY3QgYXJyYXkgaW4gdGhlIG1haW4gc2VjdGlvblxyXG5cclxuLy9hZGQgcHJvamVjdCBidXR0b24gdGhhdCBjYWxscyBuZXcgcHJvamVjdCBjbGFzcyB0byBtYWtlIHByb2plY3RcclxuXHJcbi8vYWRkIHRhc2sgYnV0dG9uIHRoYXQgY2FsbHMgbmV3IHRhc2sgY2xhc3MgdG8gY3JlYXRlIGEgdGFza1xyXG5cclxuLy9hbGwgdGFza3Mgc2VjdGlvbiB0aGF0IGRpc3BsYXlzIGFsbCB0YXNrIGFycmF5IGVsZW1lbnRzIGZyb20gYWxsIHByb2plY3RzXHJcblxyXG4vL290aGVyIHRhYnMgdGhhdCBkaXNwbGF5IHRhc2tzIGZyb20gYWxsIHByb2plY3RzIGJhc2VkIG9uIHNvbWUgY3JpdGVyaWFcclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=