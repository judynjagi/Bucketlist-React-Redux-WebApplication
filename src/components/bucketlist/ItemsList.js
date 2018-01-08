import React, {PropTypes} from 'react';
import ItemRow from './ItemsRow';

const ItemList = ({allItems}) => {
  return(
    <div className="row">
        {allItems.map(item =>
          <ItemRow key={item.item_id} items={item}/>
        )}
    </div>
  );
};

ItemList.propTypes = {
  allItems: PropTypes.array.isRequired
};

export default ItemList;
