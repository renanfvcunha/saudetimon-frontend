import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Divider, Fab, Tooltip, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import useStyles from './styles';
import Container from '../../components/Container';
import PatientContext from '../../contexts/patientContext';
import IPatient from '../../typescript/IPatient';
import masks from '../../utils/masks';
import subHours from '../../utils/subHours';

const ShowPatient: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { showPatientCall } = useContext(PatientContext);
  const history = useHistory();

  const [patient, setPatient] = useState<IPatient>();

  useEffect(() => {
    const showPatient = async () => {
      const data = await showPatientCall(id);

      setPatient(data);
    };

    showPatient();
  }, [id, showPatientCall]);

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
          <div>
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
              <span className={classes.value}>
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
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocFront}`}
                    alt="Doc Id Front"
                    style={{ maxWidth: 400 }}
                  />
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
              <br />
              {patient.idDocVerse.startsWith('IMG') ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads/${patient.idDocVerse}`}
                  alt="Doc Id Front"
                  style={{ maxWidth: 400 }}
                />
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
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${patient.addressProof}`}
                    alt="Doc Id Front"
                    style={{ maxWidth: 400 }}
                  />
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
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${patient.photo}`}
                    alt="Doc Id Front"
                    style={{ maxWidth: 400 }}
                  />
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
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalReport}`}
                        alt="Doc Id Front"
                        style={{ maxWidth: 400 }}
                      />
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
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalAuthorization}`}
                        alt="Doc Id Front"
                        style={{ maxWidth: 400 }}
                      />
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
                      <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${patient.comorbidityPatient.medicalPrescription}`}
                        alt="Doc Id Front"
                        style={{ maxWidth: 400 }}
                      />
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
          </div>
        )}
      </Container>
    </main>
  );
};

export default ShowPatient;