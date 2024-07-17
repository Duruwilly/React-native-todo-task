import Homescreen from "../screens/home";
import NewTask from "../screens/create-todo";
import TodoDetails from "../screens/todo-details";
import { RootStackParamList } from "../common.type";

export const routes: Array<{ name: keyof RootStackParamList; component: React.ComponentType<any>; options: {title: string } }> = [
  {
    name: "todo-list",
    component: Homescreen,
    options: { title: "" },
  },
  { name: "create-todo", component: NewTask, options: { title: "" } },
  { name: "todo-details", component: TodoDetails, options: { title: "" } },
];
