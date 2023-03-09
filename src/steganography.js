let isImageUploaded = false;
const loadImage = (e) => {
  // console.log(e);
  let reader = new FileReader();
  reader.onload = (event) => {
    let regex = /data:image/;
    if (regex.test(reader.result)) {
      isImageUploaded = true;
      let dataURL = event.target.result;
      console.log(dataURL);
      let img = new Image();
      img.onload = () => {
        let ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = dataURL;
      getMessage("Image Successfully Uploaded!");
    } else {
      document.getElementById('upload-image').value = '';
      getMessage("Please upload an image!");
    }
  };
};
const encode = (e) => {};
const decode = (e) => {};
const getMessage = (msg) => {
  return msg;
}
export { loadImage, encode, decode, getMessage };
