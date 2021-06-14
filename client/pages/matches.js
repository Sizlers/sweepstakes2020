import Match from "../components/Match";

export default function MatchPage({body}) {
  return (
    <main class="px-10 py-10">
      <h1 class="text-2xl font-bold">Upcoming Matches</h1>
      <div>
        {
          body.map((match) => (
            <Match match={match} />
          ))
        }
      </div>
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