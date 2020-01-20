import React from "react"
import { Provider } from "mobx-react"
import stores from "./src/stores"

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={stores}>{element}</Provider>
)