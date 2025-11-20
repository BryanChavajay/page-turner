import { useParams } from "react-router-dom";

export const Summary = () => {
  const { id } = useParams();

  return (
    <div className="relative z-10 min-h-screen">
      <article>
        <h2>Summary</h2>
        <p>Book {id}</p>
      </article>
    </div>
  );
};

export default Summary;