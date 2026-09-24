export interface Lesson {
  _uid: string;
  title: string;
  url: { url: string; target?: string };
  author: string;
  resourceType: "video" | "article" | "interactive" | "documentation";
  order: string;
  durationMinutes: string;
}

export interface Direction {
  content: {
    title: string;
    description: string;
  };
}

export interface CourseContent {
  title: string;
  description: string;
  direction: Direction;
  order: string;
  lessons: Lesson[];
}