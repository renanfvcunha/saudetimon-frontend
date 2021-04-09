/* eslint-disable react/destructuring-assignment */
import React, { useContext, createRef, forwardRef, RefObject } from 'react';
import { useHistory } from 'react-router-dom';
import MaterialTable, { Icons } from 'material-table';
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

import useStyles from './styles';
import defaultStyles from '../../utils/defaultStyles';
import subHours from '../../utils/subHours';
import UserContext from '../../contexts/userContext';

const Users: React.FC = () => {
  const classes = useStyles();
  const tableRef: RefObject<{ onQueryChange(): void }> = createRef();
  const { getUsersCall } = useContext(UserContext);
  const history = useHistory();

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

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.tableBox}>
        <div className={classes.table}>
          <MaterialTable
            title="Lista de Usuários"
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
                title: 'Nome de Usuário',
                field: 'username',
                type: 'string',
                align: 'left',
              },
              {
                title: 'Admin',
                field: 'admin',
                type: 'string',
                align: 'left',
                render: rowData => (
                  <>{rowData.admin === true ? 'Sim' : 'Não'}</>
                ),
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
                getUsersCall(query.pageSize, query.page)
                  .then(user => {
                    resolve({
                      data: user.data,
                      page: user.page,
                      totalCount: user.totalCount,
                    });
                  })
                  .catch(() => {
                    reject();
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
          />
        </div>
      </div>
    </main>
  );
};

export default Users;
