import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <ul>
        <li><Link href="/">Groups</Link></li>
        <li><Link href="/matches">Matches</Link></li>
      </ul>
    </header>
  )
}