import React, { createRef, forwardRef, RefObject } from 'react';
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
} from '@material-ui/icons';
import { toast } from 'react-toastify';

import useStyles from './styles';
import defaultStyles from '../../utils/defaultStyles';
import api from '../../services/api';
import IPatients from '../../typescript/IPatients';
import subtractHours from '../../utils/subtractHours';

const Oldman: React.FC = () => {
  const classes = useStyles();
  const tableRef: RefObject<{ onQueryChange(): void }> = createRef();

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

  const dataRequestFailure = (errorMsg: string) => {
    toast.error(errorMsg);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.tableBox}>
        <div className={classes.table}>
          <MaterialTable
            title="Lista de Novos Pacientes"
            tableRef={tableRef}
            columns={[
              {
                title: '#',
                field: 'num',
                type: 'numeric',
                align: 'left',
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
              },
              {
                title: 'Criado Em',
                field: 'createdAt',
                type: 'datetime',
                align: 'left',
              },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                const url = `patients?per_page=${query.pageSize}&page=${query.page}`;

                api
                  .get(url)
                  .then(response => {
                    resolve({
                      data: response.data.map((res: IPatients, i: number) => ({
                        ...res,
                        createdAt: subtractHours(res.createdAt),
                        num: i + 1,
                      })),
                      page: Number(response.headers.page),
                      totalCount: Number(response.headers['total-count']),
                    });
                  })
                  .catch(err => {
                    if (err.message === 'Network Error') {
                      reject(
                        dataRequestFailure(
                          'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
                        )
                      );
                    } else if (err.response) {
                      reject(dataRequestFailure(err.response.data.msg));
                    } else {
                      reject(
                        dataRequestFailure(
                          'Ocorreu um erro na requisição dos dados.'
                        )
                      );
                    }
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
              actionsCellStyle: { width: '10%' },
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

export default Oldman;
