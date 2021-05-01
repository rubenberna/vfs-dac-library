import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'

const headCells = [
  { id: 'DAM', disablePadding: true, label: 'Data type' },
  { id: 'dimOne', disablePadding: false, label: 'Legal Entity' },
  { id: 'dimTwo', disablePadding: false, label: 'Dealer' },
  { id: 'dimThree', disablePadding: false, label: 'Organization Unit' },
];

export const UserManagementBoardTableHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={idx === 0 ? 'left' : (idx === headCells.length - 1 ? 'right' : 'center' )}
            padding={headCell.disablePadding ? 'none' : 'default'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
