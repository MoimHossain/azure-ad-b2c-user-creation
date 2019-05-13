
import Actions from '../action-constants';

const loadProjects = () => {

    return function (dispatch) {
        
        dispatch({
            type: Actions.LoadProjects,
            payload: [
                { id: 1, name: 'Xyz', brand: 'Maersk Line', program: 'Maersk Line' },
                { id: 2, name: 'Abc', brand: 'Maersk Line', program: 'Maersk Line' }]
        });
    };

};

export default loadProjects;