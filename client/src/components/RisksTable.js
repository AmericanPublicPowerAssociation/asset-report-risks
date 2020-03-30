import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import {
  getRisks,
} from '../selectors'


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const RISK_TABLE_COLUMN_NAMES = [
  {
    title: 'Name',
    field: 'assetName',
  },
  {
    title: 'Meter Count',
    field: 'meterCount',
  },
  {
    title: 'Aggregated Threat',
    field: 'threatScore',
  },
  {
    title: 'Vulnerability',
    field: 'threatDescription',
    width: '60%',
  },
  {
    title: 'Published',
    field: 'vulnerabilityUrl',
    render: rowData => (
      <Link target='_blank' rel='noopener noreferrer'
        href={'//' + rowData.vulnerabilityUrl}>{rowData.vulnerabilityDate}</Link>
    )
  },
]

export default function RisksTable(props) {
  const tableName = 'Risks'
  const columns = RISK_TABLE_COLUMN_NAMES
  const data = useSelector(getRisks)
  const { onRowClick } = props

  function getHeaderLabel(header) {
    const result = header.replace( /([A-Z])/g, " $1" );
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1);
    return headerLabel
  }

  function handleRowClick(e, rowData) {
    const { assetId } = rowData
    onRowClick && onRowClick(assetId)
  }

  return (
    <MaterialTable
      components={{
        Container: props => <div style={{background: 'white'}}>{props.children}</div>
      }}
      icons={tableIcons}
      title={tableName}
      options={ {search: true} }
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
    />
  )
}
