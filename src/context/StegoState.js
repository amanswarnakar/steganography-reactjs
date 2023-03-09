import React, { useState } from "react";
import StegoContext from "./StegoContext";

const StegoState = (props) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [secret, setSecret] = useState("");

  const loadImage = (e) => {
    // console.log(e);
    document.getElementById("encoded-image").style.display = "none";
    let reader = new FileReader();
    reader.onload = (event) => {
      let regex = /data:image/;
      if (regex.test(reader.result)) {
        let dataURL = event.target.result;
        let img = new Image();
        img.onload = () => {
          let canvas = document.getElementById("canvas");
          canvas.style.display = "block";
          let ctx = canvas.getContext("2d");
          ctx.canvas.width = img.width;
          ctx.canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
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
    if (isImageUploaded) {
      // let secret = document.getElementById("secret").value;
      if (secret.length > 1000) setMsg("The message is too big to encode.");
      else {
        document.getElementById("encoded-image").style.display = "block";
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
        setMsg("Image encoded! Save below image for further use!");
        output.src = canvas.toDataURL();
        canvas.style.display = "none";
      }
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
    setMsg("The encoded message is: " + secret);
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

  return (
    <StegoContext.Provider
      value={{
        msg,
        setMsg,
        isImageUploaded,
        secret,
        setSecret,
        loadImage,
        encode,
        decode,
      }}
    >
      {props.children}
    </StegoContext.Provider>
  );
};
export default StegoState;
