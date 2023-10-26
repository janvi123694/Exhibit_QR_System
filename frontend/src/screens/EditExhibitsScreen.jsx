import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,useHistory } from 'react-router-dom';
import Axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { Modal} from 'antd';
import Modifyfiles from './Modifyfiles';


const EditExhibitScreen = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  
  const handleupdatedfiles = (newList) => {
    setFileList(newList);
  };
  

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};


const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory:'',
    room:'',
    location_type:'',
    location:'',
    asset_number:'',
    era:'',
    exhibit_desc:''
  });


  useEffect(() => {
    // Fetch data for the specified ID from the backend
    Axios.get(`/api/admin/exhibits/${id}`)
      .then(response => {
        setFormData(response.data); // Store data in state for prepopulation
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    navigate('/');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      if (!formData.title || !formData.asset_number || !formData.location) {
        toast.error('Please fill in all mandatory fields.',{duration: 2000,}); // Show error modal
        return;
      }


      const response = await fetch(`/api/admin/exhibits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //console.log(response)
  
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log('First API call is successful',data.message); 

        // const formDataForFiles = new FormData(); // Use FormData instead of fileObjects
        // fileList.forEach((file) => {
        //   formDataForFiles.append('photos', file.originFileObj);
        // });

        // console.log(formDataForFiles)

        // const s3Response = await fetch(`api/exhibits/upload/${id}`, {
        //   method: 'POST', // or 'PUT' or 'whatever is necessary'
        //   body: formDataForFiles,
        // });

        // if (s3Response.ok) {
        //   const s3Data = await s3Response.json();
        //   console.log('Second API Call to S3 Successful:', s3Data);
          toast.success('Form data submitted successfully');

        setFormSubmitted(true);

        setTimeout(() => {
          navigate('/'); // Redirect to the main page after a delay (adjust as needed)
        }, 2000);

      } 
      // else {
      //   console.error('Second API Call to S3 Failed:', s3Response.statusText);
      //   toast.error('Failed to upload to S3');
      // }
    // }
    //   else{
    //     const data = await response.json();
    //     console.error('First API Call Failed:', data.message);
    //     if (data.message.includes('Duplicate entry')) {
    //       toast.error('Duplicate entries not allowed.');
    //     } 
        
    //     else {
    //       toast.error('Failed to submit form data.');
    //     }
    //   }

    } catch (error) {
      console.log('Failed to submit form data')
      toast.error('An error occurred while submitting form data.');
      // Handle network or other errors here
    }
  };

  const h1Style = {
    fontWeight: 'bold',
    fontSize: '22px',
    marginTop: '30px',
    marginLeft:'480px',
    marginBottom:'20px',
    // textAlign:'center'
  };

  const buttonContainerStyle = {
    // textAlign: "center", // Adjust this to align the labels and buttons
    // margin: "0 20px",    // Adjust the margin as needed
    marginTop:"20px"
  };
  const rightButtonContainerStyle = {
    display: "flex",
    //justifyContent: "flex-end", // Right-align the buttons
    alignItems: "center", // Vertically align the buttons
    marginTop:"38px"
  };
  
  const labelStyle = {
    fontSize: "11px",
    color:'#4B4B4B'
  };

  const buttonStyle = {
    fontSize: '14px',
    width: '125px',
    height: '25px',
    marginRight:'20px',
    marginTop:'0px'

  };
  // Define a custom style for the form labels
  const formLabelStyle = {
    fontSize: '14px', // Adjust the font size as needed
    marginTop: '-20px',
  };

  // Define a custom style for the space between form elements
  const formElementSpacing = {
    marginBottom: '-5px', // Adjust the margin-bottom as needed
  };

  const descriptionInputStyle = {
    fontSize: '14px', // Adjust the font size as needed
    height: '80px', // Adjust the height as needed
  };

  const TextInputStyle = {
    fontSize: '12px', // Adjust the font size as needed
    height: '45px', // Adjust the height as needed
  };


  return (
    <Container className="EditExhibit">
      <Row>
        <Col> {/* Center-align the content */}
          <h1 style={h1Style}>
            Edit Exhibit
          </h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
          <Row>

            <Col md={4} className="mb-3">
              <Form style={formElementSpacing}>

                <Form.Group controlId="Title" className="mb-3">
                  <Form.Label style={formLabelStyle}>Title<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    // placeholder="Enter Title"
                    style={TextInputStyle}/>
                </Form.Group>
              </Form>
            </Col>

            <Col md={4} className="offset-md-3 mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Asset Number" className="mb-3">
                  <Form.Label style={formLabelStyle}>Asset Number<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control 
                type="text"
                name="asset_number"
                value={formData.asset_number}
                onChange={handleChange} 
                // placeholder="Enter Asset number"
                style={TextInputStyle} />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row>
          <Col md={4} className="mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Location" className="mb-3">
                  <Form.Label style={formLabelStyle}>Location</Form.Label>
                  <Form.Control  
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange} 
                  style={TextInputStyle}
                  />
                </Form.Group>
              </Form>
            </Col>
          
          {/* Right Form */}
         
            <Col md={4} className="offset-md-3 mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Room" className="mb-3">
                  <Form.Label style={formLabelStyle}>Room</Form.Label>
                  <Form.Control 
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange} 
                    style={TextInputStyle}
                    />
                </Form.Group>
              </Form>
            </Col>
            </Row>

          <Row>
            <Col md={4} className="mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Location type" className="mb-3">
                  <Form.Label style={formLabelStyle}>Location type</Form.Label>
                  <Form.Control 
                    type="text"
                    name="location_type"
                    value={formData.location_type}
                    onChange={handleChange}
                    style={TextInputStyle}
                    />
                </Form.Group>
              </Form>
            </Col>

            {/* Right Form */}
            <Col md={4} className="offset-md-3 mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Era" className="mb-3">
                  <Form.Label style={formLabelStyle}>Era</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="era"
                    value={formData.era}
                    onChange={handleChange}
                    style={TextInputStyle}
                    />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Category" className="mb-3">
                  <Form.Label style={formLabelStyle}>Category</Form.Label>
                  <Form.Control 
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange} 
                    style={TextInputStyle}
                     />
                </Form.Group>
              </Form>
            </Col>

            {/* Right Form */}
            <Col md={4} className="offset-md-3 mb-3">
              <Form style={formElementSpacing}>
                <Form.Group controlId="Sub Category" className="mb-3">
                  <Form.Label style={formLabelStyle}>Sub Category</Form.Label>
                  <Form.Control 
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange} 
                style={TextInputStyle}
                />
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Col md={6} className="mb-4"> {/* Add custom class for margin-bottom */}
            <Form style={formElementSpacing}>
                <Form.Group controlId="Description" className="mb-3">
                    <Form.Label style={formLabelStyle}>Description</Form.Label>
                    <Form.Control 
                      type="text" as="textarea" 
                    //   placeholder="Enter Description"
                      name="exhibit_desc"
                      value={formData.exhibit_desc}
                      onChange={handleChange}
                      style={descriptionInputStyle}/>
                </Form.Group>
            </Form>
          </Col>
      
          <Row>
            <Col md={6}>
              <div className="float-start" style={buttonContainerStyle}>
                <label style={labelStyle}>Images/Videos</label>
                <button type="button"  style={buttonStyle} onClick={showModal}>Modify Files</button>
                <Modal
                    title="MODIFYFILES"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    closable={false}
                    footer={null}
                    style={{ height: '1200px',width:'1200px' }}
  
                    // okButtonProps={{ style: { background: 'blue', borderColor: 'black',width:'80px' } }}
                    // cancelButtonProps={{ style: { background: 'white', borderColor: 'black',width:'80px' } }}

                  >
                  {isModalVisible &&
                <Modifyfiles 
                files={fileList} 
                setFiles={handleupdatedfiles} 
                formSubmitted={formSubmitted}
                id={id}
                resetFormSubmitted={() => setFormSubmitted(false)}
                nOK={handleOk} 
                nCancel={handleCancel} />}  
                </Modal>
              </div>

              <div className="float-start" style={buttonContainerStyle}>
                <label style={labelStyle}>Related Exhibits</label>
                <button type="button" style={buttonStyle}>Modify Links</button>
              </div>
             </Col>

            <Col md={6}>
              <div className="d-flex justify-content-end" style={rightButtonContainerStyle}>
                <button className="float-end" style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '8px 16px',
                    fontSize: '12px',
                    width: '100px',
                    height: '25px',
                    marginRight: '15px',
                    marginTop:'-1px',
                    outline:'1px solid black',}} 
                    onClick={handleCancelClick}>Cancel</button>

                <button className="float-end" style={buttonStyle}>Submit</button>
              </div>
            </Col>
          </Row>
      </Form>

<Toaster />

    </Container>

    
  );
};



export default EditExhibitScreen;