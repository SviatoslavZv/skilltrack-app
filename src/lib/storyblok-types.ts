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

export interface DirectionContent {
  title: string;
  description: string;
}

export interface DirectionStory {
  uuid: string;
  slug: string;
  content: DirectionContent;
}

export interface CourseStory {
  uuid: string;
  slug: string;
  content: {
    title: string;
    description: string;
    direction: string;
    order: string;
  };
}