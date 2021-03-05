import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import TablePagination from "@material-ui/core/TablePagination"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import ArrowBack from "@material-ui/icons/ArrowBack"
import DateRangePickers from "../Shared/DateRangePickers"
import { ILocation } from "../../interfaces"

interface IProps {
  dateRange: {
    start: Date
    end: Date
  }
  dateAction: (start: Date, end: Date) => void
  locations: ILocation[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default ({
  paginationAction,
  dateRange,
  dateAction,
  locations,
  countResults,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowPage, setRowPage] = useState(5)
  const classes = useStyles()

  return (
    <>
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
        to="/"
      >
        <ArrowBack style={{ color: "black" }} />
        <span style={{ fontWeight: 500, color: "black" }}>BACK</span>
      </Link>
      <Paper>
        <TableContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <DateRangePickers dateRange={dateRange} dateAction={dateAction} />
          </div>

          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Latitude</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Longitude</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Recorded date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map(({ latLong: { coordinates }, date, id }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {coordinates[0]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {coordinates[1]}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={countResults}
          rowsPerPage={rowPage}
          page={currentPage}
          onPageChange={(_, page) => {
            setCurrentPage(page)
            paginationAction(page * rowPage, rowPage)
          }}
          onRowsPerPageChange={({ target: { value } }) => {
            Number(value) !== rowPage && setRowPage(Number(value))
            paginationAction(currentPage * Number(value), Number(value))
          }}
        />
      </Paper>
    </>
  )
}
