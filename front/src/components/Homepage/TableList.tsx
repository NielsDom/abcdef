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
import { IVehicle } from "../../interfaces"

interface IProps {
  paginationAction: (offset: number, limit: number) => void
  pagination: {
    offset: number
    limit: number
  }
  vehicles: IVehicle[]
  countResults: number
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export default function BasicTable({
  paginationAction,
  pagination: { offset, limit },
  vehicles,
  countResults,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowPage, setRowPage] = useState(5)
  const classes = useStyles()
  return (
    <Paper>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Vehicle ID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map(({ id }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={{
                      pathname: `/detail/${id}`,
                    }}
                  >
                    VIEW TIMELINE
                  </Button>
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
  )
}
