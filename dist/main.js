/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/classes.js":
/*!********************************!*\
  !*** ./src/modules/classes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
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



/***/ }),

/***/ "./src/modules/createToDo":
/*!********************************!*\
  !*** ./src/modules/createToDo ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProject: () => (/* binding */ createProject),
/* harmony export */   createToDo: () => (/* binding */ createToDo)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./src/modules/classes.js");


function createProject(name) {
    const project = new _classes__WEBPACK_IMPORTED_MODULE_0__.Project(name)
    return project
}

function createToDo(title, desc, priority, date) {
    const task = new _classes__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, priority, date)
    return task
}

function editToDo(task) {
    
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_createToDo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/createToDo */ "./src/modules/createToDo");
//App Logic



const projects = []
const tasks = []

//organize all tasks based on when they are due, if they are important, and completion status

//DOM Logic
const screenController = function() {
    const projectList = document.querySelector('.project-list')
    const main = document.querySelector('.to-do-content')
    const projectForm = document.getElementById('create-project')
    const taskForm = document.getElementById('create-task')

    
    const openDialog = function(button, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            dialog.showModal()
        })
    }
    
    const cancelDialog = function(button, input, dialog) {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            projectForm.reset()
            dialog.close()
        })
    }
    
    //add project button that calls new project class to make project
    const addNewProject = function() {
        
        const dialog = document.getElementById('project-dialog')
        const nameInput = document.getElementById('project-name')
        
        const createButtons = function() {
            const submit = document.getElementById('project-submit')
            const addProject = document.querySelector('.add-project')
            const cancel = document.getElementById('project-cancel')
            
            openDialog(addProject, dialog)
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                submitProject()
                dialog.close()
            })
            
            cancelDialog(cancel, nameInput, dialog)
            
        }
        
        const submitProject = function() {
            if (nameInput.value == '') return alert('Project Name cannot be empty')
            
            const project = ((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createProject)(nameInput.value))
            displayProject(project)
        }
        
        //display all projects from project array in the main section
        function displayProject(project) {
            const projectHeader = document.createElement('h2')
            projectHeader.textContent = project.name
            
            projectList.appendChild(projectHeader)
            projectForm.reset()
        }
        
        
        
        createButtons()
    }
    
    //add task button that calls new task class to create a task
    const addNewTask = function() {
        const dialog = document.getElementById('task-dialog')
        const title = document.getElementById('task-title')
        const desc = document.getElementById('task-desc')
        const date = document.getElementById('task-date')
        
        
        const createButtons = function() {
            const addTask = document.getElementById('add-task')
            const cancel = document.getElementById('task-cancel')
            const submit = document.getElementById('task-submit')
            
            openDialog(addTask, dialog)
            
            cancel.addEventListener('click', (event) => {
                event.preventDefault()
                taskForm.reset()
                dialog.close()
            })
            
            submit.addEventListener('click', (event) => {
                event.preventDefault()
                if (title.value == '' || date.value == '') return alert('Text fields must be filled')
                submitTask()
                dialog.close()
            })
        }

        createButtons()
    
        const createDefaultTasks = function() {
            const task1 = displayTask((0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createToDo)('Create Module 1', 'Module 1 will contain application logic', 'medium', '2024-01-01'))
            tasks.push(task1)
        }

        const submitTask = function() {
            const priority = document.querySelector("input[name='task-priority']:checked").value
            
            const task = (0,_modules_createToDo__WEBPACK_IMPORTED_MODULE_0__.createToDo)(title.value, desc, priority, date.value)
            tasks.push(task)
            displayTask(task)
            taskForm.reset()
        }
        
        const displayTask = function(task) {
            const toDo = document.createElement('div')
            const check = document.createElement('img')
            const name = document.createElement('p')
            const priority = document.createElement('p')
            const dueDate = document.createElement('p')
            const edit = document.createElement('div')
            const icon = document.createElement('img')
            const remove = document.createElement('div')
            const icon2 = document.createElement('img')
            
            toDo.classList.add('to-do')
            check.src = './pics/check icon.png'
            check.alt ='checkbox'
            name.classList.add('to-do-name')
            name.textContent = task.title
            
            priority.classList.add('priority')
            priority.textContent = 'Priority'
            console.log(task.priority)
            if (task.priority == 'low') priority.classList.add('low-priority')
            if (task.priority == 'medium') priority.classList.add('medium-priority')
            if (task.priority == 'high') priority.classList.add('high-priority')
            
            dueDate.classList.add('date')
            dueDate.textContent = task.date
            edit.classList.add('edit-button')
            icon.src = './pics/square-edit-outline.svg'
            edit.appendChild(icon)
            remove.classList.add('delete-button')
            remove.setAttribute('onclick', "return this.parentNode.remove();")
            icon2.src = './pics/trash-can-outline.svg'
            remove.appendChild(icon2)
            
            toDo.appendChild(check)
            toDo.appendChild(name)
            toDo.appendChild(priority)
            toDo.appendChild(dueDate)
            toDo.appendChild(edit)
            toDo.appendChild(remove)
            main.appendChild(toDo)
        }
        createDefaultTasks()
        //need module that will add a task specifically to the project currently in
    
    
}

