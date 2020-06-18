import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'
import MaterialTable from './MaterialTable'
import {
  setSelectedRiskIndex,
} from '../actions'
import {
  getRisks,
  getSelectedRiskIndex,
} from '../selectors'

const RISK_TABLE_COLUMN_NAMES = [
  {
    title: 'Asset Name',
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
  /*
  {
    title: 'Vulnerability',
    field: 'threatDescription',
    width: '60%',
  },
  */
  {
    title: 'Published',
    field: 'vulnerabilityUrl',
    render: rowData => (
      <Link
        target='_blank'
        rel='noopener noreferrer'
        href={'//' + rowData.vulnerabilityUrl}>{rowData.vulnerabilityDate}
      </Link>
    ),
  },
]

export default function RisksTable({
  onRowClick,
}) {
  const dispatch = useDispatch()
  const columns = RISK_TABLE_COLUMN_NAMES
  const risks = useSelector(getRisks)

  function handleRowClick(e, rowData) {
    const { assetId } = rowData
    onRowClick && onRowClick(assetId)
    dispatch(setSelectedRiskIndex(rowData.tableData.id))
  }

  return (
    <MaterialTable
      options={{
        rowStyle: rowData => ({
          backgroundColor: rowData.tableData.id === selectedRiskIndex
            ? '#FFFF00' : '#FFF',
        }),
      }}
      columns={columns}
      data={risks}
      onRowClick={handleRowClick}
    />
  )
}
