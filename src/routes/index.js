import login from '../login/routes';
import glados from '../glados/routes';
import root from './root';
import spike from '../spike/routes';

const routes = {
    root, login, glados, spike
};

export default routes;
export {
    root, login, glados, spike
};
