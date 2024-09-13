import { Link } from 'react-router-dom';

export default function HootListPage(props) {
  return (
    <>
    <h1>Hoot List Page</h1>
      <main>
    {props.hoots.map((hoot) => (
      <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
        <article>
          <header>
            <h2>{hoot.title}</h2>
            <p>
              {hoot.author.username} posted on 
              {new Date(hoot.createdAt).toLocaleDateString()}
            </p>
          </header>
          <p>{hoot.text}</p>
        </article>
      </Link>
    ))}
  </main>
  </>
  
)
}
