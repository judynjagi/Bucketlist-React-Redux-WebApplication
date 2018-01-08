import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const ItemForm = ({bucketlist, onSave, onDelete, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Edit Item</h1>
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

      <TextInput
        name="done"
        label="Done"
        value={bucketlist.done}
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

ItemForm.propTypes = {
  bucketlist: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  saving: PropTypes.bool,
  done: PropTypes.bool,
  errors: PropTypes.object
};

export default ItemForm;
