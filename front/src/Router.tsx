import React, { Suspense, lazy } from "react"
import { Switch, Route } from "react-router-dom"
import Empty from "./components/Empty"
import { Helmet } from "react-helmet"

const HomepageContainer = lazy(() => import("./containers/HomepageContainer"))
const DetailContainer = lazy(() => import("./containers/DetailContainer"))

export default () => (
  <Suspense
    fallback={
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 800 }}>Loading page</div>
      </div>
    }
  >
    <Switch>
      <Route exact path="/" component={HomepageContainer} />
      <Route exact path="/detail/:id" component={DetailContainer} />
      <Route component={Empty} />
    </Switch>
  </Suspense>
)
