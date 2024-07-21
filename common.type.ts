export type RootStackParamList = {
  'todo-list': undefined;
  'create-todo': { todoId?: string } | undefined;
  'todo-details': { todoId: string };
};

export type createItemType = {
    title: string;
    description: string;
    id: string;
  };
  
  export type todoType = createItemType[];
  