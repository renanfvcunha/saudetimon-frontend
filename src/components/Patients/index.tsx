/* eslint-disable react/destructuring-assignment */
import React, {
  useState,
  useEffect,
  useContext,
  createRef,
  forwardRef,
  RefObject,
  ChangeEvent,
} from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable, { Icons, MTableToolbar } from 'material-table';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
  Clear,
  FirstPage,
  LastPage,
  Refresh,
  Search,
  Visibility,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import useStyles from './styles';
import defaultStyles from '../../utils/defaultStyles';
import subHours from '../../utils/subHours';
import masks from '../../utils/masks';
import IGroup from '../../typescript/IGroup';
import PatientContext from '../../contexts/patientContext';
import catchHandler from '../../utils/catchHandler';

interface Props {
  tableTitle: string;
  idGroup: string;
}

const Patients: React.FC<Props> = ({ tableTitle, idGroup }) => {
  const classes = useStyles();
  const tableRef: RefObject<{ onQueryChange(): void }> = createRef();
  const { getGroupsCall, getPatientsCall } = useContext(PatientContext);
  const history = useHistory();

  const [groups, setGroups] = useState<IGroup[]>();
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleChangeGroup = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(e.target.value as string);
  };

  const tableIcons: Icons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  };

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await getGroupsCall();

        setGroups(data);
      } catch (err) {
        catchHandler(
          err,
          'Erro ao listar grupos. Tente novamente ou contate o suporte.'
        );
      }
    };

    getGroups();
  }, [getGroupsCall]);

  useEffect(() => {
    tableRef.current?.onQueryChange();
  }, [tableRef, selectedGroup]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.tableBox}>
        <div className={classes.table}>
          <MaterialTable
            title={tableTitle}
            tableRef={tableRef}
            columns={[
              {
                title: 'ID',
                field: 'id',
                type: 'numeric',
                align: 'left',
                headerStyle: {
                  width: '5%',
                },
                cellStyle: {
                  width: '5%',
                },
              },
              {
                title: 'Nome',
                field: 'name',
                type: 'string',
                align: 'left',
              },
              {
                title: 'CPF',
                field: 'cpf',
                type: 'string',
                align: 'left',
                render: rowData => <>{masks.cpfMask(rowData.cpf)}</>,
              },
              {
                title: 'Criado Em',
                field: 'createdAt',
                type: 'datetime',
                align: 'left',
                render: rowData => (
                  <>{subHours(rowData.createdAt).toLocaleString()}</>
                ),
              },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                getPatientsCall(
                  query.pageSize,
                  query.page,
                  idGroup,
                  selectedGroup
                )
                  .then(patient => {
                    resolve({
                      data: patient.data,
                      page: patient.page,
                      totalCount: patient.totalCount,
                    });
                  })
                  .catch(err => {
                    reject(
                      catchHandler(
                        err,
                        'Erro ao listar pacientes. Tente novamente ou contate o suporte.'
                      )
                    );
                  });
              })
            }
            icons={tableIcons}
            actions={[
              {
                icon: () => <Refresh />,
                tooltip: 'Atualizar',
                isFreeAction: true,
                onClick: () =>
                  tableRef.current && tableRef.current.onQueryChange(),
              },
              {
                icon: () => <Visibility />,
                tooltip: 'Visualizar Dados',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick: (e, rowData: Record<string, any>) =>
                  history.push(`/patients/${rowData.id}`),
              },
            ]}
            localization={{
              toolbar: {
                searchPlaceholder: 'Procurar',
                searchTooltip: 'Procurar',
              },
              header: {
                actions: 'Ações',
              },
              body: {
                emptyDataSourceMessage: 'Busca não obteve resultados',
              },
              pagination: {
                firstTooltip: 'Primeira Página',
                lastTooltip: 'Última Página',
                previousTooltip: 'Página Anterior',
                nextTooltip: 'Próxima Página',
                labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'linhas',
              },
            }}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: defaultStyles.purpleDark,
                color: '#fff',
              },
              sorting: false,
              search: false,
            }}
            components={{
              Toolbar: props => (
                <>
                  <MTableToolbar {...props} />
                  {groups && (
                    <FormControl className={classes.selectGroups}>
                      <InputLabel>Grupo</InputLabel>
                      <Select
                        value={selectedGroup}
                        onChange={handleChangeGroup}
                      >
                        <MenuItem value="">Todos</MenuItem>
                        {groups.map(group => (
                          <MenuItem key={group.id} value={String(group.id)}>
                            {group.group}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </>
              ),
            }}
          />
        </div>
      </div>
    </main>
  );
};

Patients.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  idGroup: PropTypes.string.isRequired,
};

export default Patients;