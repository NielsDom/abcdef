import React, { useState, useEffect } from "react"
import dateformat from "dateformat"
import httpClient from "../../httpClient"
import Wrapper from "../../components/Shared/Wrapper"
import TableDetail from "../../components/Detail/TableDetail"
import { ILocation } from "../../interfaces"

interface IProps {
  match: {
    params: { id: string }
  }
}

export default ({
  match: {
    params: { id },
  },
}: IProps) => {
  const [dateRange, setDateRange] = useState({
    start: new Date().setMonth(new Date().getMonth() - 1),
    end: new Date(),
  })
  const [locations, setLocations] = useState<ILocation[]>([])
  const [pagination, setPagination] = useState({ offset: 0, limit: 5 })
  const [countResults, setCountResults] = useState(0)

  const dateAction = (start, end) => setDateRange({ start, end })
  const paginationAction = (offset, limit) => setPagination({ offset, limit })

  useEffect(() => {
    httpClient
      .get(
        `/location/${id}?start=${dateformat(
          dateRange.start,
          "yyyy-mm-dd"
        )}&end=${dateformat(dateRange.end, "yyyy-mm-dd")}&offset=${
          pagination.offset
        }&limit=${pagination.limit}`
      )
      .then(({ data: { count, rows } }) => {
        setCountResults(count)
        setLocations(rows)
      })
      .catch((e) => console.log(e))
  }, [pagination, dateRange])

  return (
    <Wrapper title={`Vehicle ID: ${id}`}>
      <TableDetail
        dateRange={dateRange}
        dateAction={dateAction}
        locations={locations}
        countResults={countResults}
        paginationAction={paginationAction}
      />
    </Wrapper>
  )
}
