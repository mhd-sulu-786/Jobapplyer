import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form() {
  // Define initial form state
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    mail: '',
    experience: '',
    description: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const d = localStorage.getItem('user');
      const postResponse = await axios.post(`http://localhost:2000/apply/${d}`, formData);
      console.log('POST response:', postResponse.data);

      // Handle successful response
      alert('Form submitted successfully!');
      navigate("/profile")
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxHeight: 'max-content',
          maxWidth: '100%',
          mx: 'auto',
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
          Fill the form
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
            gap: 1.5,
          }}
        >
          <FormControl>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter name'
            />
          </FormControl>
          <FormControl>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter phone'
            />
          </FormControl>
          <FormControl>
            <Input
              name="mail"
              type='email'
              value={formData.mail}
              onChange={handleChange}
              placeholder='Enter mail'
            />
          </FormControl>
          <FormControl>
            <Input
              name="experience"
              type='number'
              value={formData.experience}
              onChange={handleChange}
              placeholder='Enter experience'
            />
          </FormControl>
          <FormControl sx={{ gridColumn: '1 / -1' }}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              maxRows={8}
              minRows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              variant="outlined"
              required
            />
          </FormControl>
          <CardActions sx={{ gridColumn: '1 / -1' }}>
            <Button
              variant="solid"
              color="primary"
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

export default Form;