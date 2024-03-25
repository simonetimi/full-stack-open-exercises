interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDetailed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDetailed {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDetailed {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartDetailed {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
