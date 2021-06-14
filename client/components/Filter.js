import { useContext } from 'react';
import { FilterContext } from '/lib/filterContext';
import teamtoperson from '/lib/teamtoperson';

export default function Filter() {
  const {filters, setFilters} = useContext(FilterContext);

  const names = [...new Set(teamtoperson.map(item => item.person))];

  const handleFilterChange = (e) => {
    const name = e.target.innerHTML;
    if(filters.includes(name)) {
      setFilters(filters.filter(person => person !== name));
    } else {
      setFilters([...filters, name]);
    }
  }

  return (
    <div className="my-8 border-2 p-4">
      <h3 className="text-lg font-bold">Filter: </h3>
      {
        names.sort().map((name) => <button class={filters.includes(name) ? 'focus:outline-none text-purple-700 font-bold mr-2' : 'focus:outline-none mr-2'} onClick={(e) => handleFilterChange(e)}>{name}</button>)
      }
      <button className="mr-2 font-bold focus:outline-none" onClick={() => setFilters([])}>Clear</button>
    </div> 
  )
}