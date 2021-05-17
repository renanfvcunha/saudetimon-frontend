import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Divider,
  Fab,
  Tooltip,
  Typography,
  ThemeProvider,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ModalImage from 'react-modal-image';
import clsx from 'clsx';
import { toast } from 'react-toastify';

import useStyles, { ActButtons } from './styles';
import Container from '../../components/Container';
import PatientContext from '../../contexts/patientContext';
import IPatient from '../../typescript/IPatient';
import masks from '../../utils/masks';
import subHours from '../../utils/subHours';
import ModalConfirmation from '../../components/ModalConfirmation';
import DefaultModal from '../../components/DefaultModal';
import catchHandler from '../../utils/catchHandler';

interface IModalConfirmation {
  open: boolean;
  msg: string;
  confirm: string;
  title?: string;
  confirmAction?: () => void;
}

const ShowPatient: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const {
    showPatientCall,
    handleApprovePatientCall,
    handleDisapprovePatientCall,
  } = useContext(PatientContext);
  const history = useHistory();

  const [patient, setPatient] = useState<IPatient>();
  const [modalConfirmation, setModalConfirmation] = useState<
    IModalConfirmation
  >({
    open: false,
    msg: '',
    confirm: '',
  });
  const [modalDisapprove, setModalDisapprove] = useState(false);
  const [disapproveMsg, setDisapproveMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fieldParsed = (fieldName: string) => {
    switch (fieldName) {
      case 'idDocFront':
        return 'Documento de Identidade (Frente)';
      case 'idDocVerse':
        return 'Documento de Identidade (Verso)';
      case 'cpf':
        return 'CPF ou Cartão SUS';
      case 'addressProof':
        return 'Comprovante de Endereço';
      case 'medicalReport':
        return 'Laudo Médico';
      case 'medicalAuthorization':
        return 'Autorização Médica';
      case 'workContract':
        return 'Contracheque ou Contrato de Trabalho';
      case 'prenatalCard':
        return 'Cartão de Pré Natal';
      case 'puerperalCard':
        return 'Cartão de Puérperas';
      case 'bornAliveDec':
        return 'Declaração de Nascido Vivo';
      case 'patientContract':
        return 'Contrato com Paciente ou Declaração Autenticada';
      default:
        return fieldName;
    }
  };

  const handleCloseModal = () => {
    if (modalConfirmation) {
      setModalConfirmation({
        open: false,
        msg: '',
        confirm: '',
        title: undefined,
        confirmAction: undefined,
      });
    }

    if (modalDisapprove) {
      setModalDisapprove(false);
    }
  };

  const showPatient = useCallback(async () => {
    try {
      const data = await showPatientCall(id);

      setPatient(data);
    } catch (err) {
      catchHandler(
        err,
        'Erro ao buscar dados do paciente. Tente novamente ou contate o suporte.'
      );
    }
  }, [id, showPatientCall]);

  const handleApprovePatient = async () => {
    setLoading(true);

    try {
      const msg = await handleApprovePatientCall(id);

      toast.success(msg);
      handleCloseModal();
      showPatient();
    } catch (err) {
      catchHandler(
        err,
        'Erro ao buscar dados do paciente. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDisapprovePatient = async () => {
    setLoading(true);

    try {
      const msg = await handleDisapprovePatientCall(id, disapproveMsg);

      toast.success(msg);
      handleCloseModal();
      showPatient();
    } catch (err) {
      catchHandler(
        err,
        'Erro ao buscar dados do paciente. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showPatient();
  }, [showPatient]);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Tooltip
          title="Voltar"
          aria-label="back"
          className={classes.backBtn}
          onClick={() => history.goBack()}
        >
          <Fab color="primary" size="small">
            <ArrowBack />
          </Fab>
        </Tooltip>
        <Typography component="h1" variant="h3" align="center">
          Detalhes do Paciente
        </Typography>

        {patient && (
          <>
            <Typography component="h2" variant="h5">
              Dados Gerais
            </Typography>
            <Divider className={classes.mb1} />

            <div>
              <span className={classes.key}>Nome:</span>
              <span className={classes.value}>{patient.name}</span>
            </div>
            <div>
              <span className={classes.key}>CPF:</span>
              <span className={classes.value}>
                {masks.cpfMask(patient.cpf)}
              </span>
            </div>
            <div>
              <span className={classes.key}>Cartão Sus:</span>
              <span className={classes.value}>
                {patient.susCard
                  ? masks.susCardMask(patient.susCard)
                  : 'Não Informado'}
              </span>
            </div>
            <div>
              <span className={classes.key}>Telefone:</span>
              <span className={classes.value}>
                {masks.phoneMask(patient.phone)}
              </span>
            </div>
            <div>
              <span className={classes.key}>Data do Cadastro:</span>
              <span className={classes.value}>
                {subHours(patient.createdAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className={classes.key}>Categoria:</span>
              <span className={classes.value}>
                <strong>{patient.category.category}</strong>
              </span>
            </div>
            <div>
              <span className={classes.key}>Grupo:</span>
              <span className={classes.value}>
                <strong>{patient.group.group}</strong>
              </span>
            </div>
            <div>
              <span className={classes.key}>
                Paciente Renal, Oncológico ou Imunossuprimido:
              </span>
              <span className={classes.value}>
                <strong>
                  {patient.comorbidityPatient.renOncImun ? 'Sim' : 'Não'}
                </strong>
              </span>
            </div>
            <div>
              <span className={classes.key}>Comorbidade:</span>
              <span className={classes.value}>
                <strong>
                  {patient.comorbidityPatient.comorbidity
                    ? patient.comorbidityPatient.comorbidity.comorbidity
                    : 'Não Possui ou Não Informada'}
                </strong>
              </span>
            </div>
            <div>
              <span className={classes.key}>Status:</span>
              <span
                className={clsx(classes.value, {
                  [classes.colorAmber]:
                    patient.patientStatus.status.status === 'Em Análise',
                  [classes.colorGreen]:
                    patient.patientStatus.status.status === 'Aprovado',
                  [classes.colorRed]:
                    patient.patientStatus.status.status === 'Negado',
                })}
              >
                <strong>{patient.patientStatus.status.status}</strong>
              </span>
            </div>

            <Typography component="h2" variant="h5" className={classes.mt2}>
              Endereço
            </Typography>
            <Divider className={classes.mb1} />
            <div>
              <span className={classes.key}>Rua:</span>
              <span className={classes.value}>{patient.address.street}</span>
            </div>
            <div>
              <span className={classes.key}>Número:</span>
              <span className={classes.value}>{patient.address.number}</span>
            </div>
            <div>
              <span className={classes.key}>Complemento:</span>
              <span className={classes.value}>
                {patient.address.complement}
              </span>
            </div>
            <div>
              <span className={classes.key}>Referência:</span>
              <span className={classes.value}>{patient.address.reference}</span>
            </div>
            <div>
              <span className={classes.key}>Bairro:</span>
              <span className={classes.value}>
                {patient.address.neighborhood}
              </span>
            </div>

            <Typography component="h2" variant="h5" className={classes.mt2}>
              Anexos
            </Typography>
            <Divider className={classes.mb1} />

            {patient.attachment.map(attach => (
              <div key={attach.field} className={classes.mb1}>
                <span className={classes.key}>
                  {fieldParsed(attach.field)}:
                </span>
                {attach.filename.startsWith('IMG') ? (
                  <>
                    <br />
                    <div className={classes.imgThumb}>
                      <ModalImage
                        small={`${process.env.REACT_APP_API_URL}/uploads/${attach.filename}`}
                        large={`${process.env.REACT_APP_API_URL}/uploads/${attach.filename}`}
                        alt={fieldParsed(attach.field)}
                      />
                    </div>
                  </>
                ) : (
                  <span className={classes.value}>
                    <a
                      href={`${process.env.REACT_APP_API_URL}/uploads/${attach.filename}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {attach.filename}
                    </a>
                  </span>
                )}
              </div>
            ))}

            {patient.patientStatus.status.status === 'Em Análise' && (
              <div className={classes.actButtons}>
                <ThemeProvider theme={ActButtons}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.actBtn}
                    onClick={() =>
                      setModalConfirmation({
                        open: true,
                        msg: `Deseja aprovar o cadastro de ${patient.name}?`,
                        confirm: 'Aprovar',
                        title: 'Aprovar Cadastro',
                        confirmAction: handleApprovePatient,
                      })
                    }
                  >
                    Aprovar Cadastro
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.actBtn}
                    onClick={() => setModalDisapprove(true)}
                  >
                    Reprovar Cadastro
                  </Button>
                </ThemeProvider>
              </div>
            )}
          </>
        )}
      </Container>

      <ThemeProvider theme={ActButtons}>
        <ModalConfirmation
          open={modalConfirmation.open}
          close={handleCloseModal}
          title={modalConfirmation.title}
          msg={modalConfirmation.msg}
          loading={loading}
          cancel="Cancelar"
          confirm={modalConfirmation.confirm}
          confirmAction={() => alert('Deu certo')}
        />
      </ThemeProvider>

      <DefaultModal open={modalDisapprove} close={handleCloseModal}>
        <Typography component="h1" variant="h6" style={{ fontWeight: 500 }}>
          Reprovar Cadastro
        </Typography>

        <TextField
          label="Motivo da Reprovação"
          multiline
          rows={3}
          className={classes.disapproveMsgField}
          variant="outlined"
          value={disapproveMsg}
          onChange={e => setDisapproveMsg(e.target.value)}
          helperText="O motivo da reprovação ficará visível para o paciente
          para que seu cadastro possa ser atualizado."
        />

        {loading && (
          <div className={classes.loading}>
            <CircularProgress size={24} />
          </div>
        )}

        <ThemeProvider theme={ActButtons}>
          <div className={clsx([classes.actButtons, classes.mt1])}>
            <Button
              color="primary"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              color="secondary"
              onClick={handleDisapprovePatient}
              disabled={loading}
            >
              Reprovar
            </Button>
          </div>
        </ThemeProvider>
      </DefaultModal>
    </main>
  );
};

export default ShowPatient;
