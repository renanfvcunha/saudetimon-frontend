import React, { useLayoutEffect } from 'react';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { FiberManualRecord, Remove } from '@material-ui/icons';

import logo from '../../images/logo.png';
import useStyles from './styles';

const PrivacyPolicy: React.FC = () => {
  const classes = useStyles();

  useLayoutEffect(() => {
    document.title = 'Política de Privacidade - Saúde Timon 24h';
  }, []);

  return (
    <main className={classes.content}>
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="Logo Saúde Timon 24h" width="400" />
          <Typography component="h1" variant="h4" className={classes.pageTitle}>
            Política de privacidade do aplicativo Saúde Timon 24h
          </Typography>

          <section className={classes.questions}>
            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Quais dados coletamos?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  A fim de viabilizar o cadastro de pacientes para vacinação,
                  coletamos dados pessoais como nome, cpf, data de nascimento,
                  endereço, e outros possíveis documentos pessoais.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Como usamos suas informações?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Usamos as informações geradas no cadastro para a análise de
                  aplicabilidade de vacinas no município de Timon - MA.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Com quem compartilhamos seus dados?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados são armazenados no servidor do sistema não
                  sendo em hipótese alguma compartilhados com outros serviços ou
                  sistemas.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Serviços de publicidade
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados não são em hipótese alguma compartilhados
                  com quaisquer serviços de publicidade.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Onde processamos seus dados?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados são processados em um servidor da plataforma
                  Google Cloud Platform localizado nos EUA.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Alterações na política de privacidade
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Reservamos o direito de modificar essa política de privacidade
                  a qualquer momento, então, é recomendável que o usuário
                  revise-a com frequência.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Contato
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Para maiores informações acerca dessa política de privacidade,
                  entrar em contato com suporteaccesssollutions@gmail.com.
                </Typography>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPolicy;
