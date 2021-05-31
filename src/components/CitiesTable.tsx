import { matchSorter } from 'match-sorter';
import React, { useContext, useMemo } from 'react'
import { Button, Table } from 'react-bootstrap';
import { FilterProps, FilterValue, IdType, Row, useFilters, useSortBy, useTable } from 'react-table'
import { CitiesContext, ICity } from '../context/CitiesContext'

export const CitiesTable = () => {


  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }: FilterProps<ICity>) {
  
    return (
      <span>
        <input
        className="filter__search"
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Найти...`}
      />
      </span>
      
    )
  }

  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);


  function defaultTextFilter<T extends Record<string, unknown>>(
    rows: Array<Row<T>>,
    id: IdType<T>,
    filterValue: FilterValue
  ): Array<Row<T>> {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue !== undefined
        ? String(rowValue)
            .toLowerCase()
            .startsWith(String(filterValue).toLowerCase())
        : true
    })
  }


  const filterTypes = useMemo(() => ({
    text: defaultTextFilter
  }), [])



  const citiesContext = useContext(CitiesContext);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Название города',
        accessor: 'city' as const,
      },
      {
        Header: 'Страна',
        accessor: 'country' as const,
      },
      {
        Header: 'Население',
        accessor: 'population' as const,
        disableFilters: true,
      },
      {
        Header: 'Регион',
        accessor: 'region' as const,
        disableFilters: true,
      },
      {
        Header: '',
        disableFilters: true,
        disableSortBy: true,
        id: 'delete',
        accessor: (str: any) => 'delete',
        Cell: (tableProps: any) => (
          <Button variant="outline-danger" onClick={() => {
            const selectItemId = tableProps.cell.row.id;
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
      defaultColumn,
      filterTypes: filterTypes,
    },
    useFilters,
    useSortBy,
    )
  
  

  return (
    <Table className="table__block" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <span>
                  {column.render('Header')}
                  {column.isSorted ? column.isSortedDesc ? '↑' : "↓" : ''}
                </span>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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