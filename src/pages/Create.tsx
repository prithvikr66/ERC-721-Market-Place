import { useState } from "react"
import { ethers } from "ethers";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Textarea,
} from '@chakra-ui/react';
const PINATA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMTJjZjk0My02OTI5LTQ5MjYtYWUwOC1jZThjN2ZhN2U4MmIiLCJlbWFpbCI6InBrdW5vZmZpY2lhbDY2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmOWY3ZjE2M2U2NTJiY2Q4ZWVhYSIsInNjb3BlZEtleVNlY3JldCI6IjM1Nzk0YzQwZDBmZmM3OTM0MGQ0MmJiZjI0OTc2NTA4ZWUxOTZjNWRjYTdlNGU4N2JjNzZkNjM3M2UwNGM3NmMiLCJpYXQiOjE3MTE5MTQ1NzV9.F2_Rx4QVR3d--yGgylPb-zhDuXiBn7xcHuGyJ220PHI"
const Create = ({marketplace, nft}) => {
  const [image, setImage] =useState('');
  const [price , setPrice] =useState('')
  const [name,setName] =useState('')
  const [description , setDescription] =useState('')
  const [selectedFile , setSelectedFile]:any = useState()
  
  const changeHandler = (event:any) =>{
    setSelectedFile(event.target.files[0])
  }

  const uploadToIPFS =async(event:any)=>{
   try{
    const formData = new FormData();
    formData.append("file",selectedFile)
    const metaData = JSON.stringify({
      name:"File Name"
    });
    formData.append("pinataMetadata",metaData)
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);
    const uploadImageResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_KEY}`,
        },
        body: formData,
      }
    );
    const uploadImageData = await uploadImageResponse.json();
    const imageHash = uploadImageData.IpfsHash;
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;
    
    const nftMetaData = {
      name,
      description,
      price,
      imageUrl,
    };
    const uploadMetaDataResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nftMetaData),
      }
    );
    
    const uploadMetaDataData = await uploadMetaDataResponse.json();
    const metaDataHash = uploadMetaDataData.IpfsHash;
    const metaDataUrl = `https://gateway.pinata.cloud/ipfs/${metaDataHash}`;

    mintThenList(metaDataUrl)
    

   }catch(err) {console.log(err)}
  }
  const mintThenList = async(metaDataUrl:string) =>{

    await (await nft.mint(metaDataUrl)).wait()
    const id = await nft.tokenCount();
    await (await nft.setApprovalForAll(marketplace.address , true)).wait()
   const listingPrice = ethers.utils.parseEther(price.toString())
   await (await marketplace.makeItem(nft.address,id,listingPrice)).wait()
  }
  
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p={8}>
        <Heading as="h1" mb={6} fontSize="2xl">
          Upload NFT to IPFS
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter name"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </FormControl>
      </Box>
      <Stack p={4} direction="row" spacing={4} align="center" justify="flex-end">
        <Input type="file" onChange={changeHandler} />
        <Button colorScheme="blue" onClick={uploadToIPFS}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

export default Create