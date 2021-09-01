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
import { useHistory, useLocation } from 'react-router-dom';
import MaterialTable, { Icons, MTableToolbar } from 'material-table';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ThemeProvider,
} from '@material-ui/core';
import {
  ArrowDownward,
  CheckCircle,
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
import { toast } from 'react-toastify';
import qs from 'query-string';

import useStyles, { confirmationBtns } from './styles';
import defaultStyles from '../../utils/defaultStyles';
import subHours from '../../utils/subHours';
import masks from '../../utils/masks';
import IGroup from '../../typescript/IGroup';
import PatientContext from '../../contexts/patientContext';
import catchHandler, { Err } from '../../utils/catchHandler';
import ModalConfirmation from '../ModalConfirmation';
import ICategory from '../../typescript/ICategory';

interface Props {
  tableTitle: string;
  status: string;
}

const Patients: React.FC<Props> = ({ tableTitle, status }) => {
  const classes = useStyles();
  const tableRef: RefObject<{ onQueryChange(): void }> = createRef();
  const {
    getCategoriesCall,
    getGroupsCall,
    getPatientsCall,
    markAsVaccinatedCall,
  } = useContext(PatientContext);
  const history = useHistory();
  const { search } = useLocation();

  const [categories, setCategories] = useState<ICategory[]>();
  const [groups, setGroups] = useState<IGroup[]>();
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [loading, setLoading] = useState(false);

  const [queryString, setQueryString] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>();

  const handleChangeCategory = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(e.target.value as string);
    let qsParsed = qs.parse(queryString);
    qsParsed = { ...qsParsed, category: e.target.value as string };
    if (qsParsed.group) {
      qsParsed = { ...qsParsed, group: null };
      setSelectedGroup('');
    }
    if (qsParsed.page) {
      qsParsed = { ...qsParsed, page: '0' };
      setCurrentPage(0);
    }
    setQueryString(qs.stringify(qsParsed));
  };

  const handleChangeGroup = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(e.target.value as string);
    let qsParsed = qs.parse(queryString);
    qsParsed = { ...qsParsed, group: e.target.value as string };
    if (qsParsed.page) {
      qsParsed = { ...qsParsed, page: '0' };
      setCurrentPage(0);
    }
    setQueryString(qs.stringify(qsParsed));
  };

  const closeModal = () => {
    if (modalConfirmation) setModalConfirmation(false);
  };

  const refreshTable = () => {
    tableRef.current?.onQueryChange();
  };

  const handleMarkAsVaccinated = async () => {
    setLoading(true);

    try {
      const msg = await markAsVaccinatedCall(selectedPatient);

      toast.success(msg);
      closeModal();
      refreshTable();
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível marcar o paciente como vacinado. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
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

  const tableActions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Atualizar',
      isFreeAction: true,
      onClick: () => tableRef.current && tableRef.current.onQueryChange(),
    },
    {
      icon: () => <Visibility />,
      tooltip: 'Visualizar Dados',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (e: any, rowData: Record<string, any>) =>
        history.push(`/pacientes/${rowData.id}`),
    },
  ];

  if (status === 'Aprovado') {
    tableActions.push({
      icon: () => <CheckCircle />,
      tooltip: 'Marcar como Vacinado',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: (e: any, rowData: Record<string, any>) => {
        setSelectedPatient(rowData.id);
        setSelectedPatientName(rowData.name);
        setModalConfirmation(true);
      },
    });
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getCategoriesCall();

        setCategories(data);
      } catch (err) {
        catchHandler(
          err as Err,
          'Erro ao listar categorias. Tente novamente ou contate o suporte.'
        );
      }
    };

    getCategories();
  }, [getCategoriesCall]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await getGroupsCall(selectedCategory);

        setGroups(data);
      } catch (err) {
        catchHandler(
          err as Err,
          'Erro ao listar grupos. Tente novamente ou contate o suporte.'
        );
      }
    };

    if (selectedCategory !== '') {
      getGroups();
    }
  }, [getGroupsCall, selectedCategory]);

  useEffect(() => {
    tableRef.current?.onQueryChange();
  }, [tableRef, selectedGroup]);

  useEffect(() => {
    if (search !== '') {
      setQueryString(search);
      const qsParsed = qs.parse(search);

      if (qsParsed.category) {
        setSelectedCategory(qsParsed.category as string);

        if (qsParsed.group) {
          setSelectedGroup(qsParsed.group as string);
        }
      }
      if (qsParsed.page) {
        setCurrentPage(Number(qsParsed.page));
      }
    }
  }, [search]);

  useEffect(() => {
    setQueryString(search);
    const qsParsed = qs.parse(search);
    if (qsParsed.perPage) {
      setRowsPerPage(Number(qsParsed.perPage));
    } else {
      setRowsPerPage(50);
    }
  }, [search]);

  useEffect(() => {
    if (queryString !== '') {
      window.history.replaceState(
        '',
        '',
        `${window.location.pathname}?${queryString.replace('?', '')}`
      );
    }
  }, [queryString]);

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.tableBox}>
          <div className={classes.table}>
            {rowsPerPage && (
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
                    title: 'Cadastrado Em',
                    field: 'createdAt',
                    type: 'datetime',
                    align: 'left',
                    render: rowData => (
                      <>{subHours(rowData.createdAt).toLocaleString()}</>
                    ),
                  },
                ]}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                data={query =>
                  new Promise((resolve, reject) => {
                    getPatientsCall(
                      rowsPerPage.toString(),
                      currentPage.toString(),
                      status,
                      selectedCategory,
                      selectedGroup,
                      'false'
                    )
                      .then(patient => {
                        resolve({
                          data: patient.data,
                          page: currentPage,
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
                actions={tableActions}
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
                  pageSize: rowsPerPage,
                  pageSizeOptions: [5, 10, 20, 50, 100, 200],
                }}
                onChangePage={page => {
                  setCurrentPage(page);
                  let qsParsed = qs.parse(queryString);
                  qsParsed = {
                    ...qsParsed,
                    page: page.toString(),
                  };
                  setQueryString(qs.stringify(qsParsed));
                }}
                onChangeRowsPerPage={pageSize => {
                  setRowsPerPage(pageSize);
                  let qsParsed = qs.parse(queryString);
                  qsParsed = { ...qsParsed, perPage: pageSize.toString() };
                  setQueryString(qs.stringify(qsParsed));
                }}
                components={{
                  Toolbar: props => (
                    <>
                      <MTableToolbar {...props} />
                      <div className={classes.selects}>
                        {categories && (
                          <FormControl className={classes.selectCategories}>
                            <InputLabel>Categoria</InputLabel>
                            <Select
                              value={selectedCategory}
                              onChange={handleChangeCategory}
                            >
                              <MenuItem value="">Todas</MenuItem>
                              {categories.map(category => (
                                <MenuItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.category}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                        {groups && (
                          <FormControl className={classes.selectGroups}>
                            <InputLabel>Grupo</InputLabel>
                            <Select
                              value={selectedGroup}
                              onChange={handleChangeGroup}
                            >
                              <MenuItem value="">Todos</MenuItem>
                              {groups.map(group => (
                                <MenuItem
                                  key={group.id}
                                  value={group.id.toString()}
                                >
                                  {group.group}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </div>
                    </>
                  ),
                }}
              />
            )}
          </div>
        </div>
      </main>

      {status === 'Aprovado' && (
        <ThemeProvider theme={confirmationBtns}>
          <ModalConfirmation
            open={modalConfirmation}
            close={closeModal}
            title="Alerta"
            msg={
              <>
                Deseja marcar <strong>{selectedPatientName}</strong> como
                vacinado?
              </>
            }
            cancel="Cancelar"
            confirm="Marcar"
            confirmAction={handleMarkAsVaccinated}
            loading={loading}
          />
        </ThemeProvider>
      )}
    </>
  );
};

Patients.propTypes = {
  tableTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Patients;
