import { useState } from 'react'
import { Buffer } from 'buffer'
import { create } from "ipfs-http-client"

import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  const [images, setImages] = useState([])

  const PROJECT_ID = "2HTuL09ZuAFKpkjaYIi9lIHedsj";
  const PROJECT_SECRECT = "115c9a1238602d685cf7cb960b1d7a5a";
  const AUTHORIZATION = "Basic " + btoa(PROJECT_ID + ":" + PROJECT_SECRECT);

  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      AUTHORIZATION
    }
  })

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = (form[0]).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);
    console.log(result)
    setImages([
      ...images,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };

  return (
    <div className="App">
      {ipfs && (
        <>
          <h3>Upload file to IPFS</h3>
          <form onSubmit={onSubmitHandler}>
            <input type="file" name="file" />
            <button type="submit">Upload file</button>
          </form>
          <div>
            {images.map((image, index) => (
              <img
                alt={`Uploaded #${index + 1}`}
                src={"https://gateway.pinata.cloud/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
                key={image.cid.toString() + index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
