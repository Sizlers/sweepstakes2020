import Link from 'next/link'
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <header class="py-4 flex border-b">
      <ul class="flex content-between w-60 m-auto">
        <li class="w-1/2 text-center text-xl"><Link href="/"><a class={router.pathname == "/" ? "underline text-purple-600" : "underline"}>Groups</a></Link></li>
        <li class="w-1/2 text-center text-xl"><Link href="/matches"><a class={router.pathname == "/matches" ? "underline text-purple-600" : "underline"}>Matches</a></Link></li>
      </ul>
    </header>
  )
}