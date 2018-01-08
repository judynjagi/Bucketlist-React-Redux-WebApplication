import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const LoginForm = ({userDetails, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Login</h1>
      <TextInput
        name="username"
        label="username"
        value={userDetails.username}
        onChange={onChange}
        error={errors.username}/>

      <TextInput
        name="password"
        label="password"
        value={userDetails.password}
        onChange={onChange}
        error={errors.password}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

LoginForm.propTypes = {
  userDetails: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default LoginForm;
