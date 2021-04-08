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
    const data = await showPatientCall(id);

    setPatient(data);
  }, [id, showPatientCall]);

  const handleApprovePatient = async () => {
    const msg = await handleApprovePatientCall(id);

    toast.success(msg);
    handleCloseModal();
    showPatient();
  };

  const handleDisapprovePatient = async () => {
    const msg = await handleDisapprovePatientCall(id, disapproveMsg);

    toast.success(msg);
    handleCloseModal();
    showPatient();
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
              <span className={classes.value}>{patient.cpf}</span>
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
              <span className={classes.key}>Grupo:</span>
              <span className={classes.value}>
                <strong>{patient.group.group}</strong>
              </span>
            </div>
            <div>
              <span className={classes.key}>Status:</span>
              <span
                className={clsx(classes.value, {
                  [classes.colorAmber]: patient.patientStatus.status.id === 1,
                  [classes.colorGreen]: patient.patientStatus.status.id === 2,
                  [classes.colorRed]: patient.patientStatus.status.id === 3,
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

            <div className={classes.mb1}>
              <span className={classes.key}>
                Documento de Identidade (Frente):
              </span>
              {patient.idDocFront.startsWith('IMG') ? (
                <>
                  <br />
                  <div className={classes.imgThumb}>
                    <ModalImage
                      small={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocFront}`}
                      large={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocFront}`}
                      alt={patient.idDocFront}
                    />
                  </div>
                </>
              ) : (
                <span className={classes.value}>
                  <a
                    href={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocFront}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {patient.idDocFront}
                  </a>
                </span>
              )}
            </div>

            <div className={classes.mb1}>
              <span className={classes.key}>
                Documento de Identidade (Verso):
              </span>
              {patient.idDocVerse.startsWith('IMG') ? (
                <>
                  <br />
                  <div className={classes.imgThumb}>
                    <ModalImage
                      small={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocVerse}`}
                      large={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocVerse}`}
                      alt={patient.idDocVerse}
                    />
                  </div>
                </>
              ) : (
                <span className={classes.value}>
                  <a
                    href={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocVerse}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {patient.idDocVerse}
                  </a>
                </span>
              )}
            </div>

            <div className={classes.mb1}>
              <span className={classes.key}>Comprovante de Endereço:</span>
              {patient.addressProof.startsWith('IMG') ? (
                <>
                  <br />
                  <div className={classes.imgThumb}>
                    <ModalImage
                      small={`${process.env.REACT_APP_API_URL}/uploads/${patient.addressProof}`}
                      large={`${process.env.REACT_APP_API_URL}/uploads/${patient.addressProof}`}
                      alt={patient.addressProof}
                    />
                  </div>
                </>
              ) : (
                <span className={classes.value}>
                  <a
                    href={`${process.env.REACT_APP_API_URL}/uploads/${patient.addressProof}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {patient.addressProof}
                  </a>
                </span>
              )}
            </div>

            <div className={classes.mb1}>
              <span className={classes.key}>Foto:</span>
              {patient.photo.startsWith('IMG') ? (
                <>
                  <br />
                  <div className={classes.imgThumb}>
                    <ModalImage
                      small={`${process.env.REACT_APP_API_URL}/uploads/${patient.photo}`}
                      large={`${process.env.REACT_APP_API_URL}/uploads/${patient.photo}`}
                      alt={patient.photo}
                    />
                  </div>
                </>
              ) : (
                <span className={classes.value}>
                  <a
                    href={`${process.env.REACT_APP_API_URL}/uploads/${patient.photo}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {patient.photo}
                  </a>
                </span>
              )}
            </div>

            {patient.comorbidityPatient && <Divider className={classes.mb1} />}

            {patient.comorbidityPatient &&
              patient.comorbidityPatient.medicalReport && (
                <div className={classes.mb1}>
                  <span className={classes.key}>Laudo Médico:</span>
                  {patient.comorbidityPatient.medicalReport.startsWith(
                    'IMG'
                  ) ? (
                    <>
                      <br />
                      <div className={classes.imgThumb}>
                        <ModalImage
                          small={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalReport}`}
                          large={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalReport}`}
                          alt={patient.comorbidityPatient.medicalReport}
                        />
                      </div>
                    </>
                  ) : (
                    <span className={classes.value}>
                      <a
                        href={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalReport}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {patient.comorbidityPatient.medicalReport}
                      </a>
                    </span>
                  )}
                </div>
              )}

            {patient.comorbidityPatient &&
              patient.comorbidityPatient.medicalAuthorization && (
                <div className={classes.mb1}>
                  <span className={classes.key}>Autorização Médica:</span>
                  {patient.comorbidityPatient.medicalAuthorization.startsWith(
                    'IMG'
                  ) ? (
                    <>
                      <br />
                      <div className={classes.imgThumb}>
                        <ModalImage
                          small={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalAuthorization}`}
                          large={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalAuthorization}`}
                          alt={patient.comorbidityPatient.medicalAuthorization}
                        />
                      </div>
                    </>
                  ) : (
                    <span className={classes.value}>
                      <a
                        href={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalAuthorization}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {patient.comorbidityPatient.medicalAuthorization}
                      </a>
                    </span>
                  )}
                </div>
              )}

            {patient.comorbidityPatient &&
              patient.comorbidityPatient.medicalPrescription && (
                <div className={classes.mb1}>
                  <span className={classes.key}>Prescrição Médica:</span>
                  {patient.comorbidityPatient.medicalPrescription.startsWith(
                    'IMG'
                  ) ? (
                    <>
                      <br />
                      <div className={classes.imgThumb}>
                        <ModalImage
                          small={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalPrescription}`}
                          large={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalPrescription}`}
                          alt={patient.comorbidityPatient.medicalPrescription}
                        />
                      </div>
                    </>
                  ) : (
                    <span className={classes.value}>
                      <a
                        href={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalPrescription}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {patient.comorbidityPatient.medicalPrescription}
                      </a>
                    </span>
                  )}
                </div>
              )}

            {patient.patientStatus.status.id === 1 && (
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
          cancel="Cancelar"
          confirm={modalConfirmation.confirm}
          confirmAction={modalConfirmation.confirmAction}
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

        <ThemeProvider theme={ActButtons}>
          <div className={clsx([classes.actButtons, classes.mt1])}>
            <Button color="primary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button color="secondary" onClick={handleDisapprovePatient}>
              Reprovar
            </Button>
          </div>
        </ThemeProvider>
      </DefaultModal>
    </main>
  );
};

export default ShowPatient;
