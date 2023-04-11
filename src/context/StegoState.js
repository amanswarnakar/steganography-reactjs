import React, { useState } from "react";
import StegoContext from "./StegoContext";

const StegoState = (props) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isEncoded, setIsEncoded] = useState(false);
  const [msg, setMsg] = useState("");
  const [secret, setSecret] = useState("");
  const [averageColor, setAverageColor] = useState("");

  const restoreBackgroundColor = () => {
    setAverageColor("#9df8e06d");
    let AppStyle = document.querySelector(".App").style;
    AppStyle.color = "#000";
    AppStyle.background = averageColor;
  };

  const getAverageColor = (img) => {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var width = (canvas.width = img.naturalWidth);
    var height = (canvas.height = img.naturalHeight);

    ctx.drawImage(img, 0, 0);

    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;
    var r = 0;
    var g = 0;
    var b = 0;

    for (var i = 0, l = data.length; i < l; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.floor(r / (data.length / 4));
    g = Math.floor(g / (data.length / 4));
    b = Math.floor(b / (data.length / 4));
    let averageColorHex =
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2);

    setAverageColor(averageColorHex);

    let AppStyle = document.querySelector(".App").style;
    AppStyle.backgroundColor = averageColorHex;

    document
      .querySelectorAll(".btn, .btn-disabled")
      .forEach((element) => (element.style.background = averageColorHex));

    let color = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    console.log(color);
    if (color < 128) {
      AppStyle.color = "#fff";
      document.querySelector(".btn").style.borderColor = "#fff";
      document.querySelector(".btn-disabled").style.borderColor = "#fff";
    } else {
      AppStyle.color = "#000";
      document.querySelector(".btn").style.borderColor = "#000";
      document.querySelector(".btn-disabled").style.borderColor = "#000";
    }
  };

  const loadImage = (e) => {
    document.getElementById("encoded-image").style.display = "none";
    let reader = new FileReader();
    reader.onload = (event) => {
      let regex = /data:image/;
      if (regex.test(reader.result)) {
        let dataURL = event.target.result;
        let img = new Image();
        img.onload = () => {
          let canvas = document.getElementById("canvas");
          canvas.style.display = "flex";
          let ctx = canvas.getContext("2d");
          ctx.canvas.width = img.width;
          ctx.canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          getAverageColor(img);
        };
        img.src = dataURL;
        setIsImageUploaded(true);
        setMsg("Image Successfully Uploaded!");
      } else {
        document.getElementById("upload-image").value = "";
        setMsg("Please upload an image!");
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const encode = () => {
    setSecret("");
    if (isImageUploaded) {
      // let secret = document.getElementById("secret").value;
      if (secret.length > 1000) setMsg("The message is too big to encode.");
      else {
        document.getElementById("encoded-image").style.display = "flex";
        setSecret("");
        let output = document.getElementById("encoded-image");
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        encodeMessage(imgData.data, secret);
        ctx.putImageData(imgData, 0, 0);
        setMsg("Image encoded! Save encoded image for further use!");
        output.src = canvas.toDataURL();
        canvas.style.display = "none";
      }
      downloadImage();
    } else {
      document.getElementById("upload-image").value = "";
      setMsg("Please upload an image!");
    }
  };

  const decode = () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    let secret = decodeMessage(imgData.data);
    setMsg(`The encoded message is: ` + secret);
  };

  // Encodes message using LSB method
  const encodeMessage = (colors, message) => {
    let messageBits = getBitsFromNumber(message.length);
    messageBits = messageBits.concat(getMessageBits(message));
    let history = [];
    let pos = 0;
    while (pos < messageBits.length) {
      let loc = getNextLocation(history, colors.length);
      colors[loc] = setBit(colors[loc], 0, messageBits[pos]);
      while ((loc + 1) % 4 !== 0) {
        loc++;
      }
      colors[loc] = 255;
      pos++;
    }
  };

  // Decodes message from the image
  const decodeMessage = (colors) => {
    let history = [];
    let messageSize = getNumberFromBits(colors, history);
    if ((messageSize + 1) * 16 > colors.length * 0.75) {
      return "";
    }
    if (messageSize === 0) {
      return "";
    }
    let message = [];
    for (let i = 0; i < messageSize; i++) {
      let code = getNumberFromBits(colors, history);
      message.push(String.fromCharCode(code));
    }
    return message.join("");
  };

  const getBit = (number, location) => {
    return (number >> location) & 1;
  };

  // sets the bit in 'location' to 'bit' (either a 1 or 0)
  const setBit = (number, location, bit) => {
    return (number & ~(1 << location)) | (bit << location);
  };

  // returns an array of 1s and 0s for a 2-byte number
  const getBitsFromNumber = (number) => {
    let bits = [];
    for (let i = 0; i < 16; i++) {
      bits.push(getBit(number, i));
    }
    return bits;
  };

  // returns the next 2-byte number
  const getNumberFromBits = (bytes, history) => {
    let number = 0,
      pos = 0;
    while (pos < 16) {
      let loc = getNextLocation(history, bytes.length);
      let bit = getBit(bytes[loc], 0);
      number = setBit(number, pos, bit);
      pos++;
    }
    return number;
  };

  // returns an array of 1s and 0s for the string 'message'
  const getMessageBits = (message) => {
    let messageBits = [];
    for (let i = 0; i < message.length; i++) {
      let code = message.charCodeAt(i);
      messageBits = messageBits.concat(getBitsFromNumber(code));
    }
    return messageBits;
  };

  // gets the next location to store a bit
  const getNextLocation = (history, total) => {
    let loc = 0;
    while (true) {
      if (history.indexOf(loc) >= 0) {
        loc++;
      } else if ((loc + 1) % 4 === 0) {
        loc++;
      } else {
        history.push(loc);
        return loc;
      }
    }
  };

  const downloadImage = () => {
    if (isImageUploaded) {
      let canvas = document.getElementById("canvas");
      let anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/png");
      anchor.download = "Encoded.png";
      anchor.click();
    } else {
      document.getElementById("upload-image").value = "";
      setMsg("Please upload an image!");
    }
  };

  return (
    <StegoContext.Provider
      value={{
        msg,
        setMsg,
        isImageUploaded,
        setIsImageUploaded,
        secret,
        setSecret,
        loadImage,
        encode,
        decode,
        // restoreBackgroundColor,
        // downloadImage,
        // isEncoded,
        // setIsEncoded,
      }}
    >
      {props.children}
    </StegoContext.Provider>
  );
};
export default StegoState;
