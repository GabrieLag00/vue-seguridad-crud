export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  tag: Tag;
  date: string;
}

export interface Priority {
  value: string;
  label: string;
  color: string;
  icon: any;
}

export interface Tag {
  value: string;
  label: string;
  color: string;
  icon: any;
}

export interface User {
  name: string;
  profilePhoto: string;
}
