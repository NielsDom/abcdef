import React, { useEffect, useState } from "react"
import httpClient from "../../httpClient"
import Wrapper from "../../components/Shared/Wrapper"
import TableList from "../../components/Homepage/TableList"
import { IVehicle } from "../../interfaces"

export default () => {
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 })
  const [vehicles, setVehicles] = useState<IVehicle[]>([])
  const [countResults, setCountResults] = useState(0)

  const paginationAction = (offset, limit) => setPagination({ offset, limit })

  useEffect(() => {
    httpClient
      .get(`/vehicle?offset=${pagination.offset}&limit=${pagination.limit}`)
      .then(({ data: { count, rows } }) => {
        setCountResults(count)
        setVehicles(rows)
      })
      .catch((e) => console.log(e))
  }, [pagination])

  return (
    <Wrapper title="Vehicles">
      <TableList
        paginationAction={paginationAction}
        pagination={pagination}
        vehicles={vehicles}
        countResults={countResults}
      />
    </Wrapper>
  )
}
