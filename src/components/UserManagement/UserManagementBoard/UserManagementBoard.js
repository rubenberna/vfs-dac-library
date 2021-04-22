import React, { useState, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { UserManagementBoardNewAccess } from './UserManagementBoardNewAccess'
import { UserManagementBoardTableHead } from './UserManagementBoardTableHead'
import { UserManagementBoardTableToolbar } from './UserManagementBoardTableToolbar'
import { Context as UserContext } from '../../../context/user/UserContext'

const createRows = (access) => ({
  accessId: access.DAM_TK,
  accessName: access.DAM_NAME,
  market: access.DIMENSION_VALUE_NAME_1,
  dealer: access.DIMENSION_VALUE_NAME_2,
  organizationUnit: access.DIMENSION_VALUE_NAME_3
})

export const UserManagementBoard = () => {
  const { state: { userSec } } = useContext(UserContext)
  const [selected, setSelected] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false)

  const rows = userSec?.map((access) => createRows(access))

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelected = rows.map((n) => n.accessId);
      setSelected(allSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelection = (event, accessId) => {
    const selectedIndex = selected.indexOf(accessId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...newSelected, accessId]
    } else {
      newSelected = newSelected.filter(currentAccess => currentAccess !== accessId)
    }
    setSelected(newSelected);
  };

  const isSelected = (accessId) => selected.indexOf(accessId) !== -1;

  const toggleNewAccess = () => {
    setShowNewRow(!showNewRow)
  }

  return (
    <div className='user-management__container--board'>
      <Paper className='user-management__container--board__paper'>
        <UserManagementBoardTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className='user-management__container--board__paper__table'
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            { !showNewRow &&
              <caption className='u-small-text u-cursor-pointer' onClick={toggleNewAccess}>Add another access</caption>
            }
            <UserManagementBoardTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows?.map((row, index) => {
                  const isItemSelected = isSelected(row.accessId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleSelection(event, row.accessId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.accessId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.accessName}
                      </TableCell>
                      <TableCell>{row.market}</TableCell>
                      <TableCell>{row.dealer}</TableCell>
                      <TableCell>{row.organizationUnit}</TableCell>
                    </TableRow>
                  );
                })}
              { showNewRow && <UserManagementBoardNewAccess />}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
