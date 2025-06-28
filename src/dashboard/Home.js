import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore/lite";
import { firestore } from '../config/firebase';
import toast from 'react-hot-toast';

const initialState = { name: '', description: '', price: '', category: '', picture: '' };
// home.js is admin route page
export default function Home() {
  const getRandomId = () => Math.random().toString(36).slice(2);
  const [state, setState] = useState(initialState);
  // const [fileUrlPath, setFileUrlPath] = useState('');
  const [menu, setMenu] = useState([]);
  const [menuForEdit, setMenuForEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const navigate = useNavigate();

  const { name, description, price, category, picture } = state;

  const handleChange = async (e) => {
    if (e.target.name === 'picture') {
      const file = e.target.files[0];
      if (file) {
        // const fileUrl = URL.createObjectURL(file);
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'restaurant-app'); //  your preset name
          formData.append('cloud_name', 'dblqccgby'); //  your Cloudinary cloud name
          const res = await fetch('https://api.cloudinary.com/v1_1/dblqccgby/image/upload', {
            method: 'POST',
            body: formData,
          });

          if (!res.ok) {
            throw new Error('Image upload failed');
          }

          const data = await res.json();
          console.log('Cloudinary response:', data)

          // setFileUrlPath(data.secure_url);
          // setState((s) => ({ ...s, picture: data.secure_url }));
          setState((s) => {
            const updated = { ...s, picture: data.secure_url };
            console.log('Updated state:', updated);
            return updated;
          });

          console.log('state:', state)
          // console.log('fileUrlPath:', fileUrlPath)
          // setFileUrlPath(fileUrl);
          // setState((s) => ({ ...s, picture: fileUrl }));
        } catch (error) {
          console.error('Upload error:', error.message);
          alert('Image upload failed. Please try again.');
        }
      }
    } else {
      setState((s) => ({ ...s, [e.target.name]: e.target.value }));
    }
  };

  const AddingItem = async () => {
    const menuData = { id: getRandomId(), name, description, price, category, picture };
    // console.log('fileUrlPath while adding doc', fileUrlPath)

    console.log('Adding menu item:', menuData);
    try {
      await setDoc(doc(firestore, 'Menus', menuData.id), menuData);

      console.log('Adding menu item:', menuData);
      toast.success('Item Added Successfully');
      setShowModal(false);
      setMenu([...menu, menuData]);
    } catch (error) {
      console.log('Error adding item:', error);
      toast.error('Error while adding item');
    }
  };

  const deleteMenuItem = async (menuItem) => {
    const filteredMenu = menu.filter((item) => item.id !== menuItem.id);
    setMenu(filteredMenu);

    try {
      await deleteDoc(doc(firestore, "Menus", menuItem.id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.log('Error deleting item:', error);
      toast.error('Error while deleting item');
    }
  };

  const updateMenu = async () => {
    if (!menuForEdit) return;

    const updatedMenu = menu.map((item) =>
      item.id === menuForEdit.id ? { ...menuForEdit } : item
    );
    setMenu(updatedMenu);

    try {
      await setDoc(doc(firestore, 'Menus', menuForEdit.id), menuForEdit);
      toast.success('Item updated successfully');
      setUpdateModal(false);
    } catch (error) {
      console.log('Error updating item:', error);
      toast.error('Error while updating item');
    }
  };

  const readMenu = async () => {
    const q = query(collection(firestore, "Menus"));
    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setMenu(array);
  };

  useEffect(() => {
    readMenu();
  }, []);

  return (
    <>
      <Space>
        <p className="ms-2 mb-0 btn btn-info">
          <Link to={'/'}>Home</Link>
        </p>
        <Button onClick={() => setShowModal(true)} type="primary">Add Menu</Button>
        <Button onClick={readMenu} type="warning">Read Menu</Button>
        <Button onClick={() => navigate('/Order')} type="info">Order Page</Button>
      </Space>

      <Modal title="Add Menu" open={showModal} onCancel={() => setShowModal(false)} footer={[
        <Button key="back" onClick={() => setShowModal(false)}>Close</Button>,
        <Button key="submit" type="primary" onClick={AddingItem}>Add Menu</Button>
      ]}>
        <Input onChange={handleChange} name="name" type="text" placeholder="Enter Name" />
        <Input onChange={handleChange} name="description" type="text" placeholder="Enter Description" />
        <Input onChange={handleChange} name="price" type="text" placeholder="Enter Price" />
        <Input onChange={handleChange} name="category" type="text" placeholder="Enter Category" />
        <Input onChange={handleChange} name="picture" type="file" />
      </Modal>

      <Modal title="Update Menu" open={updateModal} onCancel={() => setUpdateModal(false)} footer={[
        <Button key="back" onClick={() => setUpdateModal(false)}>Close</Button>,
        <Button key="submit" type="primary" onClick={updateMenu}>Update Menu</Button>
      ]}>
        <Input onChange={(e) => setMenuForEdit({ ...menuForEdit, name: e.target.value })} value={menuForEdit.name} name="name" placeholder="Enter Name" />
        <Input onChange={(e) => setMenuForEdit({ ...menuForEdit, price: e.target.value })} value={menuForEdit.price} name="price" placeholder="Enter Price" />
        <Input onChange={(e) => setMenuForEdit({ ...menuForEdit, description: e.target.value })} value={menuForEdit.description} name="description" placeholder="Enter Description" />
        <Input onChange={(e) => setMenuForEdit({ ...menuForEdit, category: e.target.value })} value={menuForEdit.category} name="category" placeholder="Enter Category" />
      </Modal>

      <div className="container d-flex">
        <div className="row">
          {menu.map((item, i) => (
            <div className="col-12 col-sm-6 col-lg-3 mt-3" key={i}>
              <div className="card">
                <Image width={200} height={200} src={item.picture} />
                <h3>{item.name}</h3>
                <h3>{item.description}</h3>
                <h3>{item.price}</h3>
                <h3>{item.category}</h3>
                <Button type="primary" onClick={() => { setMenuForEdit(item); setUpdateModal(true); }}>Update</Button>
                <Button className="mt-2 btn btn-danger" onClick={() => deleteMenuItem(item)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
