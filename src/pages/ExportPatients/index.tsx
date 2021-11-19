import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { saveAs } from 'file-saver';
import { AxiosResponse } from 'axios';

import useStyles from './styles';
import Container from '../../components/Container';
import pdfIcon from '../../images/icons/pdfIcon.svg';
import excelIcon from '../../images/icons/excelIcon.svg';

import api from '../../services/api';
import catchHandler, { Err } from '../../utils/catchHandler';

type Format = 'pdf' | 'excel';
type Period = 'all' | 'specific';

const ExportPatients: React.FC = () => {
  const classes = useStyles();

  const [format, setFormat] = useState<Format>('pdf');
  const [period, setPeriod] = useState<Period>('all');
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');

  const [loading, setLoading] = useState(false);

  const handleChangeFormat = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormat(event.target.value as Format);
  };

  const handleChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriod((event.target as HTMLInputElement).value as Period);
  };

  const exportData = async () => {
    let uri = `/patients/export?type=${format}`;

    if (period === 'specific') {
      uri += `&start=${`${periodStart} 00:00:00`}&end=${`${periodEnd} 23:59:59`}`;
    }

    try {
      setLoading(true);
      const response: AxiosResponse<Blob> = await api.get(uri, {
        responseType: 'blob',
      });

      let ext = '';
      const datetime = new Date().toLocaleString();
      const date = datetime.split(' ')[0].split('/').join('');
      const time = datetime.split(' ')[1].split(':').join('');

      switch (response.data.type) {
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          ext = 'xlsx';
          break;
        case 'application/pdf':
          ext = 'pdf';
          break;
        default:
          break;
      }

      saveAs(response.data, `relatorio-${date}-${time}.${ext}`);
    } catch (err) {
      catchHandler(
        err as Err,
        'Não foi possível exportar os dados. Tente novamente ou contate o suporte.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Container>
        <Typography component="h1" variant="h3" align="center">
          Exportar Pacientes
        </Typography>

        <div className={classes.boxRoot}>
          <div className={classes.box}>
            <FormControl>
              <InputLabel>Formato</InputLabel>
              <Select value={format} onChange={handleChangeFormat}>
                <MenuItem value="pdf">
                  <img src={pdfIcon} alt="PDF Icon" />
                </MenuItem>
                <MenuItem value="excel">
                  <img src={excelIcon} alt="Excel Icon" />
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl component="fieldset" className={classes.mt1}>
              <FormLabel component="legend">Período</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={period}
                onChange={handleChangePeriod}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio color="primary" />}
                  label="Todos"
                />
                <FormControlLabel
                  value="specific"
                  control={<Radio color="primary" />}
                  label="Específico"
                />
              </RadioGroup>
            </FormControl>

            {period === 'specific' && (
              <div className={classes.period}>
                <FormLabel>Selecione o Período</FormLabel>
                <TextField
                  label="Início"
                  className={classes.mt05}
                  type="date"
                  value={periodStart}
                  onChange={e => setPeriodStart(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="Fim"
                  className={classes.mt05}
                  type="date"
                  value={periodEnd}
                  onChange={e => setPeriodEnd(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            )}

            {loading && (
              <CircularProgress size={28} className={classes.progress} />
            )}

            <Button
              color="primary"
              variant="contained"
              className={classes.mt1}
              onClick={exportData}
              disabled={loading}
            >
              Exportar
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ExportPatients;
