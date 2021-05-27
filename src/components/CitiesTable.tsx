import React, { useContext } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSortBy, useTable } from 'react-table'
import { CitiesContext } from '../context/CitiesContext'

export const CitiesTable = () => {

  const citiesContext = useContext(CitiesContext);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'city' as const,
      },
      {
        Header: 'Население',
        accessor: 'population' as const,
      },
      {
        Header: 'Регион',
        accessor: 'region' as const,
      },
      {
        Header: 'Страна',
        accessor: 'country' as const,
      },
      {
        Header: 'Del',
        id: 'delete',
        accessor: (str: any) => 'delete',
        Cell: (tableProps: any) => (
          <Button variant="outline-danger" onClick={() => {
            const selectItemId = tableProps.cell.row.id;
            console.log(tableProps.data[selectItemId]);
            citiesContext.deleteCity(tableProps.data[selectItemId])
          }}>Удалить</Button>
        )
      },

    ],
    [citiesContext.cities]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: citiesContext.cities,
    },
    useSortBy,
  )
  
  console.log(headerGroups);

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? column.isSortedDesc ? '↑' : "↓" : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
     </thead>
     <tbody {...getTableBodyProps()}>
       {
       rows.map(row => {
         prepareRow(row)
         return (
           <tr {...row.getRowProps()}>
             {
             row.cells.map(cell => {
               return (
                 <td {...cell.getCellProps()}>
                   {cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </Table>
  )
}