function Team({team}) {
  const {difference, drawn, lost, plaed, points, scoresAgainst, scoresFor, teamName, won, person } = team;
  return (
    <div>
      <p>{teamName} - {person}</p>
    </div>
  )
}

export default function Group({group}) {
  const {group:title, teams} = group.group;
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