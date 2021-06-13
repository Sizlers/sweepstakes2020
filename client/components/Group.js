function Team({team}) {
  const {difference, drawn, lost, plaed, points, scoresAgainst, scoresFor, teamName, won } = team;

  return (
    <div>
      <p>{teamName}</p>
    </div>
  )
}

export default function Group({group}) {
  const {group:title, teams} = group
  return (
    <div>
      <h2>{title}</h2>
      {
        teams.map(team => (
          <Team team={team} />
        ))
      }
    </div>
  )
}