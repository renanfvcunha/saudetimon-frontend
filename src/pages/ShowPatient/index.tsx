import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button,
  Divider,
  Fab,
  Tooltip,
  Typography,
  ThemeProvider,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import ModalImage from 'react-modal-image';
import clsx from 'clsx';

import useStyles, { ActButtons } from './styles';
import Container from '../../components/Container';
import PatientContext from '../../contexts/patientContext';
import IPatient from '../../typescript/IPatient';
import masks from '../../utils/masks';
import subHours from '../../utils/subHours';
import catchHandler from '../../utils/catchHandler';
import ModalChangeStatus from './ModalChangeStatus';
import ModalChangeGroup from './ModalChangeGroup';

const ShowPatient: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { showPatientCall } = useContext(PatientContext);
  const history = useHistory();

  const [patient, setPatient] = useState<IPatient>();
  const [modalChangeStatus, setModalChangeStatus] = useState(false);
  const [modalChangeGroup, setModalChangeGroup] = useState(false);

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

  const closeModal = () => {
    if (modalChangeStatus) setModalChangeStatus(false);
    if (modalChangeGroup) setModalChangeGroup(false);
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
                  [classes.colorBlue]:
                    patient.patientStatus.status.status === 'Em Análise',
                  [classes.colorLime]:
                    patient.patientStatus.status.status === 'Pré-Aprovado',
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

            <div className={classes.actButtons}>
              <ThemeProvider theme={ActButtons}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.actBtn}
                  onClick={() => setModalChangeGroup(true)}
                >
                  Alterar Grupo
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.actBtn}
                  onClick={() => setModalChangeStatus(true)}
                >
                  Alterar Status
                </Button>
              </ThemeProvider>
            </div>
          </>
        )}
      </Container>

      {patient && (
        <ModalChangeStatus
          idPatient={patient.id.toString()}
          open={modalChangeStatus}
          reloadData={showPatient}
          close={closeModal}
          idStatus={patient.patientStatus.status.id.toString()}
          message={patient.patientStatus.message}
        />
      )}

      {patient && (
        <ModalChangeGroup
          idPatient={patient.id.toString()}
          open={modalChangeGroup}
          reloadData={showPatient}
          close={closeModal}
          idGroup={patient.group.id.toString()}
        />
      )}
    </main>
  );
};

export default ShowPatient;
