import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ProofOfIdentity } from "../../../ProofOfIdentity"

export const IDs = (props) => {
  const {
    handleEvent,
    invalids,
    data: {
      id1Code,
      governmentId1,
      governmentType1,
      governmentId1Url,
      id2Code,
      governmentId2,
      governmentId2Url,
      governmentType2,
    },
    lists,
    constraints
  } = props;

  const handleUpload = () => {

  }

  const handleUploadSuccess = (imageURL) => {
    handleEvent("onChange", { index: "eSignatureId", value: imageURL})
  }

  const handleUploadError = (error) => {
    console.log("Uploading Error: ", error);
  }

  return (
    <ProofOfIdentity 
      data={{
        id1Code,
        governmentId1,
        governmentType1,
        governmentId1Url,
        id2Code,
        governmentId2,
        governmentId2Url,
        governmentType2,
      }}
      items={lists} 
      onSubmit={handleUpload}
      handleEvent={handleEvent}
      invalids={invalids}
      constraints={constraints}
    />
  )
}

export default IDs

const styles = StyleSheet.create({})
