import Group from "../components/Group";
import teamtoperson from '../lib/teamtoperson';

export default function Home({body}) {
  console.log(body);
  return (
    <main>
      <h1>EUFA sweepstakes</h1>
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