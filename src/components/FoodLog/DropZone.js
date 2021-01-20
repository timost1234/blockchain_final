import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import tw from "twin.macro";
import styled from "styled-components";

import { useDropzone } from "react-dropzone";

const DropZoneContainer = styled.div((props) => [
  tw`flex flex-row items-center w-72 h-44 rounded border-gray-400 border-2 border-dashed justify-center align-middle
    text-left text-gray-500 text-2xl hover:bg-gray-100 hover:cursor-pointer transition duration-200 focus:outline-none`,
  props.children[1] &&
    tw`bg-green-100 opacity-50 text-green-500 border-green-500`,
  props.children[2] && tw`bg-red-200 opacity-50 text-red-500 border-red-500`,
]);

// const preidctHandler = async (base64) => {
//   try {
//     const response = await fetch(
//       "http://localhost:5000/v1/models/wood-iz_224-dr_0.3-lr_0.01:classify/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           examples: [{ image: { b64: base64 } }],
//         }),
//       }
//     );

//     const responseData = await response.json();
//     return responseData;
//   } catch (err) {
//     console.log(err);
//   }
// };


const DropZone = (props) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const image = reader.result
        console.log(reader.result)

        props.putImage(reader.result);

        // try {
        //   const base64result = reader.result.split(",")[1];
        //   preidctHandler(base64result)
        //     .then((response) => props.putResult(response.result))
        //     .catch(() => props.setError());
        // } catch {
        //   props.setError();
        // }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  // const acceptedFileItems = acceptedFiles.map(file => (
  //     <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     </li>
  // ));

  return (
    <DropZoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragAccept && <>Drop your file here</>}
      {isDragReject && <>This file is not acceptable</>}
      {!isDragActive && (
        <div tw="text-lg">
          將影像拖曳到這裡 <br />
          或點擊選擇要上傳的影像
        </div>
      )}
      {/* <ul>{acceptedFileItems}</ul> */}
    </DropZoneContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    foodname: state.foodname,
    starttime: state.starttime,
    sectionname: state.sectionname,
    images: state.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putImage: (url) => dispatch({ type: "LOGIMAGE", image: url }),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(DropZone);
