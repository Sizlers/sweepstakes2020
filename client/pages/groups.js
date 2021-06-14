import Group from "/components/Group";
import teamtoperson from '/lib/teamtoperson';
import Filter from "/components/Filter";

export default function GroupPage({body}) {
  return (
    <main className="px-10 py-10">
      <h1 className="text-2xl font-bold">EUFA Groups</h1>
      <Filter />
      {
        body.map((group) => (
          <Group group={group} />
        ))
      }
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://fmv02k9gq4.execute-api.eu-west-2.amazonaws.com/prod/groups')
  const groups = await res.json()
  const {body} = groups;
  
  const data = body[0].map((group) => {
    const {teams} = group;
    const teamList = teams.map(team => {
      const result = teamtoperson.find((obj) => obj.team == team.teamName);
      return {...team, person: result.person};
    });
    return {
      group: {
        group: group.group,
        teams: teamList
      }
    }
  })
  return {
    props: {
      body: data
    },
    revalidate: 3600, // In seconds
  }
}