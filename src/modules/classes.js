class Project {
  constructor (name) {
    this.name = name
    this.tasks = []
  }

  set setName (name) {
    this.name = name
  }

  get getName () {
    return this.name
  }

  set setTasks (tasks) {
    this.tasks = tasks
  }

  get getTasks () {
    return this.tasks
  }

  createTask (title, priority, dueDate) { // create a new task and add it to this project's task list
    const task = new Task(title, priority, dueDate)
    this.tasks.push(task)
    return task
  }

  addTaskToProject (task) {
    this.tasks.push(task)
  }

  findTask (title) {
    return this.tasks.find((task) => task.getTitle == title)
  }

  deleteTask (taskTitle) { // removes inputted task from the tasks array by replacing the array with one that excludes the task title given
    this.tasks = this.tasks.filter(task => task.title !== taskTitle)
  }
}

// create new task class/object with title, description, priority, and due date collected from the user and add to the task array
class Task {
  constructor (title, priority, date) { // initialize values from dialog input
    this.title = title
    // this.desc = desc
    this.priority = priority
    this.date = date
    this.completion = false
  }

  set setTitle (title) { // set task title to inputted title name
    this.title = title
  }

  get getTitle () { // return the task title
    return this.title
  }

  set setDescription (desc) {
    this.desc = desc
  }

  set setPriority (priority) {
    this.priority = priority
  }

  get getPriority () {
    return this.priority
  }

  set setDate (date) {
    this.date = date
  }

  get getDate () {
    return this.date
  }

  set setCompletion (completion) {
    this.completion = completion
  }
}

export { Project, Task }
