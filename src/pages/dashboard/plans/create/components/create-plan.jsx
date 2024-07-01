import { useRef, useCallback, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../../firebase-settings';
import { uploadAsset } from '../../../../helper';
import { SCREENS } from '../../../../../navigation/constants';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';

const CreatePlanForm = () => {
  const formRef = useRef(null);
  const navigate = useNavigate()

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log("accepted files", acceptedFiles)
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const [files, setFiles] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title: { value: title }, price: { value: price }, description: { value: description } } = formRef.current;
      const imageURL = await uploadAsset(files, 'plans/thumbnail/', false);
      await addDoc(collection(db, "plans"), {
        title,
        price,
        description,
        thumbnail: imageURL
      })
      alert('Plan created successfully!');
      navigate(SCREENS.PLANS)
    } catch (error) {
      alert('Error creating plan');
      console.log(error)
    }
  }

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Create New Plan</h4>
          <p className="card-description">
            Create a new plan for sale
          </p>
          <form className="forms-sample" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName1">Title</label>
              <input type="text" className="form-control" name="title" id="exampleInputName1" placeholder="Name" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail3">Price</label>
              <input type="text" className="form-control" name="price" id="exampleInputEmail3" placeholder="3.49" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword4">Description</label>
              <textarea className="form-control" id="exampleInputPassword4" rows={4} name="description" placeholder="description here"></textarea>
            </div>
            <div className="form-group">
              <div className='border rounded p-4' style={{ cursor: 'pointer' }}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} multiple={false} />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag n drop some files here, or click to select files</p>
                  }
                </div>
              </div>
            </div>


            <button type="submit" className="btn btn-primary mr-2">Submit</button>
            <button className="btn btn-light">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePlanForm;