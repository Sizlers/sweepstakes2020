export default function Match({match}) {
  const {date, location, name, url} = match;

  return (
    <div>
      <h2>{name}</h2>
      <p>{location}</p>
      <p>{date}</p>
      <a href={url} target="_blank">More info</a>
    </div>
  )
}