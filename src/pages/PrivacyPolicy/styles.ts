import { makeStyles } from '@material-ui/core/styles';

import loginBackground from '../../images/loginBackground.png';

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: '100vh',
    background: `url("${loginBackground}") #654d7d`,
    backgroundSize: 'cover',
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    marginTop: '1rem',
    color: '#fff',
    fontWeight: 700,
  },
  questions: {
    margin: '1rem 0',
  },
  questionBox: {
    marginTop: '1rem',
    maxWidth: 800,
    border: '1px solid #fff',
    borderRadius: 8,
    padding: '8px 16px',
  },
  question: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: '#fff',
    width: 20,
  },
  questionTxt: {
    marginLeft: 8,
    fontSize: 24,
    fontWeight: 500,
    color: '#fff',
  },
  answer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  answerTxt: {
    marginLeft: 8,
    fontSize: 18,
    color: '#fff',
  },
}));

export default useStyles;
