import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

interface Err extends Error {
  response?: AxiosResponse<{ msg: string }>;
}

const catchHandler = (err: Err, errMsg: string): void => {
  if (err.message === 'Network Error') {
    toast.error(
      'Não foi possível conectar ao servidor. Tente novamente ou contate o suporte.'
    );
  } else if (err.response) {
    toast.error(err.response.data.msg);
  } else {
    toast.error(errMsg);
  }
};

export default catchHandler;
