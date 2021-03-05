import * as React from "react"
import TextField from "@material-ui/core/TextField"
import {
  LocalizationProvider,
  DateRangePicker,
  DateRange,
  DateRangeDelimiter,
} from "@material-ui/pickers"
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"
import Box from "@material-ui/core/Box"

export default ({ dateRange: { start, end }, dateAction }) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker
        startText="From date"
        endText="To date"
        value={[start, end]}
        onChange={(newValue) => dateAction(newValue[0], newValue[1])}
        renderInput={(startProps, endProps) => (
          <Box px={[1, 3, 4]} pt={[1, 2]} style={{ display: "flex" }}>
            <TextField {...startProps} />
            <DateRangeDelimiter style={{ marginRight: 4 }}></DateRangeDelimiter>
            <TextField {...endProps} />
          </Box>
        )}
      />
    </LocalizationProvider>
  )
}
