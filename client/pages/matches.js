import Match from "../components/Match";

export default function MatchPage({body}) {
  return (
    <main>
      <h1>Matches</h1>
      {
        body.map((match) => (
          <Match match={match} />
        ))
      }
    </main>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://fmv02k9gq4.execute-api.eu-west-2.amazonaws.com/prod/matches')
  const matches = await res.json()
  const {body} = matches;
  return {
    props: {
      body
    },
    revalidate: 3600, // In seconds
  }
}