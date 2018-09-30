import axios from 'axios';

export default () => {
  return axios.create({
    timeout: 5000,
  });
};
