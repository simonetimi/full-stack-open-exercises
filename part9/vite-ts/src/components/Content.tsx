import { CoursePart } from '../types.ts';
import Part from './Part.tsx';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part coursePart={part} />
      ))}
    </>
  );
};

export default Content;
