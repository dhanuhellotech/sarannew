import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { client } from '../../clientaxios/Clientaxios';
import Swal from 'sweetalert2';

export default function Course() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseBriefDescription, setCourseBriefDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [readArray, setReadArray] = useState()

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    client.get('/course')
      .then(response => {
        setCourses(response.data)
        const read = Array(response.data.length).fill(false)
        setReadArray(read)
      })
      .catch(error => console.error('Error fetching courses:', error));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleFormSubmit = async () => {
    try {
      // Check if editingCourseId is null (indicating a new course) and if any field is empty
      if (!editingCourseId && (!courseName || !courseDescription || !courseDuration || !courseBriefDescription || !imageFile)) {
        Swal.fire('Error', 'All fields are required.', 'error');
        return;
      }
  
      // Check if the course description exceeds 200 words only for new courses
      if (!editingCourseId && countWords(courseDescription) > 200) {
        Swal.fire('Error', 'Course description cannot exceed 200 words.', 'error');
        return;
      }
  
      // Check if the course brief description exceeds 200 words only for new courses
      if (!editingCourseId && countWords(courseBriefDescription) > 200) {
        Swal.fire('Error', 'Course brief description cannot exceed 200 words.', 'error');
        return;
      }
  
      const formData = new FormData();
      formData.append('courseName', courseName);
      formData.append('courseDescription', courseDescription);
      formData.append('courseDuration', courseDuration);
      formData.append('courseBriefDescription', courseBriefDescription);
      formData.append('image', imageFile);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      if (editingCourseId) {
        await client.put(`/course/${editingCourseId}`, formData, config);
        setEditingCourseId(null);
      } else {
        await client.post('/course/resize', formData, config);
      }
  
      clearForm();
      fetchCourses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  // Function to count words in a string
  const countWords = (text) => {
    return text.split(/\s+/).filter(word => word !== '').length;
  };
  
  const handleEditCourse = (courseId) => {
    const courseToEdit = courses.find(course => course._id === courseId);
    if (courseToEdit) {
      setCourseName(courseToEdit.courseName);
      setCourseDescription(courseToEdit.courseDescription);
      setCourseDuration(courseToEdit.courseDuration);
      setCourseBriefDescription(courseToEdit.courseBriefDescription);
      setEditingCourseId(courseToEdit._id);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this course!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      });
  
      if (result.isConfirmed) {
        await client.delete(`/course/${courseId}`);
        fetchCourses();
        Swal.fire(
          'Deleted!',
          'Your course has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your course is safe :)',
          'error'
        );
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  

  const clearForm = () => {
    setCourseName('');
    setCourseDescription('');
    setCourseDuration('');
    setCourseBriefDescription('');
    setImageFile(null);
    setEditingCourseId(null);
  };
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 200) {
      return words.slice(0, 200).join(' ') + '...';
    }
    return description;
  };

  const handleRead=(i)=>{
    setReadArray((prev)=>({
      ...prev,
      [i]:!readArray[i]
    }))
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="container">
          <div className="card" style={{ padding: '20px', margin: '20px 0' }}>
            <h4 className="card-title">Course</h4>
            <form method="post" action="/your-upload-endpoint" encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6">
                  <label>Course Name</label>
                  <input type="text" className="form-control" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label>Course Description</label>
                  <input type="text" className="form-control" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label>Course Duration</label>
                  <input type="text" className="form-control" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} />
                </div>
                <div className="col-md-6">
                <label>Image</label>
                  <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
                </div>
                <div className="col-md-12 mt-3">
                  <label>Course Brief Description</label>
                  <textarea type="text" className="form-control" rows={3} value={courseBriefDescription} onChange={(e) => setCourseBriefDescription(e.target.value)} />
                </div>
               
                <div className="col-md-12 mt-3">
                  <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>{editingCourseId ? 'Update Course' : 'Add Course'}</button>
                </div>
              </div>
            </form>
          </div>
          <h5 style={{ marginTop: '20px' }}>Existing Courses</h5>
          <div className="row">
            {courses.map((course,index) => (
              <div className="col-md-4" key={course._id}>
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title" >Course Name: {course.courseName}</h5>
                    <p className="card-text" >Description: {truncateDescription(course.courseDescription)}</p>
                    <p className="card-text">Duration: {course.courseDuration}</p>
                    <p className="card-text" style={{display:readArray[index]?"block":"none"}}>Brief Description: {truncateDescription(course.courseBriefDescription)}</p>
                    <button  style={{ backgroundColor: '#6f42c1',margin:'10px',color:'white' }} onClick={()=>handleRead(index)}>{readArray[index]?'Hide Description':'Show description'}</button>
                    <img src={course.image} alt={course.courseName} className="card-img-top" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                    <div>
                      <button className="btn btn-info me-2"       style={{ backgroundColor: '#6f42c1',margin:'10px' }} onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                      <button className="btn btn-primary" onClick={() => handleEditCourse(course._id)}>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
