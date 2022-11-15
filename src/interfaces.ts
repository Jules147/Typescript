// here we're exporting an interface of the Task. For filing purposes/clarity, we keep our interface file seperate to our tsx components. As it's an interface, the convention is to add 'I' before the interface name, hence 'ITask'
export interface ITask {
  taskName: string;
  deadline: Number;
}
