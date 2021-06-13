import Group from "../components/Group";

export default function Home({body}) {

  if(!body?.[0]) {
    return (
      <main>
        <h1>iCentric EUFA sweepstakes</h1>
        <p>An error has occurred...</p>
      </main>
    )
  }
  return (
    <main>
      <h1>iCentric EUFA sweepstakes</h1>
      {
        body[0].map((group) => (
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
  return {
    props: {
      body
    },
    revalidate: 3600, // In seconds
  }
}