import { useEffect, useState } from "react"
import NFTCard from "../components/NftCard";
import { ethers } from "ethers";
import { Spinner } from '@chakra-ui/react'
interface HomeProps{
  marketplace:any,
  nft:any
}
interface MarketplaceItem {
  priceInBigNumber:any;
  price: string; 
  itemId: number;
  seller: string;
  name: string;
  description: string;
  image: string;
}
export const Home:React.FC<HomeProps> = ({marketplace,nft}) => {
  
  const [items,setItems] = useState<MarketplaceItem[]>([]);

  const loadMarketItems = async() =>{
    const itemCount = await marketplace.itemCount();
    const numberCounter = itemCount.toNumber()
    let items =[];
    for (let i = 1 ; i<=numberCounter ; i++){
      const item = await marketplace.items(i)
      if(!item.sold){
        const uri = await nft.tokenURI(item.tokenId);
        const response = await fetch(uri);
        const metaData = await response.json()
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        const priceInString = ethers.utils.formatEther(totalPrice);
        items.push({
          priceInBigNumber:totalPrice,
          price:priceInString,
          itemId:item.itemId,
          seller:item.seller,
          name:metaData.name,
          description:metaData.description,
          image:metaData.imageUrl
        })
      }
  }
    setItems(items)
  }
  const buyMarketItems = async(item:any)=>{
      console.log(item.price)
      await (await marketplace.purchaseItem(item.itemId, {value:item.priceInBigNumber})).wait()
      loadMarketItems()
  }
  useEffect(()=>{
    loadMarketItems()
  },[marketplace,nft])
  return (
   <div className=" flex gap-5 p-5 flex-wrap justify-center items-center">
   {
    items.length>0?(
      items.map((item)=>{return  <NFTCard description={item.description} imageUrl={item.image} name={item.name} price={item.price} key={item.itemId} buy={buyMarketItems} item={item}/>
          
      })
    ):(
      <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
     
    )
   }
   </div>

  )
}
