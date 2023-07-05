import PageScroll from '../src/components/FullPage/Intro'
import RequireAuth from '../src/AuthContext/RequireAuth'

export default function Main() {
  return (
    <>
      <RequireAuth>
        <PageScroll />
      </RequireAuth>

    </>

  )
}

