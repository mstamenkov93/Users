import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { User } from '../../interfaces';
import { useError } from '../../providers/errorProvider';
import { api } from '../../api';

interface AddUserFormProps {
  onUserAdded: (user: User) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleError } = useError()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, phone
    } = formData

    if (!name || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true)
    try {
      const newUser = await api.addUser(formData);
      setIsLoading(false)
      if (!newUser) return;
      onUserAdded(newUser)
      setFormData({
        name: "",
        email: "",
        phone: "",
      })
    } catch (error) {
      handleError("Failed to add new user");
      setIsLoading(false);
    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        value={formData.name}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        value={formData.email}
      />
      <TextField
        label="Phone"
        name="phone"
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        value={formData.phone}
      />
      <Button disabled={isLoading} type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </form>
  );
};