//all tasks section that displays all task array elements from all projects

//other tabs that display tasks from all projects based on some criteria
    
    addNewProject()
    addNewTask()
}

screenController()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUN5QztBQUN6QztBQUNBO0FBQ0Esd0JBQXdCLDZDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBDQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNoQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0VBQWE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLCtEQUFVO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwrREFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvY3JlYXRlVG9EbyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXHJcbiAgICAgICAgdGhpcy50YXNrcyA9IFtdXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNldE5hbWUobmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgICBjcmVhdGVUYXNrKHRpdGxlLCBkZXNjLCBwcmlvcml0eSwgZHVlRGF0ZSkgeyAvL2NyZWF0ZSBhIG5ldyB0YXNrIGFuZCBhZGQgaXQgdG8gdGhpcyBwcm9qZWN0J3MgdGFzayBsaXN0IFxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzYywgcHJpb3JpdHksIGR1ZURhdGUpXHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vY3JlYXRlIG5ldyB0YXNrIGNsYXNzL29iamVjdCB3aXRoIHRpdGxlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdHksIGFuZCBkdWUgZGF0ZSBjb2xsZWN0ZWQgZnJvbSB0aGUgdXNlciBhbmQgYWRkIHRvIHRoZSB0YXNrIGFycmF5XHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICAgICAgdGhpcy5kZXNjID0gZGVzY1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHk9IHByaW9yaXR5XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0RGVzY3JpcHRpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuZGVzYyA9IGRlc2NcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0UHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgIH0gICBcclxuXHJcbiAgICBzZXQgc2V0RGF0ZShkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZVxyXG4gICAgfSAgXHJcbiAgICBcclxuICAgIC8vIHNldCBpc0NvbXBsZXRlKGNvbXBsZXRlKSB7XHJcbiAgICAvLyAgICAgdGhpcy5pc0NvbXBsZXRlID0gY29tcGxldGVcclxuICAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUHJvamVjdCwgVGFzayB9IiwiaW1wb3J0IHsgUHJvamVjdCwgVGFzayB9IGZyb20gXCIuL2NsYXNzZXNcIlxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmFtZSlcclxuICAgIHJldHVybiBwcm9qZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRvRG8odGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkYXRlKSB7XHJcbiAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2MsIHByaW9yaXR5LCBkYXRlKVxyXG4gICAgcmV0dXJuIHRhc2tcclxufVxyXG5cclxuZnVuY3Rpb24gZWRpdFRvRG8odGFzaykge1xyXG4gICAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0LCBjcmVhdGVUb0RvIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vQXBwIExvZ2ljXHJcblxyXG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBjcmVhdGVUb0RvIH0gZnJvbSBcIi4vbW9kdWxlcy9jcmVhdGVUb0RvXCJcclxuXHJcbmNvbnN0IHByb2plY3RzID0gW11cclxuY29uc3QgdGFza3MgPSBbXVxyXG5cclxuLy9vcmdhbml6ZSBhbGwgdGFza3MgYmFzZWQgb24gd2hlbiB0aGV5IGFyZSBkdWUsIGlmIHRoZXkgYXJlIGltcG9ydGFudCwgYW5kIGNvbXBsZXRpb24gc3RhdHVzXHJcblxyXG4vL0RPTSBMb2dpY1xyXG5jb25zdCBzY3JlZW5Db250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKVxyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50by1kby1jb250ZW50JylcclxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1wcm9qZWN0JylcclxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS10YXNrJylcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IG9wZW5EaWFsb2cgPSBmdW5jdGlvbihidXR0b24sIGRpYWxvZykge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGNhbmNlbERpYWxvZyA9IGZ1bmN0aW9uKGJ1dHRvbiwgaW5wdXQsIGRpYWxvZykge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KClcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2FkZCBwcm9qZWN0IGJ1dHRvbiB0aGF0IGNhbGxzIG5ldyBwcm9qZWN0IGNsYXNzIHRvIG1ha2UgcHJvamVjdFxyXG4gICAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWRpYWxvZycpXHJcbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbmFtZScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1zdWJtaXQnKVxyXG4gICAgICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0JylcclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY2FuY2VsJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2coYWRkUHJvamVjdCwgZGlhbG9nKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRQcm9qZWN0KClcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYW5jZWxEaWFsb2coY2FuY2VsLCBuYW1lSW5wdXQsIGRpYWxvZylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN1Ym1pdFByb2plY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdQcm9qZWN0IE5hbWUgY2Fubm90IGJlIGVtcHR5JylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSAoY3JlYXRlUHJvamVjdChuYW1lSW5wdXQudmFsdWUpKVxyXG4gICAgICAgICAgICBkaXNwbGF5UHJvamVjdChwcm9qZWN0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL2Rpc3BsYXkgYWxsIHByb2plY3RzIGZyb20gcHJvamVjdCBhcnJheSBpbiB0aGUgbWFpbiBzZWN0aW9uXHJcbiAgICAgICAgZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKVxyXG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyKVxyXG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGNyZWF0ZUJ1dHRvbnMoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2FkZCB0YXNrIGJ1dHRvbiB0aGF0IGNhbGxzIG5ldyB0YXNrIGNsYXNzIHRvIGNyZWF0ZSBhIHRhc2tcclxuICAgIGNvbnN0IGFkZE5ld1Rhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kaWFsb2cnKVxyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stdGl0bGUnKVxyXG4gICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1kZXNjJylcclxuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZGF0ZScpXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY3JlYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrJylcclxuICAgICAgICAgICAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stY2FuY2VsJylcclxuICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stc3VibWl0JylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG9wZW5EaWFsb2coYWRkVGFzaywgZGlhbG9nKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgICAgICBpZiAodGl0bGUudmFsdWUgPT0gJycgfHwgZGF0ZS52YWx1ZSA9PSAnJykgcmV0dXJuIGFsZXJ0KCdUZXh0IGZpZWxkcyBtdXN0IGJlIGZpbGxlZCcpXHJcbiAgICAgICAgICAgICAgICBzdWJtaXRUYXNrKClcclxuICAgICAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVCdXR0b25zKClcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZURlZmF1bHRUYXNrcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrMSA9IGRpc3BsYXlUYXNrKGNyZWF0ZVRvRG8oJ0NyZWF0ZSBNb2R1bGUgMScsICdNb2R1bGUgMSB3aWxsIGNvbnRhaW4gYXBwbGljYXRpb24gbG9naWMnLCAnbWVkaXVtJywgJzIwMjQtMDEtMDEnKSlcclxuICAgICAgICAgICAgdGFza3MucHVzaCh0YXNrMSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1Ym1pdFRhc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0ndGFzay1wcmlvcml0eSddOmNoZWNrZWRcIikudmFsdWVcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBjcmVhdGVUb0RvKHRpdGxlLnZhbHVlLCBkZXNjLCBwcmlvcml0eSwgZGF0ZS52YWx1ZSlcclxuICAgICAgICAgICAgdGFza3MucHVzaCh0YXNrKVxyXG4gICAgICAgICAgICBkaXNwbGF5VGFzayh0YXNrKVxyXG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGRpc3BsYXlUYXNrID0gZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICBjb25zdCB0b0RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgICAgICBjb25zdCBpY29uMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0b0RvLmNsYXNzTGlzdC5hZGQoJ3RvLWRvJylcclxuICAgICAgICAgICAgY2hlY2suc3JjID0gJy4vcGljcy9jaGVjayBpY29uLnBuZydcclxuICAgICAgICAgICAgY2hlY2suYWx0ID0nY2hlY2tib3gnXHJcbiAgICAgICAgICAgIG5hbWUuY2xhc3NMaXN0LmFkZCgndG8tZG8tbmFtZScpXHJcbiAgICAgICAgICAgIG5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcmlvcml0eS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpXHJcbiAgICAgICAgICAgIHByaW9yaXR5LnRleHRDb250ZW50ID0gJ1ByaW9yaXR5J1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrLnByaW9yaXR5KVxyXG4gICAgICAgICAgICBpZiAodGFzay5wcmlvcml0eSA9PSAnbG93JykgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnbG93LXByaW9yaXR5JylcclxuICAgICAgICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT0gJ21lZGl1bScpIHByaW9yaXR5LmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIGlmICh0YXNrLnByaW9yaXR5ID09ICdoaWdoJykgcHJpb3JpdHkuY2xhc3NMaXN0LmFkZCgnaGlnaC1wcmlvcml0eScpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKVxyXG4gICAgICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kYXRlXHJcbiAgICAgICAgICAgIGVkaXQuY2xhc3NMaXN0LmFkZCgnZWRpdC1idXR0b24nKVxyXG4gICAgICAgICAgICBpY29uLnNyYyA9ICcuL3BpY3Mvc3F1YXJlLWVkaXQtb3V0bGluZS5zdmcnXHJcbiAgICAgICAgICAgIGVkaXQuYXBwZW5kQ2hpbGQoaWNvbilcclxuICAgICAgICAgICAgcmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1idXR0b24nKVxyXG4gICAgICAgICAgICByZW1vdmUuc2V0QXR0cmlidXRlKCdvbmNsaWNrJywgXCJyZXR1cm4gdGhpcy5wYXJlbnROb2RlLnJlbW92ZSgpO1wiKVxyXG4gICAgICAgICAgICBpY29uMi5zcmMgPSAnLi9waWNzL3RyYXNoLWNhbi1vdXRsaW5lLnN2ZydcclxuICAgICAgICAgICAgcmVtb3ZlLmFwcGVuZENoaWxkKGljb24yKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChjaGVjaylcclxuICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChuYW1lKVxyXG4gICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKHByaW9yaXR5KVxyXG4gICAgICAgICAgICB0b0RvLmFwcGVuZENoaWxkKGR1ZURhdGUpXHJcbiAgICAgICAgICAgIHRvRG8uYXBwZW5kQ2hpbGQoZWRpdClcclxuICAgICAgICAgICAgdG9Eby5hcHBlbmRDaGlsZChyZW1vdmUpXHJcbiAgICAgICAgICAgIG1haW4uYXBwZW5kQ2hpbGQodG9EbylcclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlRGVmYXVsdFRhc2tzKClcclxuICAgICAgICAvL25lZWQgbW9kdWxlIHRoYXQgd2lsbCBhZGQgYSB0YXNrIHNwZWNpZmljYWxseSB0byB0aGUgcHJvamVjdCBjdXJyZW50bHkgaW5cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbi8vYWxsIHRhc2tzIHNlY3Rpb24gdGhhdCBkaXNwbGF5cyBhbGwgdGFzayBhcnJheSBlbGVtZW50cyBmcm9tIGFsbCBwcm9qZWN0c1xyXG5cclxuLy9vdGhlciB0YWJzIHRoYXQgZGlzcGxheSB0YXNrcyBmcm9tIGFsbCBwcm9qZWN0cyBiYXNlZCBvbiBzb21lIGNyaXRlcmlhXHJcbiAgICBcclxuICAgIGFkZE5ld1Byb2plY3QoKVxyXG4gICAgYWRkTmV3VGFzaygpXHJcbn1cclxuXHJcbnNjcmVlbkNvbnRyb2xsZXIoKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==