import { useCallback, useEffect, useState } from "react"
import { createWorker } from 'tesseract.js';
const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [textResult, setTextResult] = useState("")

  const worker = createWorker()

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng')
    const { data } = await worker.recognize(selectedImage)
    setTextResult(data.text)
  }, [worker, selectedImage])

  useEffect(() => {
    convertImageToText()
  }, [selectedImage, convertImageToText])

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    } else {
      setSelectedImage(null)
      setTextResult("")
    }
  }
  return (
    <div className='App'>
      <h1>Image to Text Conversion</h1>
      <p>Gets words in Image</p>
      <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input type="file" id='upload' accept='image/*' onChange={handleImageChange} />
      </div>
      <div className="result">
        {
          selectedImage && (
            <div className="box-image">
              <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
            </div>
          )}
        {
          textResult && (
            <div className="box-p">
              <p>{textResult}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App