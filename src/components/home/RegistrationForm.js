import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const RegistrationForm = ({userDetails, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Register</h1>
      <TextInput
        type="text"
        name="username"
        label="username"
        required="true"
        value={userDetails.username}
        onChange={onChange}
        error={errors.username}/>

      <TextInput
        type="email"
        name="email"
        label="email"
        value={userDetails.email}
        onChange={onChange}
        error={errors.email}/>

      <TextInput
        type="text"
        name="password"
        label="password"
        value={userDetails.password}
        onChange={onChange}
        error={errors.password}/>

        <TextInput
          type="text"
          name="verify_password"
          label="verify_password"
          value={userDetails.verify_password}
          onChange={onChange}
          error={errors.verify_password}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

RegistrationForm.propTypes = {
  userDetails: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
  type: PropTypes.bool
};

export default RegistrationForm;
