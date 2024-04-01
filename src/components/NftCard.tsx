import React from 'react';
import { Card, CardHeader, CardBody, CardFooter ,Stack, Image , Heading ,Text ,  Divider, ButtonGroup , Button} from '@chakra-ui/react'

interface NFTCardProps {
  imageUrl: string;
  name: string;
  description: string;
  price: string;
  buy:any;
  item:any
}

const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, name, description, price , buy , item}) => {
  return (
    <Card maxW='sm' >
  <CardBody>
    <Image
      src={imageUrl}
      alt={name}
      borderRadius='lg'
      h={56}
      w={56}
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <Text>
        {description}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        {price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue' onClick={()=>buy(item)}>
        Buy NFT
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
  );
};

export default NFTCard;
