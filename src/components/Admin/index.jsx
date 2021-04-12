import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroupItem from './ListGroupItem';
import CreateItemModal from './CreateItemModal';

const Admin = () => {
  const [items, allItems] = useState([])
  const [showCreateItem, toggleShowCreateItem] = useState(false);

  const fetchItemList = (props) => {
    axios.get(`http://geekfinds.com/products`)
      .then((res) => {
        const { data } = res;
        if(data !== "NULL" && data.length > 0) {
          allItems(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewItemToList = (data) => {
    allItems([...items, data]);
  }

  const updateListItems = (data) => {
    const itemsRemap = items.map(obj => data.id === obj.id ? data : obj);
    allItems(itemsRemap);
  }

  const removeListItems = (id) => {
    const itemsRemap = items.filter(obj => {
      return id !== obj.id;
    });
    allItems(itemsRemap);
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <div className="content text-left">
      <div className="row">
        <div className="col text-right">
          <button className="btn btn-sm btn-secondary" onClick={()=>{toggleShowCreateItem(true)}}>Add Item</button>
        </div>
      </div>
      {
        !showCreateItem ?
        <></>
        :
        <CreateItemModal addNewItemToList={(data) => { addNewItemToList(data); }} toggleShowCreateItem={()=>{toggleShowCreateItem(false);}} />
      }
      <br />
      <ul className="list-group">
      {
        items.length === 0 ?
        <li className="list-group-item">No Items to currently list</li>
        :
        items.map((o,k) => (
          <ListGroupItem {...o} key={o.id} updateListItems={(data) => {updateListItems(data);}} removeListItems={(id) => {removeListItems(id);}} />
        ))
      }
      </ul>
    </div>
  )
};

export default Admin;
