import { useContext } from "react";
import { FilterContext } from "/lib/filterContext";
import teamtoperson from "/lib/teamtoperson";

export default function Match({match}) {
  const {filters} = useContext(FilterContext);
  const {date, location, name, url} = match;

  const teamOne = name.split('-')[0];
  const teamTwo = name.split('-')[1];
  const resultOne = teamtoperson.find((obj) => obj.team === teamOne);
  const resultTwo = teamtoperson.find((obj) => obj.team === teamTwo);
  const title = `${teamOne} (${resultOne?.person}) vs ${teamTwo} (${resultTwo?.person})`;

  function formatDate(date) {
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours() - 2,
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    return day + "/" + month + "/" + year + " " + hourFormatted + ":" +
            minuteFormatted + morning;
}

  if(!resultOne) {
    return null
  }

  if(!filters.includes(resultOne?.person) && !filters.includes(resultOne?.person) && filters?.length) {
    return null;
  }


  const matchTime = Date.parse(date);
  const matchTimeUK = new Date(matchTime);
  const matchEnd = new Date(matchTimeUK.setHours( matchTimeUK.getHours() + 2 ))

  if(matchEnd > Date.now() && matchTime < Date.now()) {
    return (
      <div class="mt-5 py-5 border-4 p-8 border-purple-200">
        <span class="font-bold text-red-500">Playing...</span>
        <h2 class="font-bold text-xl mb-2 text-purple-800">{title}</h2>
        <p class="mb-2">Played in {location}</p>
        <p class="mb-2">Time: {formatDate(matchTimeUK)}</p>
        <a href={url} target="_blank" class="underline text-purple-600">More info</a>
      </div>
    )
  }

  if(matchTime < Date.now()) {
    return null
  }

  return (
    <div class="mt-5 py-5 border-b">
      <h2 class="font-bold text-xl mb-2 text-purple-800">{title}</h2>
      <p class="mb-2">Played in {location}</p>
      <p class="mb-2">Time: {formatDate(matchTimeUK)}</p>
      <a href={url} target="_blank" class="underline text-purple-600">More info</a>
    </div>
  )
}