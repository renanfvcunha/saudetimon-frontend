import React, { useContext, useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Fab,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, ArrowBack, Edit, Remove } from '@material-ui/icons';

import DefaultModal from '../../../components/DefaultModal';
import useStyles, { actionButtons } from './styles';
import ComorbidityContext from '../../../contexts/comorbidityContext';
import IComorbidity from '../../../typescript/IComorbidity';
import catchHandler from '../../../utils/catchHandler';

interface Props {
  open: boolean;
  close: () => void;
}

const Comorbidities: React.FC<Props> = ({ open, close }) => {
  const classes = useStyles();
  const { getComorbiditiesCall } = useContext(ComorbidityContext);

  const [comorbidities, setComorbidities] = useState<IComorbidity[]>();

  useEffect(() => {
    const getComorbidities = async () => {
      try {
        const data = await getComorbiditiesCall();

        setComorbidities(data);
      } catch (err) {
        catchHandler(
          err,
          'Não foi possível listar as comorbidades. Tente novamente ou contate o suporte.'
        );
      }
    };

    getComorbidities();
  }, [getComorbiditiesCall]);

  return (
    <DefaultModal open={open} close={close} scrollable>
      <Tooltip
        title="Voltar"
        aria-label="back"
        className={classes.backBtn}
        onClick={close}
      >
        <Fab color="primary" size="small">
          <ArrowBack />
        </Fab>
      </Tooltip>

      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.boxTitle}
      >
        Comorbidades&nbsp;
        <Tooltip
          title="Nova Comorbidade" /* onClick={() => setModalAddDoubt(true)} */
        >
          <Fab color="primary" size="small">
            <Add />
          </Fab>
        </Tooltip>
      </Typography>

      <ThemeProvider theme={actionButtons}>
        <div className={classes.content}>
          {comorbidities &&
            comorbidities.map(comorbidity => (
              <Fragment key={comorbidity.id}>
                <div className={classes.comorbidityContent}>
                  <Tooltip
                    title="Editar Comorbidade"
                    /* onClick={() => setModalAddDoubt(true)} */
                  >
                    <Fab color="primary" size="small">
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <Typography component="span" className={classes.comorbidity}>
                    {comorbidity.comorbidity}
                  </Typography>
                  <Tooltip
                    title="Remover Comorbidade" /* onClick={() => setModalAddDoubt(true)} */
                  >
                    <Fab color="secondary" size="small">
                      <Remove />
                    </Fab>
                  </Tooltip>
                </div>
                <Divider className={classes.divider} />
              </Fragment>
            ))}
        </div>
      </ThemeProvider>
    </DefaultModal>
  );
};

Comorbidities.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default Comorbidities;
