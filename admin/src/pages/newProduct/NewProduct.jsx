import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {app} from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";




export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [progres, setProgress] = useState()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);



    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress)
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          const product = { ...inputs, img: downloadURL, categoris: cat };
          addProduct(product, dispatch);
          downloadURL && window.location.reload()

        });
      }
    );

  };


  console.log(inputs.title)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      {progres ? <ProgressBar completed={Math.round(progres)} /> : null}
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input

            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select required name="categoris" onChange={handleCat}>
            <option value="man">man</option>
            <option value="woman">woman</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <select name="color" onChange={handleChange}>
            <option value="white">white</option>
            <option value="black">black</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
            <option value="gray">gray</option>
            <option value="orange">orange</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <select name="size" onChange={handleChange}>
            <option value="white">XS</option>
            <option value="black">S</option>
            <option value="white">M</option>
            <option value="black">L</option>
            <option value="white">XL</option>
            <option value="black">XXL</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Sales</label>
          <select name="sales" onChange={handleChange}>
            <option value="0">0 %</option>
            <option value="5">5 %</option>
            <option value="10">10 %</option>
            <option value="15">15 %</option>
            <option value="20">20 %</option>
            <option value="25">25 %</option>
            <option value="30">30 %</option>
            <option value="35">35 %</option>
            <option value="40">40 %</option>
            <option value="45">45 %</option>
            <option value="50">50 %</option>
            <option value="55">55 %</option>
            <option value="60">60 %</option>
            <option value="65">65 %</option>
            <option value="70">70 %</option>
            <option value="75">75 %</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {inputs?.title && file?.name && inputs?.price && inputs.size && inputs?.color && inputs?.desc && cat[0]  ?
          <button onClick={handleClick} className="addProductButton"> Create</button>
          : null}

      </form>
    </div>
  );
}
