import { CoursePart } from '../types.ts';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <p>Background materials: {coursePart.backgroundMaterial}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>Group project count: {coursePart.groupProjectCount}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          Required skills:{' '}
          {coursePart.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </div>
      );
  }
};

export default Part;
