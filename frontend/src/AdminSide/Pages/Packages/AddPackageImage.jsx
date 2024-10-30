import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminAxios } from '../../../axios_instances/Axios_instance';
import './AddPackageImage.css'

const AddPackageImage = () => {
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchPackages= async() =>{
      try {
        const response = await AdminAxios.get('api/admin/packages/')
        setPackages(response.data)
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    }
    fetchPackages()
  },[])

  const handleImageChange = (e)=>{
    setImage(e.target.files[0])
  }

  const handlePackageChange = (e)=>{
    setSelectedPackage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('package', selectedPackage);
      formData.append('image', image);

      await AdminAxios.post('api/admin/addPackage-image/', formData);
      navigate('/admin/package-list/');
      toast.success('PackageImage Added Successfully');
    } catch (error) {
      setError('Failed to add image. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="add-package-form-container">
      <h2>Add Package Image</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="add-package-form-group">
          <label className="package-label">Select Package:</label>
          <select className="select-field" value={selectedPackage} onChange={handlePackageChange}>
            <option value="">Select a package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.package_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Image:</label>
          <input className="file-input" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button className="submit-btn" type="submit" disabled={!selectedPackage || !image}>
          Upload Image
        </button>
      </form>
    </div>
  )
}

export default AddPackageImage
