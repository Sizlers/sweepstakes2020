import { useContext } from "react";
import { FilterContext } from "/lib/filterContext";

function Team({team}) {
  const {difference, drawn, lost, played, points, scoresAgainst, scoresFor, teamName, won, person } = team;

  const {filters} = useContext(FilterContext);

  if(!filters.includes(person) && filters?.length) 
    return null;
  

  return (
    <div className="border-2 lg:my-4 p-4 pb-10">
      <h3 className="font-bold text-lg">{teamName} ({person})</h3>
      <h4 className="mb-4 pb-2 border-b">Matches played: {played}</h4>
      <div className="flex content-between text-center mb-4">
        <span className="w-1/3">Won: {won}</span>
        <span className="w-1/3">Lost: {lost}</span>
        <span className="w-1/3">Drawn: {drawn}</span>
      </div>
      <div className="flex content-between text-center">
        <span className="w-1/3">Goals: {scoresFor}</span>
        <span className="w-1/3">Against: {scoresAgainst}</span>
        <span className="w-1/3">Points: {points}</span>
      </div>
    </div>
  )
}

export default function Group({group}) {
  const {filters, setFilters} = useContext(FilterContext);
  const {group:title, teams} = group.group;

  if(filters?.length && !teams.find((team) => filters.includes(team.person))) {
    return null;
  }

  return (
    <div className="border-b my-8">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {
          teams.map(team => (
            <Team team={team} />
          ))
        }
      </div>

    </div>
  )
}