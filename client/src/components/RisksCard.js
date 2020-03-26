import React, { PureComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Link from '@material-ui/core/Link'


class _RisksCardWithoutStyles extends PureComponent {

  render() {
    const {
      classes,
      to,
      values,
    } = this.props
    const {
      riskCount,
      aggregatedThreatScore,
      greatestThreatDescription,
      downstreamMeterPercent,
    } = values
    return (
      <Link underline='none' component={RouterLink} to={to}>
        <Card className={classes.card}>
          <CardActionArea className={classes.cardActionArea}>
            <Typography className={classes.title} align='center'>
              Risks
            </Typography>
            <Table className={classes.section}>
              <TableBody>
                <TableRow>
                  <TableCell>Threat Score</TableCell>
                  <TableCell align='right'>{aggregatedThreatScore}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Risks</TableCell>
                  <TableCell align='right'>{riskCount}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Impacted Meters</TableCell>
                  <TableCell align='right'>{downstreamMeterPercent}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography className={classes.section}>
              {greatestThreatDescription}
            </Typography>
          </CardActionArea>
        </Card>
      </Link>
    )
  }
}

export default const RisksCard = withStyles(theme => ({
  section: {
    marginTop: theme.spacing(3),
  },
  title: {
    fontSize: 24,
  },
  card: {
    margin: theme.spacing(1),
  },
  cardActionArea: {
    padding: theme.spacing(3),
  },
}))(_RisksCardWithoutStyles)
