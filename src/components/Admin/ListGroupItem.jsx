import React, { useState } from 'react';
import ExistingItemModal from './ExistingItemModal';

const ListGroupItem = (props) => {
  const { id, name, price } = props;
  const [openItem, toggleOpenItem] = useState(false);
  return(
    <>
    <li
      className="list-group-item cursor"
      key={id}
      onClick={(e) => { e.stopPropagation(); toggleOpenItem(true)}}
    >
      ${price} {name} <i className={"fa pull-right " + (!openItem? 'fa-eye-slash' : 'fa-eye')} />
    </li>
    {
      !openItem ?
      <></>
      :
      <ExistingItemModal
        {...props}
        closeOpenItem={() => {toggleOpenItem(false);}}
      />
    }
    </>
  )
};

export default ListGroupItem;
