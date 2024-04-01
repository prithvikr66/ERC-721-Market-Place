import React, { useEffect, useState } from 'react'
import NFTCard from '../components/NftCard';


interface ListProps{
    marketplace:any;
    nft:any;
    account:string;
}
export const Listing :React.FC<ListProps>= ({marketplace, nft , account}) => {
    const [loading, setLoading] = useState(true)
    const [listedItems , setListedItems]:any = useState([])
    const [soldItems , setSoldItems]:any = useState([])

    const loadListedItems = async() =>{

      const itemCount = await marketplace.itemCount();
      const numberOfItems = await itemCount.toNumber()
      let listedItems = [];
      let soldItems = [];
      for(let index = 1 ; index<=numberOfItems; index ++){

        const i = await marketplace.items(index);
        if(i.seller.toLowerCase() === account){
          const uri = await nft.tokenURI(i.tokenId)
          const response = await fetch(uri);
          const metaData = await response.json()

          const totalPrice = await marketplace.getTotalPrice(i.itemId)
          let items = {
            totalPrice,
            price:i.price,
            itemId:i.itemId,
            name:metaData.name,
            description:metaData.description,
            image:metaData.imageUrl
          }
          
         listedItems.push(items)
         if(i.sold) soldItems.push(items)


        }

      }
      setListedItems(listedItems)
      console.log(listedItems)
      setSoldItems(soldItems)

    } 
    useEffect(()=>{
    loadListedItems()
    },[nft,marketplace])
  return (
    <>
    <div className=' flex gap-5 p-5 flex-wrap'>
    {
      listedItems.map((item:any)=>{
        return <NFTCard description={item.description} imageUrl={item.image} name={item.name} price="1" key={item.itemId} id={item.id}/>
      })
    }
    </div>
    </>
  )
}
