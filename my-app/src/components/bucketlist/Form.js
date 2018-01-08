import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const Form = ({bucketlist, onSave, onDelete, onChange, saving, errors, title}) => {
  return (
    <form>
      <h1>{bucketlist.id? 'Edit BucketList' : title}</h1>
      <TextInput
        name="title"
        label="Title"
        value={bucketlist.title}
        onChange={onChange}
        error={errors.title}/>

      <TextInput
        name="description"
        label="Description"
        value={bucketlist.description}
        onChange={onChange}
        error={errors.description}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

Form.propTypes = {
  bucketlist: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  saving: PropTypes.bool,
  deleting: PropTypes.bool,
  errors: PropTypes.object,
  title: PropTypes.string
};

export default Form;
